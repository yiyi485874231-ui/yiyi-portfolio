import React, { useEffect, useState } from "react";
import "./farm-demo.css";

type Project = { no: string; title: string; type: string; desc: string; category: string; note: string; cover?: string };
const projects: Project[] = [
  { no:"01", title:"磨铁文化｜童书内容运营", type:"CONTENT & SOCIAL", desc:"围绕亲子阅读与儿童成长主题，参与选题、文案、海报及内容制作", category:"内容策划与运营", note:"主要参与文案与内容制作；项目渠道支付金额突破 7,000 元（团队成果）", cover:"/uploads/covers/1-1.png" },
  { no:"02", title:"1688 AI版｜AI选品体验与推广策划", type:"AI PRODUCT / GTM", desc:"从产品体验出发，梳理商家需求，设计内容推广与体验转化方案", category:"内容策划与运营", note:"个人模拟研究项目，非官方合作或真实执行", cover:"/uploads/covers/1688.jpg" },
  { no:"03", title:"三下乡实践｜抖音内容运营", type:"SHORT VIDEO / SOCIAL", desc:"以真实实践记录为切口，参与抖音内容策划与视频运营", category:"内容策划与运营", note:"相关视频播放量 1.3 万+", cover:"/uploads/covers/file.jpg" },
  { no:"04", title:"学院融媒体公众号运营", type:"WECHAT / CAMPUS MEDIA", desc:"参与学院融媒体公众号内容编辑与日常运营", category:"内容策划与运营", note:"公众号用户规模 7,680+", cover:"/uploads/covers/file-1.png" },
  { no:"05", title:"个人公众号｜热点内容创作", type:"INDEPENDENT CONTENT", desc:"关注热点议题与内容表达，独立完成选题、撰写和发布", category:"内容策划与运营", note:"单篇文章阅读量 1,000+", cover:"/uploads/covers/file-1.jpg" },
  { no:"06", title:"活动主视觉海报", type:"VISUAL DESIGN", desc:"活动主题视觉与宣传海报设计", category:"视觉设计", note:"海报设计 · 版式设计", cover:"/uploads/covers/file-4.jpg" },
  { no:"07", title:"品牌其他视觉设计", type:"BRAND VISUAL", desc:"实拍海报、LOGO 与视觉表达", category:"视觉设计", note:"LOGO · 视觉识别", cover:"/uploads/covers/1.jpg" },
  { no:"08", title:"信息可视化设计", type:"INFORMATION DESIGN", desc:"将信息内容转化为易于理解的视觉表达", category:"视觉设计", note:"信息设计 · 数据表达", cover:"/uploads/covers/3.jpg" },
  { no:"09", title:"导视系统设计", type:"SPATIAL VISUAL", desc:"围绕空间场景进行导视与视觉指引设计", category:"视觉设计", note:"导视设计 · 空间视觉", cover:"/uploads/covers/5-1.jpg" },
  { no:"10", title:"招生季抖音", type:"SHORT VIDEO", desc:"围绕招生季主题制作的短视频作品", category:"视频与 AI 创作", note:"播放量 1.4 万", cover:"/uploads/covers/douyin1.jpg" },
  { no:"11", title:"此刻年少", type:"THEME FILM", desc:"以青春与校园记忆为主题的视频作品", category:"视频与 AI 创作", note:"主题短片 · 视频制作", cover:"/uploads/covers/file-2.jpg" },
  { no:"12", title:"走进捣练图", type:"AIGC / MOTION", desc:"以传统艺术内容为主题的 AIGC 影像创作", category:"视频与 AI 创作", note:"国风动态影像 · 非遗文化", cover:"/uploads/covers/file-3.jpg" },
  { no:"13", title:"锦年 MV", type:"AI MUSIC VIDEO", desc:"以国风动画演绎蜀绣非遗之美", category:"视频与 AI 创作", note:"AI 音乐视频 · 视频剪辑", cover:"/uploads/covers/jingnian1-1.jpg" },
  { no:"14", title:"云深归处", type:"AI CREATIVE FILM", desc:"以像素复古与赛博国风交织的创意影像", category:"视频与 AI 创作", note:"创意影像 · 后期制作", cover:"/uploads/covers/yunshengguichu1-1.jpg" },
  { no:"15", title:"纳爱斯定格动画", type:"STOP MOTION", desc:"以拟人化的牙齿形象演绎口腔守护故事", category:"视频与 AI 创作", note:"定格动画 · 创意制作", cover:"/uploads/covers/naaisi1.jpg" },
  { no:"16", title:"H5｜围楼里·咏叹调", type:"INTERACTIVE / H5", desc:"以可互动的国风 H5 展现围楼文化之美", category:"其他作品", note:"交互设计 · 内容策划", cover:"/uploads/covers/7-1.jpg" },
  { no:"17", title:"公众号运营 SOP", type:"OPERATION TOOLKIT", desc:"围绕公众号运营流程整理的标准化操作文档", category:"其他作品", note:"流程梳理 · 运营规范", cover:"/uploads/covers/8-1.jpg" },
  { no:"18", title:"人物采访", type:"INTERVIEW / STORY", desc:"通过采访记录人物经历与观点，形成内容作品", category:"其他作品", note:"人物采访 · 内容采写", cover:"/uploads/covers/9-1.jpg" },
  { no:"19", title:"美术馆公众号推文", type:"CULTURE / WECHAT", desc:"围绕美术馆内容进行的公众号推文创作", category:"其他作品", note:"推文策划 · 文化传播", cover:"/uploads/covers/1-3.png" },
  { no:"20", title:"创意公众号作品", type:"CREATIVE CONTENT", desc:"以创意表达为核心的公众号内容作品", category:"其他作品", note:"创意策划 · 公众号内容", cover:"/uploads/covers/20261124-200652.jpg" },
  { no:"21", title:"摄影与摄像", type:"PHOTO / VIDEO", desc:"摄影、摄像及影像记录作品集合", category:"其他作品", note:"摄影 · 摄像 · 影像表达", cover:"/uploads/covers/6.jpg" }
];

