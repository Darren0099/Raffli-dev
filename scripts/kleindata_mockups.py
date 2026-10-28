from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
from pathlib import Path
import math
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "img"
SH = ROOT / ".kleindata-capture"
SH.mkdir(exist_ok=True)
URL = "https://kleindata-darren-0099s-projects.vercel.app"

def screenshot_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--no-sandbox'])
        pc = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1)
        page = pc.new_page()
        page.goto(URL, wait_until="domcontentloaded", timeout=90000)
        page.locator(".app-shell[data-ready=true]").wait_for(timeout=60000)
        page.get_by_role("button", name="Explore sample data").click()
        page.locator(".dataset-banner").wait_for(timeout=90000)
        page.screenshot(path=str(SH/"overview.png"))
        page.locator(".sidebar .nav-link").filter(has_text="Insight Studio").click()
        page.locator(".insight-tile").first.wait_for(timeout=30000)
        page.screenshot(path=str(SH/"insights.png"))
        page.locator(".sidebar .nav-link").filter(has_text="Data Quality").click()
        page.locator(".profile-table").wait_for(timeout=30000)
        page.screenshot(path=str(SH/"quality.png"))
        pc.close()
        mob = browser.new_context(viewport={"width": 417, "height": 748}, device_scale_factor=1, is_mobile=True, has_touch=True)
        m = mob.new_page()
        m.goto(URL, wait_until="domcontentloaded", timeout=90000)
        m.locator(".app-shell[data-ready=true]").wait_for(timeout=60000)
        m.screenshot(path=str(SH/"mobile.png"))
        mob.close(); browser.close()

def ft(s,b=False):
    f="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if b else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    return ImageFont.truetype(f,s)
def txt(d,p,t,size=24,color="#202126",b=False):
    d.text(p,t,font=ft(size,b),fill=color)
def star(d,x,y,r,color="#ff704e"):
    q=[]
    for i in range(8):
        a=math.pi*i/4-math.pi/2
        z=r if i%2==0 else r*.19
        q.append((x+math.cos(a)*z,y+math.sin(a)*z))
    d.polygon(q,fill=color)
def gradient(w,h,a,b):
    im=Image.new("RGB",(w,h));d=ImageDraw.Draw(im)
    for y in range(h):
        t=y/max(h-1,1)
        d.line((0,y,w,y),fill=tuple(int(a[i]*(1-t)+b[i]*t) for i in range(3)))
    return im.convert("RGBA")
def shadow(im,r,rad=25,blur=26,offset=(8,18),opacity=65):
    mask=Image.new("L",im.size);d=ImageDraw.Draw(mask);x,y,xx,yy=r
    d.rounded_rectangle((x+offset[0],y+offset[1],xx+offset[0],yy+offset[1]),radius=rad,fill=opacity)
    mask=mask.filter(ImageFilter.GaussianBlur(blur))
    layer=Image.new("RGBA",im.size,(0,0,0,0));layer.putalpha(mask)
    im.alpha_composite(layer)
def fit(im,w,h):
    return ImageOps.fit(im.convert("RGB"),(w,h),Image.Resampling.LANCZOS)
def paper(im,x,y,w,h):
    d=ImageDraw.Draw(im);d.rounded_rectangle((x,y,x+w,y+h),radius=5,fill="#fffcf5",outline="#e0dbd2",width=2)
    for i in range(11):d.line((x+25,y+30+i*26,x+w-30,y+30+i*26),fill="#eae5dd",width=2)
def plant(im,x,y):
    d=ImageDraw.Draw(im)
    d.ellipse((x-58,y-9,x+60,y+16),fill="#d1cabe")
    d.polygon([(x-52,y),(x+53,y),(x+36,y+88),(x-38,y+88)],fill="#d9cdb5")
    for k in range(9):
        a=k*2*math.pi/9;px=x+math.cos(a)*60;py=y-55+math.sin(a)*47
        d.line((x,y,px,py),fill="#53765a",width=4)
        d.ellipse((px-17,py-28,px+17,py+28),fill="#5b8d67" if k%2 else "#87a47a")
def desk(shot):
    c=gradient(1600,900,(234,227,216),(250,247,239));d=ImageDraw.Draw(c)
    paper(c,90,180,300,520);paper(c,1190,260,345,450);plant(c,1476,452)
    d=ImageDraw.Draw(c)
    d.ellipse((1350,80,1535,265),fill="#d6ccbd");d.ellipse((1366,94,1517,249),fill="#fff9ed");d.ellipse((1392,120,1490,216),fill="#a8805f")
    shadow(c,(192,110,1317,774),35,32,(12,24),75)
    d=ImageDraw.Draw(c);d.rounded_rectangle((191,111,1317,771),radius=30,fill="#1d1e22")
    d.rounded_rectangle((208,130,1300,751),radius=16,fill="#08090c")
    c.paste(fit(shot,1068,601),(220,141))
    d=ImageDraw.Draw(c);d.polygon([(171,772),(1338,772),(1422,816),(93,816)],fill="#9da1a4")
    d.polygon([(171,772),(1338,772),(1403,795),(115,795)],fill="#e7e8e7")
    d.line((101,818,1420,818),fill="#616366",width=5)
    star(d,1452,753,21)
    txt(d,(95,45),"KLEINDATA   /   THE DATA DESK",22,"#2b2b2d",True)
    c.convert("RGB").save(IMG/"kleindata-landscape-desk.jpg",quality=90,optimize=True)
