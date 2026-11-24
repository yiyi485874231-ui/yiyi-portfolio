import React, { useEffect, useState } from "react";
import "./farm-demo.css";

type Project = { no: string; title: string; type: string; desc: string; category: string; note: string };
const projects: Project[] = [
  { no: "01", title: "磨铁文化｜童书内容运营", type: "CONTENT & OPERATIONS", desc: "围绕亲子阅读主题，参与选题、文案创作与内容制作。", category: "内容运营", note: "内容选题 · 文案创作 · AIGC 辅助 · 数据观察" },
  { no: "02", title: "1688 AI 版｜产品体验研究", type: "AI PRODUCT / GTM", desc: "从产品体验出发，梳理用户需求、使用路径与内容推广策略。", category: "AI 创作", note: "个人模拟研究项目，非真实商业合作" },
  { no: "03", title: "三下乡实践｜抖音内容运营", type: "VIDEO & SOCIAL", desc: "记录真实实践场景，参与短视频内容策划与账号运营。", category: "内容运营", note: "短视频策划 · 内容运营 · 播放量 1.3 万+" },
  { no: "04", title: "视觉设计与创意表达", type: "VISUAL DESIGN", desc: "把想法变成图像，在不同媒介中探索视觉表达。", category: "视觉设计", note: "海报 · 品牌视觉 · 信息设计 · 导视" },
  { no: "05", title: "AI 视频与影像实验", type: "AI & MOTION", desc: "尝试用 AI 工具拓展影像叙事与创意内容的边界。", category: "AI 创作", note: "AIGC · 视频创作 · 影像表达" }
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
    </svg>
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
    </svg>
  );
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
      <div className="farm-about-art"><div className="about-orbit orbit-one"></div><div className="about-orbit orbit-two"></div><span className="about-spark">✳</span><div className="about-card"><span>FIELD NOTE No.01</span><strong>Curious<br/>by nature.</strong><small>CREATIVE GROWER</small></div></div>
      <div className="farm-about-copy"><p className="farm-kicker">A NOTE FROM THE FARMER</p><h2>把灵感种下去，<br/><em>让创意慢慢生长。</em></h2><p>我是唐艺丹，一名网络与新媒体专业的创作者。喜欢观察生活、发现有趣的表达方式，也乐于尝试新的工具和可能性。</p><p>从内容策划、视觉设计到视频与 AI 创作，这里记录着我一路收集、耕耘和生长的作品。</p><div className="farm-signature">nice to meet you <span>♡</span></div></div>
    </section>

    <section className="farm-works" id="works">
      <div className="farm-section-head farm-reveal"><div><p className="farm-kicker">LITTLE THINGS I'VE GROWN</p><h2>农场里的<span>小小收获</span></h2><p className="farm-section-desc">每一份作品，都是一次认真种下的想法</p></div><div className="farm-doodle-carrot">🥕<small>fresh ideas</small></div></div>
      <div className="farm-filters" role="group" aria-label="作品分类">
        {["全部作品", "内容运营", "视觉设计", "AI 创作"].map(item => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}<span>↗</span></button>)}
      </div>
      <div className="farm-project-grid">
        {shown.map((project, index) => <button className={"farm-project farm-project-" + (index % 5 + 1)} key={project.no} onClick={() => setOpenProject(project)}>
          <span className="project-number">{project.no} / HARVEST</span>
          <span className="project-illustration" aria-hidden="true"><span className="project-sprout">✳</span><span className="project-line"></span><span className="project-dot"></span></span>
          <span className="project-type">{project.type}</span><strong>{project.title}</strong><span className="project-desc">{project.desc}</span><span className="project-more">看看这份收获 <b>↗</b></span>
        </button>)}
      </div>
      <div className="farm-more-note"><span>✳</span> MORE LITTLE THINGS ARE GROWING...</div>
    </section>

    <section className="farm-note-section farm-reveal">
      <div className="note-illustration"><div className="note-cloud">☁</div><div className="note-barn">⌂</div><div className="note-flower">✿</div></div>
      <div><p className="farm-kicker">A LITTLE REMINDER</p><h2>好奇心，是最好的<br/><em>种子。</em></h2><p>保持好奇，持续创造。<br/>下一份作品，正在生长中。</p></div>
    </section>

    <footer className="farm-footer" id="contact"><div className="footer-top"><span>THANK YOU FOR WANDERING AROUND</span><span>✳</span></div><h2>Let's grow<br/><em>something lovely.</em></h2><p>感谢你来到我的小农场，希望这里有你喜欢的东西</p><a href="mailto:485874231@qq.com" className="farm-mail">Say hello <span>↗</span></a><div className="footer-bottom"><span>YIYI'S LITTLE FARM © 2026</span><span>MADE WITH CURIOSITY & CARE</span><a href="#top">BACK TO TOP ↑</a></div></footer>

    {openProject && <div className="farm-modal-backdrop" role="presentation" onClick={() => setOpenProject(null)}><section className="farm-modal" role="dialog" aria-modal="true" aria-label={openProject.title} onClick={e => e.stopPropagation()}><button className="farm-modal-close" onClick={() => setOpenProject(null)} aria-label="关闭">×</button><p className="farm-kicker">{openProject.type}</p><h2>{openProject.title}</h2><p>{openProject.desc}</p><div className="modal-note">{openProject.note}</div><small>这是首页视觉概念演示，正式接入时会打开原有作品详情。</small></section></div>}
  </main>;
}