function FarmLandscape({ mobile = false }: { mobile?: boolean }) {
  return mobile ? (
    <svg className="farm-art farm-art-mobile" viewBox="0 0 390 520" role="img" aria-label="手绘农场：小屋、奶牛、兔子和胡萝卜园">
      <g fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 344 Q65 292 120 320 T235 310 T380 330" />
        <path d="M0 385 Q68 350 135 375 T270 370 T400 380" />
        <path d="M10 440 Q80 408 150 432 T290 425 T390 438" />
        <path d="M42 320 Q25 260 65 226 Q90 205 111 230 Q132 258 111 318" />
        <path d="M48 260 Q26 238 34 214 M73 240 Q73 212 93 199 M91 263 Q119 246 123 223" />
        <path d="M240 300 L240 225 L290 185 L342 225 L342 303 Z" />
        <path d="M229 229 L290 176 L352 229 M268 303 L268 250 Q290 226 313 250 L313 303 M250 245 L268 245 M326 245 L340 245" />
        <path d="M20 170 Q35 154 54 166 Q69 151 86 168 Q105 170 105 185 L21 185 Q12 180 20 170Z" />
        <path d="M268 95 Q285 79 303 94 Q319 81 336 96 Q355 97 355 112 L268 112 Q259 106 268 95Z" />
        <path d="M38 80 q12 -12 24 0 q12 -12 24 0" />
        <path d="M148 140 q10 -10 20 0 q10 -10 20 0" />
        <path d="M20 475 q10 -25 18 0 q10 -33 20 0 M82 470 q8 -22 16 0 q10 -30 20 0 M340 468 q8 -24 16 0 q10 -30 18 0" />
        <path d="M135 352 q-7 -22 5 -34 q12 -10 23 0 q12 14 4 34 M140 321 l-4 -18 q11 1 15 14 M155 319 l7 -17 q10 8 5 20 M144 336 q8 -7 16 0" />
        <path d="M180 390 q-4 -20 10 -30 q13 -7 24 5 q8 10 2 25 M184 365 l-3 -17 q10 3 14 14 M202 362 l8 -14 q8 9 3 19 M190 378 q7 -6 13 0" />
        <path d="M285 385 q-5 -22 10 -32 q14 -8 25 7 q8 11 1 27 M289 358 l-3 -17 q12 3 16 15 M309 356 l9 -15 q8 10 2 20 M296 374 q7 -6 13 0" />
        <path d="M55 405 l7 -20 l8 20 M65 405 l9 -27 l9 27 M85 406 l7 -17 l8 17" />
        <path d="M30 505 q7 -18 13 0 M42 505 q7 -24 14 0 M360 506 q7 -19 13 0" />
      </g>
      <g fill="#e7d9c6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M48 345 Q43 322 62 313 Q82 307 94 326 Q104 345 91 357 Q72 367 55 356Z" />
        <path d="M51 326 Q38 309 48 298 Q62 299 65 319 M82 319 Q87 300 101 304 Q105 318 91 331" />
        <path d="M58 339 q5 -5 10 0 M78 339 q5 -5 10 0" fill="none" />
        <path d="M67 348 q7 6 14 0" fill="none" />
      </g>
      <g fill="#d8c9b7" stroke="currentColor" strokeWidth="1.3">
        <path d="M205 330 q-3 -23 14 -31 q17 -7 29 8 q10 13 2 27 q-20 15 -39 1Z" />
        <path d="M211 306 q-10 -20 2 -27 q14 5 14 22 M235 303 q7 -19 20 -16 q4 14 -8 25" />
        <path d="M216 321 q4 -4 8 0 M233 321 q4 -4 8 0 M223 331 q6 5 12 0" fill="none" />
      </g>
      <g fill="#d9b77f" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M112 415 Q120 398 132 414 Q141 396 151 414 L145 447 Q132 455 119 446Z" />
        <path d="M132 412 q-12 -20 -2 -26 q11 7 7 24 M136 411 q0 -24 13 -25 q5 14 -8 29 M129 412 q-3 -18 -17 -18 q-2 13 13 23" fill="#b6b99a" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M22 285 q-7 -8 -12 0 M27 288 q7 -9 13 -1 M355 285 q-7 -8 -12 0 M360 288 q7 -9 13 -1" />
        <path d="M165 465 q4 -12 8 0 q5 -15 10 0 M245 455 q4 -13 8 0 q5 -15 10 0" />
      </g>
    <FarmInkDetails mobile /></svg>
  ) : (
    <svg className="farm-art farm-art-desktop" viewBox="0 0 1440 650" role="img" aria-label="温柔手绘农场全景">
      <g fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 430 Q140 360 285 405 T560 395 T840 400 T1130 390 T1440 420" />
        <path d="M0 490 Q180 440 350 465 T680 455 T1000 462 T1440 450" />
        <path d="M0 555 Q180 510 360 535 T720 530 T1080 525 T1440 540" />
        <path d="M90 402 Q45 325 93 260 Q132 207 190 257 Q229 300 196 402" />
        <path d="M104 315 Q65 274 78 233 M145 275 Q144 227 178 210 M178 318 Q221 280 226 243" />
        <path d="M1070 400 Q1035 322 1072 258 Q1105 213 1152 260 Q1183 304 1159 405" />
        <path d="M1080 316 Q1055 280 1063 245 M1124 270 Q1130 224 1161 211 M1150 321 Q1190 286 1190 251" />
        <path d="M480 393 L480 240 L592 150 L708 240 L708 395Z" />
        <path d="M463 246 L592 137 L725 246 M532 395 L532 295 Q592 237 650 295 L650 395 M498 266 L526 266 L526 293 L498 293Z M665 266 L693 266 L693 293 L665 293Z" />
        <path d="M566 395 L566 331 Q592 309 616 331 L616 395" />
        <path d="M820 420 L820 300 L885 252 L950 300 L950 420 M806 305 L885 242 L964 305 M850 420 L850 340 Q885 310 920 340 L920 420" />
        <path d="M230 150 Q251 126 281 145 Q304 122 328 145 Q358 145 361 168 L230 168 Q215 160 230 150Z" />
        <path d="M910 100 Q932 77 958 97 Q982 74 1009 98 Q1035 98 1039 120 L910 120 Q895 112 910 100Z" />
        <path d="M1220 170 Q1235 155 1252 170 Q1268 155 1284 170" />
        <path d="M320 95 q15 -15 30 0 q15 -15 30 0 M730 115 q12 -12 24 0 q12 -12 24 0" />
        <path d="M30 595 q12 -30 24 0 q12 -38 24 0 M95 600 q10 -27 20 0 q12 -35 24 0 M1290 595 q12 -30 24 0 q12 -38 24 0 M1360 600 q10 -27 20 0 q12 -35 24 0" />
        <path d="M265 465 l10 -28 l11 28 M288 465 l11 -36 l12 36 M318 466 l10 -25 l11 25" />
        <path d="M750 490 q12 -22 23 0 q12 -30 23 0 M790 492 q12 -22 23 0" />
        <path d="M1180 478 q10 -24 20 0 q10 -30 20 0 M1220 480 q10 -22 20 0" />
        <path d="M385 340 q-10 -13 -20 0 M395 344 q10 -13 20 0 M980 215 q-10 -13 -20 0 M990 219 q10 -13 20 0" />
      </g>
      <g fill="#e9ddcc" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M160 425 Q145 385 174 365 Q207 344 239 373 Q267 400 246 434 Q212 455 177 442Z" />
        <path d="M174 380 Q152 353 165 332 Q190 332 198 365 M225 370 Q237 342 258 352 Q263 376 242 390" />
        <path d="M184 404 q8 -7 16 0 M216 404 q8 -7 16 0" fill="none" />
        <path d="M195 419 q12 10 24 0" fill="none" />
        <path d="M155 392 q-17 -12 -22 4 M245 392 q17 -12 22 4" fill="none" />
      </g>
      <g fill="#d8c9b7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <path d="M1130 440 q-5 -32 18 -45 q25 -12 43 10 q15 19 4 38 q-31 21 -65 -3Z" />
        <path d="M1140 403 q-15 -28 2 -39 q20 7 21 33 M1172 401 q10 -27 28 -21 q5 20 -14 35" />
        <path d="M1149 424 q6 -6 12 0 M1176 424 q6 -6 12 0 M1159 437 q10 7 19 0" fill="none" />
      </g>
      <g fill="#d9b77f" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M345 505 Q355 478 371 500 Q386 476 398 502 L390 552 Q371 565 353 551Z" />
        <path d="M369 500 q-16 -28 -2 -36 q16 9 9 34 M375 498 q1 -32 20 -34 q6 20 -12 39 M365 500 q-5 -25 -25 -26 q-3 18 20 33" fill="#b5b99b" />
        <path d="M405 525 Q412 505 425 522 Q439 502 450 525 L444 561 Q427 571 412 559Z" />
        <path d="M428 522 q-12 -24 0 -30 q14 8 8 29 M432 521 q2 -27 17 -28 q5 17 -11 33" fill="#b5b99b" />
      </g>
      <g fill="#f4eee2" stroke="currentColor" strokeWidth="1.3">
        <path d="M760 435 q-4 -24 13 -34 q18 -8 31 7 q10 14 1 28 q-24 16 -45 -1Z" />
        <path d="M768 407 q-12 -20 0 -27 q14 5 15 23 M792 405 q8 -20 22 -15 q4 15 -11 25" />
        <path d="M771 425 q5 -5 10 0 M790 425 q5 -5 10 0 M779 434 q7 5 14 0" fill="none" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M28 350 q-8 -10 -16 0 M38 354 q8 -10 16 0 M1320 330 q-8 -10 -16 0 M1330 334 q8 -10 16 0" />
        <path d="M520 520 q7 -18 14 0 q8 -23 16 0 M600 530 q7 -18 14 0 q8 -23 16 0 M1010 525 q7 -18 14 0 q8 -23 16 0" />
        <path d="M290 575 q5 -15 10 0 M305 575 q5 -18 10 0 M900 580 q5 -15 10 0 M915 580 q5 -18 10 0" />
      </g>
    <FarmInkDetails /></svg>
  );
}

