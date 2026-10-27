'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLanguage } from './LanguageProvider';

interface TrailParticle {
  x: number;
  y: number;
  char: string;
  opacity: number;
  life: number;
}

interface HudNodePoint {
  id: string;
  x: number;
  y: number;
  val: string;
  source: 'cursor' | 'object' | 'midpoint';
}

function Dynamic3DShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  const dragZoneRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<{ spin: () => void; reset: () => void }>({ spin: () => undefined, reset: () => undefined });
  const redDotRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);
  const svgCanvasRef = useRef<SVGSVGElement>(null);
  const nodesOverlayRef = useRef<HTMLDivElement>(null);
  const brushSplashOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const dragZone = dragZoneRef.current;
    if (!currentMount || !dragZone) return;

    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.zIndex = '2';
    renderer.domElement.style.pointerEvents = 'none';
    currentMount.appendChild(renderer.domElement);

    const legoGroup = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(2.4, 0.8, 0.9);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0, roughness: 0.2, metalness: 0.1 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    legoGroup.add(bodyMesh);

    const studGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 32);
    const studPositions = [-0.8, -0.27, 0.27, 0.8];
    studPositions.forEach((xPos) => {
      const stud = new THREE.Mesh(studGeo, bodyMat);
      stud.position.set(xPos, 0.47, 0);
      legoGroup.add(stud);
    });

    const wireGeo = new THREE.WireframeGeometry(bodyGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.2 });
    legoGroup.add(new THREE.LineSegments(wireGeo, wireMat));

    legoGroup.position.set(-0.3, 0, 0);
    scene.add(legoGroup);

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const legoVertices: THREE.Vector3[] = [
      new THREE.Vector3(-1.2, 0.4, 0.45),
      new THREE.Vector3(1.2, 0.4, 0.45),
      new THREE.Vector3(-1.2, -0.4, 0.45),
      new THREE.Vector3(1.2, -0.4, -0.45),
      new THREE.Vector3(0, 0.52, 0),
    ];

    const rotation = { x: 0, y: 0, velocity: 0 };
    const drag = { active: false, pointerId: -1, x: 0, y: 0, total: 0 };
    let colorIndex = 0;
    const palette = [0xe0e0e0, 0xf15a24, 0xb8ceff, 0xffd3b2];

    const spin = () => {
      rotation.velocity += Math.PI / 22;
      colorIndex = (colorIndex + 1) % palette.length;
      bodyMat.color.setHex(palette[colorIndex]);
    };
    const reset = () => {
      rotation.x = 0;
      rotation.y = 0;
      rotation.velocity = 0;
      colorIndex = 0;
      bodyMat.color.setHex(palette[0]);
    };
    actionsRef.current = { spin, reset };

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const currentPos = { x: width / 2, y: height / 2 };
    const trailParticles: TrailParticle[] = [];

    const handlePointerMove = (e: PointerEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

      mouse.targetX = (x / Math.max(width, 1)) * 2 - 1;
      mouse.targetY = -(y / Math.max(height, 1)) * 2 + 1;
      currentPos.x = x;
      currentPos.y = y;

      if (redDotRef.current) redDotRef.current.style.opacity = '1';
      if (hudBadgeRef.current) hudBadgeRef.current.style.opacity = '1';

      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: x + (Math.random() - .5) * 30,
          y: y + (Math.random() - .5) * 30,
          char: Math.random() > .3 ? '$' : String(Math.floor(Math.random() * 10)),
          opacity: .8,
          life: 1,
        });
      }
      if (trailParticles.length > 85) trailParticles.splice(0, trailParticles.length - 85);
    };

    const onDragStart = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag.active = true;
      drag.pointerId = e.pointerId;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.total = 0;
      dragZone.setPointerCapture(e.pointerId);
      dragZone.classList.add('is-dragging');
      handlePointerMove(e);
    };
    const onDragMove = (e: PointerEvent) => {
      if (!drag.active || drag.pointerId !== e.pointerId) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      rotation.y += dx * .013;
      rotation.x = Math.max(-1.6, Math.min(1.6, rotation.x + dy * .013));
      drag.total += Math.abs(dx) + Math.abs(dy);
      drag.x = e.clientX;
      drag.y = e.clientY;
    };
    const onDragEnd = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.pointerId) return;
      if (drag.total < 9 && e.type === 'pointerup') spin();
      drag.active = false;
      dragZone.classList.remove('is-dragging');
      if (dragZone.hasPointerCapture(e.pointerId)) dragZone.releasePointerCapture(e.pointerId);
    };
    const onLeave = () => {
      if (!drag.active) {
        if (redDotRef.current) redDotRef.current.style.opacity = '0';
        if (hudBadgeRef.current) hudBadgeRef.current.style.opacity = '0';
      }
    };

    const onDragKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        rotation.y += event.key === 'ArrowLeft' ? -.22 : .22;
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        rotation.x += event.key === 'ArrowUp' ? -.22 : .22;
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        spin();
      }
    };

    dragZone.addEventListener('keydown', onDragKeyDown);
    currentMount.addEventListener('pointermove', handlePointerMove);
    currentMount.addEventListener('pointerleave', onLeave);
    dragZone.addEventListener('pointerdown', onDragStart);
    dragZone.addEventListener('pointermove', onDragMove);
    dragZone.addEventListener('pointerup', onDragEnd);
    dragZone.addEventListener('pointercancel', onDragEnd);

    const isPointInTriangle = (
      px: number, py: number,
      ax: number, ay: number,
      bx: number, by: number,
      cx: number, cy: number
    ) => {
      const areaOrig = Math.abs((bx - ax) * (cy - ay) - (cx - ax) * (by - ay));
      const area1 = Math.abs((ax - px) * (by - py) - (bx - px) * (ay - py));
      const area2 = Math.abs((bx - px) * (cy - py) - (cx - px) * (by - py));
      const area3 = Math.abs((cx - px) * (ay - py) - (ax - px) * (cy - py));
      return Math.abs(area1 + area2 + area3 - areaOrig) < 1.0;
    };

    let reqId: number;
    let frameCount = 0;
    let visible = true;
    const visibilityObserver = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
    }, { threshold: .01 });
    visibilityObserver.observe(currentMount);

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!visible || document.hidden) return;
      frameCount++;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      rotation.y += rotation.velocity;
      rotation.velocity *= .963;
      legoGroup.rotation.y = mouse.x * .42 + rotation.y;
      legoGroup.rotation.x = -mouse.y * .25 + rotation.x;

  
      if (redDotRef.current) {
        redDotRef.current.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`;
      }


      if (hudBadgeRef.current) {
        hudBadgeRef.current.style.transform = `translate3d(${currentPos.x + 90}px, ${currentPos.y - 20}px, 0)`;
      }

  
      const center3D = new THREE.Vector3();
      legoGroup.getWorldPosition(center3D);
      center3D.project(camera);
      const center2DX = (center3D.x * 0.5 + 0.5) * width;
      const center2DY = (-(center3D.y * 0.5) + 0.5) * height;
      const distance = Math.hypot(currentPos.x - center2DX, currentPos.y - center2DY);
      const allNodes: HudNodePoint[] = [];
      const cursorNodeCount = (Math.floor(frameCount / 30) % 2) + 1;
      for (let c = 0; c < cursorNodeCount; c++) {
        const angle = (frameCount * 0.03) + (c * Math.PI);
        const radius = 35 + c * 20;
        allNodes.push({
          id: `cursor-${c}`,
          x: currentPos.x + Math.cos(angle) * radius,
          y: currentPos.y + Math.sin(angle) * radius,
          val: (Math.abs(mouse.x + c * 0.1) * 0.5 + 0.12).toFixed(4),
          source: 'cursor'
        });
      }


      const vertexIndex = Math.floor(frameCount / 25) % legoVertices.length;
      const vertex = legoVertices[vertexIndex].clone();
      vertex.applyMatrix4(legoGroup.matrixWorld);
      vertex.project(camera);

      const obj2DX = (vertex.x * 0.5 + 0.5) * width;
      const obj2DY = (-(vertex.y * 0.5) + 0.5) * height;

      allNodes.push({
        id: 'object-0',
        x: obj2DX,
        y: obj2DY,
        val: (Math.abs(vertex.x) * 0.5 + 0.108).toFixed(4),
        source: 'object'
      });

  
      let midPointX = (center2DX + currentPos.x) / 2;
      let midPointY = (center2DY + currentPos.y) / 2;

      if (distance > 180) {
        const trigOffset = Math.sin(frameCount * 0.05) * 45;
        midPointX += trigOffset;
        midPointY -= trigOffset;

        allNodes.push({
          id: 'mid-0',
          x: midPointX,
          y: midPointY,
          val: (distance * 0.85).toFixed(1),
          source: 'midpoint'
        });
      }

      if (brushSplashOverlayRef.current) {
        let splashHTML = '';

    
        for (let p = trailParticles.length - 1; p >= 0; p--) {
          const pt = trailParticles[p];
          pt.life -= 0.025;
          pt.opacity = pt.life;

          if (pt.life <= 0) {
            trailParticles.splice(p, 1);
          } else {
            splashHTML += `
              <span class="brush-splash-char" style="transform: translate3d(${pt.x}px, ${pt.y}px, 0); opacity: ${pt.opacity}; color: ${pt.life > 0.5 ? '#fe5000' : 'rgba(255,255,255,0.4)'}">
                ${pt.char}
              </span>
            `;
          }
        }

        if (distance > 180 && frameCount % 2 === 0) {
          const step = 30;
          const minX = Math.min(center2DX, currentPos.x, midPointX);
          const maxX = Math.max(center2DX, currentPos.x, midPointX);
          const minY = Math.min(center2DY, currentPos.y, midPointY);
          const maxY = Math.max(center2DY, currentPos.y, midPointY);

          for (let gx = minX; gx <= maxX; gx += step) {
            for (let gy = minY; gy <= maxY; gy += step) {
              if (isPointInTriangle(gx, gy, center2DX, center2DY, currentPos.x, currentPos.y, midPointX, midPointY)) {
                if (Math.random() > 0.5) {
                  splashHTML += `
                    <span class="trig-shape-char" style="transform: translate3d(${gx}px, ${gy}px, 0);">
                      $
                    </span>
                  `;
                }
              }
            }
          }
        }

        brushSplashOverlayRef.current.innerHTML = splashHTML;
      }
      if (nodesOverlayRef.current) {
        let nodesHTML = '';
        allNodes.forEach((nd) => {
          nodesHTML += `
            <div class="hud-node-box node-${nd.source}" style="transform: translate3d(${nd.x - 20}px, ${nd.y - 12}px, 0)">
              [${nd.val}]
            </div>
          `;
        });
        nodesOverlayRef.current.innerHTML = nodesHTML;
      }

      
      if (svgCanvasRef.current) {
        let linesHTML = '';
        
        if (distance > 180) {
          linesHTML += `
            <path d="M ${center2DX} ${center2DY} L ${midPointX} ${midPointY} L ${currentPos.x} ${currentPos.y} Z" 
                  fill="rgba(254, 80, 0, 0.03)" stroke="rgba(254, 80, 0, 0.5)" stroke-width="1" stroke-dasharray="3 3" />
          `;
        } else {
          linesHTML += `
            <line x1="${center2DX}" y1="${center2DY}" x2="${currentPos.x}" y2="${currentPos.y}" 
                  stroke="rgba(255,255,255,0.25)" stroke-width="1" stroke-dasharray="2 2" />
          `;
        }

        allNodes.forEach((nd) => {
          linesHTML += `
            <line x1="${currentPos.x}" y1="${currentPos.y}" x2="${nd.x}" y2="${nd.y}" 
                  stroke="rgba(255,255,255,0.15)" stroke-width="0.8" stroke-dasharray="2 2" />
          `;
        });

        svgCanvasRef.current.innerHTML = linesHTML;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      width = currentMount.clientWidth;
      height = currentMount.clientHeight;
      currentPos.x = Math.min(currentPos.x, width);
      currentPos.y = Math.min(currentPos.y, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      visibilityObserver.disconnect();
      currentMount.removeEventListener('pointermove', handlePointerMove);
      currentMount.removeEventListener('pointerleave', onLeave);
      dragZone.removeEventListener('pointerdown', onDragStart);
      dragZone.removeEventListener('pointermove', onDragMove);
      dragZone.removeEventListener('pointerup', onDragEnd);
      dragZone.removeEventListener('pointercancel', onDragEnd);
      dragZone.removeEventListener('keydown', onDragKeyDown);
      actionsRef.current = { spin: () => undefined, reset: () => undefined };
      bodyGeo.dispose();
      studGeo.dispose();
      wireGeo.dispose();
      bodyMat.dispose();
      wireMat.dispose();
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="bridge-3d-canvas-container">
      <div ref={redDotRef} className="hud-red-dot" />
      <div ref={dragZoneRef} className="bridge-drag-zone" role="button" tabIndex={0} aria-label="Interactive 3D block: drag to rotate, tap or press Enter to spin; arrow keys rotate" />

      <div ref={brushSplashOverlayRef} className="hud-brush-splash-layer" />

      <div ref={hudBadgeRef} className="hud-scroll-badge">DRAG</div>

      <svg ref={svgCanvasRef} className="hud-svg-canvas" />

      <div ref={nodesOverlayRef} className="hud-3d-object-nodes-layer" />
      <div className="bridge-interaction-hint">DRAG TO ROTATE <span>·</span> TAP TO REMIX</div>
      <div className="bridge-interaction-controls">
        <button type="button" onClick={() => actionsRef.current.spin()} aria-label="Spin and recolor the 3D object">SPIN ↗</button>
        <button type="button" onClick={() => actionsRef.current.reset()} aria-label="Reset the 3D object rotation and color">RESET ↺</button>
      </div>
    </div>
  );
}

export default function BridgeShowcase() {
  const { lang } = useLanguage();

  return (
    <section className="bridge-scroll-container" aria-label={lang === 'id' ? 'Showcase digital interaktif' : 'Interactive digital showcase'}>
      <div className="bridge-slide-content">
        <div className="bridge-text-box">
          <h2 className="bridge-heading-statement">
            {lang === 'id'
              ? 'Saya membangun pengalaman digital yang memikat secara visual, menyenangkan saat digunakan, dan membuat identitas sebuah brand mudah diingat.'
              : 'I build digital experiences that capture attention, invite interaction, and leave a memorable brand impression.'}
          </h2>
        </div>

        <Dynamic3DShowcase />

        <div className="bridge-brand-bottom" aria-label="Raffli">
          <span className="brand-name-orange">Raffli</span>
          <span className="brand-code-orange"> (.79)</span>
        </div>
      </div>
    </section>
  );
}