def studio(shot):
    c=gradient(1600,900,(29,30,34),(54,53,53))
    photo=Image.open(IMG/"ca6.png").convert("RGBA").resize((1040,1300),Image.Resampling.LANCZOS)
    c.alpha_composite(photo,(560,-188))
    r=(560+int(342*.963),-188+int(286*.963),560+int(978*.963),-188+int(714*.963))
    c.paste(fit(shot,r[2]-r[0],r[3]-r[1]),(r[0],r[1]))
    d=ImageDraw.Draw(c)
    d.rectangle((0,0,585,900),fill="#1b1c20")
    star(d,88,111,31);txt(d,(136,89),"KLEINDATA / 02",24,"#ff927b",True)
    txt(d,(85,217),"Explore",73,"#ffffff",True);txt(d,(85,308),"what your",67,"#ffffff",True);txt(d,(85,395),"data hides.",67,"#ffffff",True)
    d.rounded_rectangle((88,531,461,594),radius=31,fill="#ff674b");txt(d,(118,550),"30 ADAPTIVE INSIGHTS",20,"#ffffff",True)
    d.line((88,687,390,687),fill="#666467",width=2);txt(d,(88,717),"Insights   /   SQL   /   Charts",20,"#c7c4c3")
    c.convert("RGB").save(IMG/"kleindata-landscape-studio.jpg",quality=90,optimize=True)
def handset(shot):
    c=Image.open(IMG/"ca1.png").convert("RGBA")
    l,t,r,b=336,230,798,1165
    sc=fit(shot,r-l,b-t)
    m=Image.new("L",sc.size);ImageDraw.Draw(m).rounded_rectangle((0,0,sc.width-1,sc.height-1),radius=22,fill=255)
    c.paste(sc,(l,t),m);d=ImageDraw.Draw(c)
    d.rounded_rectangle((486,196,643,228),radius=16,fill="#090a0c")
    d.rounded_rectangle((66,1128,300,1216),radius=19,fill="#1e2025")
    star(d,96,1153,15);txt(d,(121,1145),"KleinData",26,"#fff",True);txt(d,(121,1183),"MOBILE ANALYTICS",12,"#d5d0cd")
    c.convert("RGB").save(IMG/"kleindata-portrait-phone.jpg",quality=90,optimize=True)
def tablet(shot):
    c=gradient(1080,1350,(244,242,235),(228,222,212));paper(c,63,255,590,780);plant(c,943,103)
    d=ImageDraw.Draw(c)
    d.ellipse((71,1052,283,1264),fill="#d7d0c6");d.ellipse((83,1065,269,1251),fill="#fffbf2");d.ellipse((110,1092,242,1225),fill="#997458")
    d.line((820,1140,1010,1020),fill="#46474a",width=13)
    frame=Image.new("RGBA",(950,665),(0,0,0,0));f=ImageDraw.Draw(frame)
    f.rounded_rectangle((12,18,935,627),radius=30,fill="#151719")
    f.rounded_rectangle((32,40,916,608),radius=13,fill="#fff")
    frame.paste(fit(shot,863,540),(42,52));frame=frame.rotate(8,resample=Image.Resampling.BICUBIC,expand=True)
    shadow(c,(80,332,1080,1020),30,45,(14,23),60)
    c.alpha_composite(frame,(22,313));d=ImageDraw.Draw(c)
    d.rounded_rectangle((88,38,418,96),radius=27,fill="#1d1e22");star(d,120,67,15);txt(d,(155,52),"KLEINDATA / 04",20,"#fff",True)
    txt(d,(88,162),"The insight studio.",54,"#1e1f22",True)
    txt(d,(90,230),"A better way to understand your numbers.",22,"#77716e")
    d.arc((676,1062,1204,1472),211,335,fill="#ff8062",width=40)
    c.convert("RGB").save(IMG/"kleindata-portrait-tablet.jpg",quality=90,optimize=True)

if __name__=="__main__":
    screenshot_app()
    desk(Image.open(SH/"overview.png"));studio(Image.open(SH/"insights.png"))
    handset(Image.open(SH/"mobile.png"));tablet(Image.open(SH/"quality.png"))
    print("Generated:",*[p.name for p in IMG.glob("kleindata-*.jpg")])