function FarmInkDetails({ mobile = false }: { mobile?: boolean }) {
  return mobile ? <g fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" opacity=".82">
    <path d="M244 222 l9 -8 8 8 M251 213 l1 -8 M259 214 l7 -7 M242 237 l18 0 M247 243 l10 0" />
    <path d="M276 287 q7 -8 13 0 M281 280 q-2 -8 3 -11 M292 281 q4 -8 8 -6" />
    <path d="M45 458 q5 -13 10 0 q6 -18 12 0 M52 458 l-4 -9 M61 458 l5 -10 M320 448 q5 -13 10 0 q6 -18 12 0" />
    <path d="M113 330 q-5 -10 -10 -6 M118 327 q7 -11 13 -5 M110 337 l-7 4 M125 337 l7 4" />
    <path d="M238 390 l-8 -8 M244 390 l8 -8 M238 397 l-8 8 M244 397 l8 8" />
    <path d="M33 370 q7 -4 12 1 M36 376 q5 -2 9 1 M347 374 q-7 -4 -12 1" />
  </g> : <g fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" opacity=".82">
    <path d="M480 240 l18 -13 17 13 M488 235 l-2 -12 M500 230 l8 -11 M510 236 l12 -9" />
    <path d="M530 278 l18 0 M534 285 l11 0 M678 279 l-17 0 M675 286 l-10 0" />
    <path d="M85 430 q7 -18 14 0 q8 -24 16 0 M95 430 l-6 -13 M108 430 l7 -14 M1290 440 q7 -18 14 0 q8 -24 16 0" />
    <path d="M168 378 q-8 -12 -16 -5 M176 375 q8 -13 16 -5 M166 390 l-10 6 M181 389 l10 7" />
    <path d="M1140 425 q7 -7 13 0 M1147 432 q7 -6 14 0 M1154 439 q7 -5 13 0" />
    <path d="M350 545 q10 -18 20 0 M359 545 q-3 -13 5 -20 M373 545 q7 -16 14 0 M378 545 q-1 -12 8 -17" />
    <path d="M730 470 q8 -13 16 0 M738 470 q-1 -10 6 -15 M744 470 q7 -12 14 0" />
    <path d="M820 304 l8 -7 8 7 M827 297 l1 -9 M836 298 l8 -8" />
  </g>;
}

