'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

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
  const redDotRef = useRef<HTMLDivElement>(null);
  const hudBadgeRef = useRef<HTMLDivElement>(null);
  const svgCanvasRef = useRef<SVGSVGElement>(null);
  const nodesOverlayRef = useRef<HTMLDivElement>(null);
  const brushSplashOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let width = currentMount.clientWidth;
    let height = currentMount.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Mesh Balok Lego 3D
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

    // Lighting
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

    // Tracking Mouse & Particles
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const currentPos = { x: width / 2, y: height / 2 };
    const trailParticles: TrailParticle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouse.targetX = (x / width) * 2 - 1;
      mouse.targetY = -(y / height) * 2 + 1;

      currentPos.x = x;
      currentPos.y = y;

      // Efek Kuas Pelukis (Brush Splash): Tambahkan partikel $ saat kursor bergerak
      for (let i = 0; i < 2; i++) {
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        trailParticles.push({
          x: x + offsetX,
          y: y + offsetY,
          char: Math.random() > 0.3 ? '$' : (Math.random() * 9).toFixed(0),
          opacity: 0.8,
          life: 1.0
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fungsi Pembantu: Cek apakah titik berada di dalam segitiga
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

    // Render Animation Loop
    let reqId: number;
    let frameCount = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      frameCount++;

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      legoGroup.rotation.y = mouse.x * 1.1;
      legoGroup.rotation.x = -mouse.y * 0.7;

      // A. Titik Merah Kursor
      if (redDotRef.current) {
        redDotRef.current.style.transform = `translate3d(${currentPos.x}px, ${currentPos.y}px, 0)`;
      }

      // B. Badge Floating "Scroll"
      if (hudBadgeRef.current) {
        hudBadgeRef.current.style.transform = `translate3d(${currentPos.x + 90}px, ${currentPos.y - 20}px, 0)`;
      }

      // C. Posisi Center 3D ke 2D Layar
      const center3D = new THREE.Vector3();
      legoGroup.getWorldPosition(center3D);
      center3D.project(camera);
      const center2DX = (center3D.x * 0.5 + 0.5) * width;
      const center2DY = (-(center3D.y * 0.5) + 0.5) * height;

      const distance = Math.hypot(currentPos.x - center2DX, currentPos.y - center2DY);

      // Node Dynamic List
      const allNodes: HudNodePoint[] = [];

      // Node Kursor
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

      // Node Objek 3D
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

      // Simpul Trigonometri
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

      // D. Pengisian Karakter `$` Dalam Segitiga Trigonometri & Kuas Pelukis (Brush Splash)
      if (brushSplashOverlayRef.current) {
        let splashHTML = '';

        // 1. Render Partikel Kuas Kursor (Trail Splash)
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

        // 2. Render $ Mengisi Shape Segitiga Trigonometri saat Jarak Jauh
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

      // E. Render Kotak-Kotak HUD
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

      // F. Render Garis Hubung SVG Trigonometri
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
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="bridge-3d-canvas-container">
      {/* 1. Titik Merah Kursor */}
      <div ref={redDotRef} className="hud-red-dot" />

      {/* 2. Layer Kuas Pelukis Splash Trails $ & Trigonometry Shape Fill */}
      <div ref={brushSplashOverlayRef} className="hud-brush-splash-layer" />

      {/* 3. Badge "Scroll" Floating */}
      <div ref={hudBadgeRef} className="hud-scroll-badge">Scroll</div>

      {/* 4. Layer SVG Lines (Shape Triangulasi) */}
      <svg ref={svgCanvasRef} className="hud-svg-canvas" />

      {/* 5. Layer Multi-Node HUD Boxes */}
      <div ref={nodesOverlayRef} className="hud-3d-object-nodes-layer" />
    </div>
  );
}

export default function BridgeShowcase() {
  const bridgeContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bridgeContainerRef,
    offset: ["start start", "end end"]
  });

  const xTransformBridge = useTransform(scrollYProgress, [0, 0.4, 1], ["100%", "0%", "0%"]);

  return (
    <section ref={bridgeContainerRef} className="bridge-scroll-container">
      <div className="bridge-sticky-viewport">
        
        <motion.div className="bridge-slide-horizontal-wrapper" style={{ x: xTransformBridge }}>
          <div className="bridge-slide-content">
            
            <div className="bridge-text-box">
              <h2 className="bridge-heading-statement">
                I build experiences that get under your skin — where the visual stops you, 
                the interaction pulls you in, and the brand stays with you long after you&apos;ve closed the tab.
              </h2>
            </div>

            {/* THREE.JS & HUD INTERFACE */}
            <Dynamic3DShowcase />

            {/* BRANDING FOOTER */}
            <div className="bridge-brand-bottom">
              <span className="brand-name-orange">Raffli</span>
              <span className="brand-code-orange"> (.79)</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}