export function FarmDemo() {
  const [filter, setFilter] = useState("全部作品");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  useEffect(() => {
    const nodes = document.querySelectorAll(".farm-reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const shown = filter === "全部作品" ? projects : projects.filter(p => p.category === filter);
  return <main className="farm-site">
    <header className="farm-nav">
      <a className="farm-brand" href="#top" aria-label="回到农场首页"><span className="brand-mark">✳</span><span>YIYI'S LITTLE FARM</span></a>
      <nav className="farm-nav-links"><a href="#about">ABOUT ME</a><a href="#works">MY WORKS</a><a href="#contact">SAY HELLO</a></nav>
      <a className="farm-nav-note" href="#works">COME ON IN <span>↗</span></a>
    </header>

    <section className="farm-hero" id="top">
      <div className="farm-sky-note">A LITTLE WORLD<br/>FULL OF IDEAS</div>
      <div className="farm-sun"><span>☼</span></div>
      <div className="farm-title-wrap">
        <p className="farm-eyebrow">A CREATIVE PORTFOLIO BY YIYI</p>
        <h1>A little world<br/><em>of my own.</em></h1>
        <p className="farm-intro">你好，欢迎来到我的小农场。<br/>这里收藏着我的灵感、创意和每一次尝试。</p>
        <a href="#works" className="farm-primary-link">逛逛我的作品 <span>↘</span></a>
      </div>
      <div className="farm-landscape"><FarmLandscape/><FarmLandscape mobile/></div>
      <div className="farm-stamp"><span>GROWN WITH</span><strong>♥</strong><span>CREATIVITY</span></div>
      <div className="farm-scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="farm-about farm-reveal" id="about">
      <div className="farm-about-art">
        <div className="about-orbit orbit-one"></div><div className="about-orbit orbit-two"></div>
        <span className="about-spark">✳</span>
        <div className="about-card"><span>FIELD NOTE No.01</span><strong>Curious<br/>by nature.</strong><small>CREATIVE GROWER</small></div>
        <span className="about-flower-doodle">✿</span>
      </div>
      <div className="farm-about-copy">
        <p className="farm-kicker">A NOTE FROM THE FARMER</p>
        <h2>你好，我是<br/><em>唐艺丹</em></h2>
        <div className="about-identity"><span>专业</span><strong>网络与新媒体</strong><i>PERSONAL PROFILE</i></div>
        <p>关注内容策划、新媒体运营、视频与 AI 创作及视觉设计。喜欢观察生活、发现有趣的表达方式，也乐于尝试新的工具和可能性，希望把想法转化为真实、具体的内容与作品。</p>
        <div className="about-contact">
          <a href="tel:13982418101"><small>TEL</small>13982418101 ↗</a>
          <a href="mailto:485874231@qq.com"><small>EMAIL</small>485874231@qq.com ↗</a>
        </div>
        <div className="about-skills"><span>内容策划</span><span>新媒体运营</span><span>视频与 AI 创作</span><span>视觉设计</span></div>
        <div className="farm-signature">nice to meet you <span>♡</span></div>
      </div>
    </section>

    <section className="farm-works" id="works">
      <div className="farm-section-head farm-reveal"><div><p className="farm-kicker">THE FARM NOTICE BOARD · 01</p><h2>内容策划与<span>运营</span></h2><p className="farm-section-desc">把每一次观察、表达与尝试，认真钉在这里</p></div><div className="farm-doodle-carrot">🥕<small>fresh ideas</small></div></div>
      <div className="farm-board-wrap">
        <div className="board-topline"><span>PINNED WITH CARE</span><span>FIELD NOTES / 2026</span></div>
        <div className="farm-project-grid">
          {projects.filter(p => p.category === "内容策划与运营").map((project,index) => <button className={"farm-project farm-project-"+(index+1)} key={project.no} onClick={() => setOpenProject(project)}>
            <span className="paper-pin"></span><span className="paper-tape"></span>
            <span className="project-number">{project.no} / FIELD NOTE</span>
            <span className="project-illustration" aria-hidden="true">{project.cover ? <img src={project.cover} alt="" loading="lazy"/> : <span className="project-sprout">✳</span>}</span>
            <span className="project-type">{project.type}</span><strong>{project.title}</strong><span className="project-desc">{project.desc}</span><span className="project-note">{project.note}</span><span className="project-more">打开这张作品纸 <b>↗</b></span>
          </button>)}
          <span className="board-dried-flower flower-one">✿</span><span className="board-dried-flower flower-two">❀</span>
          <span className="board-handnote">ideas grow<br/>here ♡</span>
        </div>
        <div className="board-bottomline"><span>✳ LITTLE IDEAS, GROWN WITH CARE</span><span>— YIYI</span></div>
      </div>
      <div className="farm-interaction">
        <div className="interaction-copy"><span className="farm-kicker">A LITTLE FARM GAME</span><strong>给小奶牛一点草吧</strong><small>点一下草堆，看看它会怎么回应</small></div>
        <button className="hay-button" onClick={() => { const cow=document.querySelector('.little-cow'); cow?.classList.toggle('cow-fed'); if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance('哞～谢谢你！')); } }}>🌿 喂它吃草</button>
        <div className="little-cow" aria-label="正在散步的小奶牛"><span className="cow-body">🐄</span><span className="cow-caption">moo!</span></div>
      </div>
    </section>

    <section className="farm-extra-works farm-reveal">
      <div className="farm-section-head"><div><p className="farm-kicker">MORE HARVESTS FROM THE FARM</p><h2>还有一些<span>小小收获</span></h2><p className="farm-section-desc">不同的尝试，也在农场的其他角落慢慢生长</p></div></div>
      {["视觉设计","视频与 AI 创作","其他作品"].map((category,index) => <div className={"extra-category extra-category-"+index} key={category}>
        <div className="extra-category-title"><span>0{index+2}</span><h3>{category}</h3><i>✳</i></div>
        <div className="extra-projects">{projects.filter(p=>p.category===category).map((project,j)=><button key={project.no} className="extra-project" onClick={()=>setOpenProject(project)}><span className="extra-pin"></span>{project.cover && <img src={project.cover} alt="" loading="lazy"/>}<small>{project.type}</small><strong>{project.title}</strong><span>{project.desc}</span><b>查看作品 ↗</b></button>)}</div>
      </div>)}
    </section>


