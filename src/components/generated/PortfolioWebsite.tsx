import './portfolio-fonts.css';
import React, { useEffect, useState } from "react";
type CanvasBlock = {
  type: "color_panel" | "image" | "text";
  placement?: "after_cover" | "before_gallery" | "after_gallery" | "before_project_info" | "after_project_info" | "bottom";
  size?: "compact" | "standard" | "spacious";
  title?: string;
  background?: string;
  width?: "full" | "half" | "third";
  height?: number;
  padding?: number;
  radius?: number;
  layout?: "vertical" | "horizontal";
  image?: string;
  imagePosition?: "start" | "end";
  body?: string;
};
type Work = {
  id: string;
  title: string;
  type: string;
  desc: string;
  role: string;
  result?: string;
  tags: string[];
  detail: string[];
  tone: string;
  category?: string;
  coverImage?: string;
  gallery?: string[];
  videoUrl?: string;
  videoFile?: string;
  externalUrl?: string;
  coverFit?: string;
  coverRatio?: string;
  galleryColumns?: string;
  galleryRatio?: string;
  galleryFit?: string;
  galleryPosition?: string;
  canvasBlocks?: CanvasBlock[];
  sortOrder?: number;
};
const categories = [{
  id: "运营",
  label: "内容运营与策划",
  en: "CONTENT & OPERATIONS",
  intro: "从选题、内容生产到账号运营与数据观察，记录真实参与的项目和阶段成果。"
}, {
  id: "视频",
  label: "视频与 AI 创作",
  en: "VIDEO & AI CREATION",
  intro: "短视频、主题影像、AIGC 与定格动画作品。"
}, {
  id: "视觉",
  label: "视觉设计作品",
  en: "VISUAL DESIGN",
  intro: "海报、标识、IP、信息可视化与导视等视觉表达。"
}, {
  id: "其他",
  label: "其他作品",
  en: "OTHER WORKS",
  intro: "交互项目、内容工具、采访写作、摄影摄像及跨媒介实践。"
}];
const fallbackWorks: Work[] = [{
  id: "mt",
  title: "磨铁文化｜童书内容运营",
  type: "内容运营 / 小红书",
  desc: "围绕亲子阅读与儿童成长主题，参与内容选题、文案创作、AIGC 辅助制作与数据追踪。",
  role: "主要参与文案与内容制作，并参与选题规划、视觉呈现及内容优化；不将团队协作成果表述为个人独立完成。",
  result: "项目渠道支付金额突破 6,000 元（项目/团队成果）",
  tags: ["选题策划", "文案创作", "AIGC 辅助", "数据追踪"],
  detail: ["项目围绕童书内容传播与用户需求展开。", "参与内容选题、文案撰写及视觉内容制作，结合平台反馈持续调整表达。", "项目渠道支付金额突破 6,000 元，为团队项目成果。"],
  tone: "peach"
}, {
  id: "1688",
  title: "1688 AI 版｜选品体验与推广策略",
  type: "AI 产品 / GTM 模拟研究",
  desc: "基于公开信息与个人产品体验，梳理目标用户、使用路径、内容传播与体验指标。",
  role: "独立完成的个人模拟研究；区分公开事实、个人判断与待验证假设。",
  result: "个人模拟研究项目 · 非真实商业合作",
  tags: ["产品体验", "用户分析", "GTM 策略", "内容规划"],
  detail: ["以 1688 AI 版选品体验为研究对象，观察产品价值表达与使用流程。", "围绕小体量电商经营者梳理用户需求、体验路径和内容传播思路。", "研究基于公开资料与个人体验，尚未进行真实用户访谈或商业验证。"],
  tone: "lavender"
}, {
  id: "sanxiang",
  title: "三下乡实践｜抖音内容运营",
  type: "短视频 / 新媒体运营",
  desc: "参与实践项目抖音内容策划与视频运营，以真实实践记录作为内容切口。",
  role: "参与账号内容策划与视频制作运营。",
  result: "相关视频播放量 1.3 万+",
  tags: ["短视频策划", "内容运营", "项目记录"],
  detail: ["围绕三下乡实践过程进行内容策划与视频传播。", "通过真实场景记录呈现实践内容，相关视频播放量达到 1.3 万+。"],
  tone: "sage"
}, {
  id: "college",
  title: "学院融媒体公众号运营",
  type: "公众号 / 校园新媒体",
  desc: "参与学院融媒体公众号内容编辑与运营工作。",
  role: "参与公众号内容生产与日常运营。",
  result: "公众号用户规模 7,680+",
  tags: ["公众号运营", "内容编辑", "校园传播"],
  detail: ["围绕学院活动与校园资讯开展内容编辑和传播。", "公众号用户规模达到 7,680+。"],
  tone: "sand"
}, {
  id: "personal",
  title: "个人公众号｜热点内容创作",
  type: "个人内容创作 / 公众号",
  desc: "关注热点议题与内容表达，独立完成选题、撰写和发布。",
  role: "个人独立完成选题与文章创作。",
  result: "单篇文章阅读量 1,000+",
  tags: ["热点追踪", "独立写作", "内容表达"],
  detail: ["围绕热点话题进行信息梳理与内容表达。", "单篇文章阅读量达到 1,000+。"],
  tone: "rose"
}, {
  id: "v1",
  title: "招生季抖音",
  type: "短视频 / 策划与制作",
  desc: "围绕招生季主题制作的短视频作品。",
  role: "参与视频策划、拍摄与剪辑（具体分工以作品素材为准）。",
  result: "播放量 1.4 万",
  tags: ["短视频", "拍摄剪辑"],
  detail: ["以招生季传播为场景，通过短视频形式呈现相关内容。", "播放量 1.4 万。"],
  tone: "peach"
}, {
  id: "v2",
  title: "此刻年少",
  type: "主题短片 / 视频制作",
  desc: "以青春与校园记忆为主题的视频作品。",
  role: "视频创作实践。",
  tags: ["主题影像", "视频制作"],
  detail: ["主题短片作品，正式素材可在后台替换为视频或封面。"],
  tone: "sage"
}, {
  id: "v3",
  title: "走进捣练图",
  type: "AIGC / 影像创作",
  desc: "以传统艺术内容为主题的 AIGC 视频创作。",
  role: "参与 AI 辅助影像创作与内容表达。",
  tags: ["AIGC", "传统文化", "视频创作"],
  detail: ["围绕《捣练图》展开影像创作尝试，探索 AI 工具在传统文化内容表达中的应用。"],
  tone: "lavender"
}, {
  id: "v4",
  title: "锦年 MV",
  type: "音乐视频 / 剪辑",
  desc: "音乐视频作品。",
  role: "视频剪辑与创作实践。",
  tags: ["MV", "视频剪辑"],
  detail: ["音乐视频作品，后续可补充完整视频及创作说明。"],
  tone: "sand"
}, {
  id: "v5",
  title: "云深归处",
  type: "创意视频 / 后期制作",
  desc: "创意影像与后期制作作品。",
  role: "视频创作实践。",
  tags: ["创意影像", "后期制作"],
  detail: ["创意视频作品，后续可补充视频素材与制作过程。"],
  tone: "rose"
}, {
  id: "v6",
  title: "纳爱斯定格动画",
  type: "定格动画 / 创意制作",
  desc: "以定格动画形式完成的创意作品。",
  role: "参与定格动画创意与制作实践。",
  tags: ["定格动画", "创意制作"],
  detail: ["通过逐帧拍摄与画面组织完成动画表达，正式发布前可替换为原视频。"],
  tone: "sage"
}, {
  id: "d1",
  title: "活动主视觉海报",
  type: "平面设计 / 海报",
  desc: "活动主题视觉与宣传海报设计。",
  role: "视觉设计作品展示。",
  tags: ["海报设计", "版式设计"],
  detail: ["展示活动海报及主视觉延展。", "建议后台按项目上传原图，支持不同尺寸与比例。"],
  tone: "peach"
}, {
  id: "d2",
  title: "品牌 / 活动 LOGO",
  type: "标志设计 / 视觉识别",
  desc: "品牌或活动标识设计实践。",
  role: "标志创意与视觉表达。",
  tags: ["LOGO", "视觉识别"],
  detail: ["展示标志方案、设计稿及必要的应用效果。"],
  tone: "sage"
}, {
  id: "d3",
  title: "IP 表情包设计",
  type: "IP 设计 / 表情包",
  desc: "围绕角色形象进行的 IP 与表情延展。",
  role: "角色视觉与表情设计实践。",
  tags: ["IP 设计", "角色设计"],
  detail: ["展示角色形象、表情变化与应用场景。"],
  tone: "lavender"
}, {
  id: "d4",
  title: "信息可视化设计",
  type: "信息设计 / 可视化",
  desc: "将信息内容转化为易于理解的视觉表达。",
  role: "信息梳理与视觉呈现。",
  tags: ["信息设计", "数据表达"],
  detail: ["展示信息结构、视觉层级与最终设计稿。"],
  tone: "sand"
}, {
  id: "d5",
  title: "导视系统设计",
  type: "空间视觉 / 导视",
  desc: "围绕空间场景进行的导视与视觉指引设计。",
  role: "导视视觉设计实践。",
  tags: ["导视设计", "空间视觉"],
  detail: ["展示导视系统中的标识、指引与应用场景。"],
  tone: "rose"
}, {
  id: "o1",
  title: "H5｜围楼里·咏叹调",
  type: "交互设计 / H5",
  desc: "以 H5 形式呈现的交互内容作品。",
  role: "交互内容与页面设计实践。",
  tags: ["H5", "交互设计", "内容策划"],
  detail: ["展示 H5 的页面流程、关键界面与交互体验。", "如有可访问链接，可在后台补充外链。"],
  tone: "peach"
}, {
  id: "o2",
  title: "公众号运营 SOP",
  type: "运营工具 / 流程梳理",
  desc: "围绕公众号运营流程整理的标准化操作文档。",
  role: "梳理内容运营环节与执行流程。",
  tags: ["SOP", "流程管理", "运营规范"],
  detail: ["展示公众号运营流程、内容发布步骤与协作规范。"],
  tone: "sage"
}, {
  id: "o3",
  title: "人物采访",
  type: "采访 / 人物内容",
  desc: "通过采访记录人物经历与观点，形成内容作品。",
  role: "采访与内容整理实践。",
  tags: ["人物采访", "内容采写"],
  detail: ["展示采访对象、采访主题、代表性内容与成稿节选。"],
  tone: "lavender"
}, {
  id: "o4",
  title: "美术馆公众号推文",
  type: "新媒体内容 / 推文",
  desc: "围绕美术馆内容进行的公众号推文创作。",
  role: "参与推文内容策划与编辑。",
  tags: ["公众号推文", "文化传播"],
  detail: ["展示推文封面、正文长图或可访问链接。"],
  tone: "sand"
}, {
  id: "o5",
  title: "创意公众号作品",
  type: "创意内容 / 公众号",
  desc: "以创意表达为核心的公众号内容作品。",
  role: "创意构思与内容制作实践。",
  tags: ["创意策划", "公众号内容"],
  detail: ["展示创意主题、内容结构与最终呈现。"],
  tone: "rose"
}, {
  id: "o6",
  title: "摄影与摄像",
  type: "影像记录 / 摄影摄像",
  desc: "摄影、摄像及影像记录作品集合。",
  role: "影像拍摄与素材记录实践。",
  tags: ["摄影", "摄像", "影像表达"],
  detail: ["可按主题或项目展示精选照片与视频片段。"],
  tone: "sage"
}, {
  id: "o7",
  title: "外观专利相关项目",
  type: "综合实践 / 专利项目",
  desc: "参与外观专利相关的项目实践与成果整理。",
  role: "保留该项目展示入口，具体参与内容与成果材料以原始资料为准。",
  tags: ["综合项目", "设计实践"],
  detail: ["此处保留原作品集中的外观专利相关项目。", "后续根据原始资料补充项目背景、个人职责与专利/设计成果，不预设未确认的信息。"],
  tone: "lavender"
}];
const toneClass: Record<string, string> = {
  peach: "bg-[#f0e5dc]",
  lavender: "bg-[#e9e6ef]",
  sage: "bg-[#e5eae3]",
  sand: "bg-[#eae7df]",
  rose: "bg-[#eee2e1]"
};
function SectionHeading({
  index,
  title,
  en,
  intro
}: {
  index: string;
  title: string;
  en: string;
  intro: string;
}) {
  return <div className="mb-9 md:mb-12">
    <div className="text-[11px] tracking-[.25em] text-stone-400 mb-3">{index} / {en}</div>
    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
    <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-stone-500">{intro}</p>
  </div>;
}
export function PortfolioWebsite() {
  const [active, setActive] = useState("首页");
  const editableWorkFiles = import.meta.glob("../../../content/works/*.json", {
    eager: true,
    import: "default"
  }) as Record<string, Work>;
  const [works, setWorks] = useState<Work[]>(fallbackWorks);
  useEffect(() => {
    const cmsWorks = Object.values(editableWorkFiles).filter(
      (work): work is Work => Boolean(work && work.id && work.title)
    );
    const cmsIds = new Set(cmsWorks.map(work => work.id));
    const retainedFallback = fallbackWorks.filter(work => !cmsIds.has(work.id));
    setWorks([...retainedFallback, ...cmsWorks].sort(
      (a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999)
    ));
  }, []);
  const [selected, setSelected] = useState<Work | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const go = (id: string) => {
    setActive(id);
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const grouped = (id: string) => works.filter(w => w.category ? w.category === id : id === "运营" ? ["mt", "1688", "sanxiang", "college", "personal"].includes(w.id) : id === "视频" ? w.id.startsWith("v") : id === "视觉" ? w.id.startsWith("d") : w.id.startsWith("o"));
  const card = (w: Work, i: number) => <button key={w.id} onClick={() => setSelected(w)} className="text-left group bg-white border border-stone-200/80 p-5 md:p-6 flex flex-col min-h-[250px] hover:border-stone-400 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500">
    <div className="flex justify-between gap-3 text-[11px] text-stone-400"><span>{w.type}</span><span>{String(i + 1).padStart(2, "0")}</span></div>
    <div className={"mt-5 mb-5 flex items-center justify-center relative overflow-hidden " + (toneClass[w.tone] || "bg-stone-100")} style={{ aspectRatio: w.coverRatio === "square" ? "1 / 1" : w.coverRatio === "portrait" ? "3 / 4" : w.coverRatio === "landscape" ? "4 / 3" : "16 / 7" }}>
      {w.coverImage ? <img src={w.coverImage} alt={w.title} className="absolute inset-0 w-full h-full" style={{ objectFit: w.coverFit === "contain" ? "contain" : "cover" }} /> : <span className="text-4xl font-light text-stone-500/50">{String(i + 1).padStart(2, "0")}</span>}
      <span className="absolute inset-3 border border-white/60 pointer-events-none"></span>
    </div>
    <h3 className="text-base md:text-lg font-semibold tracking-tight">{w.title}</h3>
    <p className="mt-2 text-xs md:text-sm leading-6 text-stone-500 line-clamp-2">{w.desc}</p>
    <span className="mt-auto pt-4 text-xs text-stone-500 flex items-center gap-2">查看作品详情 <span className="group-hover:translate-x-1 transition-transform">→</span></span>
  </button>;

  const renderCanvasBlocks = (placement: NonNullable<CanvasBlock["placement"]>) => {
    if (selected?.id === "1688" || !selected?.canvasBlocks?.length) return null;
    const blocks = selected.canvasBlocks.filter(block => (block.placement || "after_cover") === placement);
    if (!blocks.length) return null;
    return <div className="mt-6 grid grid-cols-1 md:grid-cols-6 gap-4">
      {blocks.map((block, index) => {
        const widthClass = block.width === "third" ? "col-span-1 md:col-span-2" : block.width === "half" ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-6";
        const hasText = Boolean(block.title || block.body);
        const isImageOnly = Boolean(block.image && !hasText);
        const sizePadding = block.size === "compact" ? 12 : block.size === "spacious" ? 32 : 20;
        const blockStyle: React.CSSProperties = {
          minHeight: block.height && block.height > 0 ? block.height : undefined,
          padding: isImageOnly ? 0 : (block.padding ?? sizePadding),
          borderRadius: block.type === "color_panel" ? (block.radius ?? 8) : 0,
          backgroundColor: block.type === "color_panel" ? (block.background || "#F1E7DF") : undefined
        };
        if (block.type === "image") return block.image ? <div key={index} className={widthClass + " overflow-hidden"}><img src={block.image} alt={selected.title + " 展示图片"} className="block w-full h-auto object-contain" /></div> : null;
        if (block.type === "text") return <div key={index} style={blockStyle} className={widthClass + " bg-white border border-stone-200"}><h3 className="font-semibold text-base">{block.title}</h3><p className="mt-3 text-sm leading-7 text-stone-600 whitespace-pre-line">{block.body}</p></div>;
        const horizontal = block.layout === "horizontal" && hasText;
        const imageFirst = block.imagePosition !== "end";
        return <div key={index} style={blockStyle} className={widthClass + " " + (horizontal ? "flex flex-col md:flex-row" : "flex flex-col") + (isImageOnly ? "" : " gap-5") + " items-center overflow-hidden"}>
          {block.image && <img src={block.image} alt={selected.title + " 模块图片"} className={horizontal ? "w-full md:w-1/2 h-auto object-contain" : "w-full h-auto object-contain"} style={{ order: horizontal && !imageFirst ? 2 : 1 }} />}
          {hasText && <div className="flex-1 min-w-0 w-full" style={{ order: horizontal && !imageFirst ? 1 : 2 }}>
            {block.title && <h3 className="text-lg font-semibold">{block.title}</h3>}
            {block.body && <p className="mt-3 text-sm leading-7 text-stone-700 whitespace-pre-line">{block.body}</p>}
          </div>}
        </div>;
      })}
    </div>;
  };
  return <main className="min-h-screen bg-[#faf9f6] text-stone-900 selection:bg-stone-200">
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#faf9f6]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-5 md:px-10 h-[68px] flex items-center justify-between gap-4">
        <button onClick={() => go("首页")} className="font-semibold tracking-[.14em] text-xs md:text-sm whitespace-nowrap">TANG YI DAN<span className="text-stone-400">.</span></button>
        <nav className="hidden lg:flex items-center gap-6">
          {["首页", "运营", "视频", "视觉", "其他", "关于我"].map(n => <button key={n} onClick={() => go(n)} className={"text-sm transition-colors " + (active === n ? "text-stone-950" : "text-stone-400 hover:text-stone-800")}>{n === "运营" ? "内容运营" : n === "视频" ? "视频与 AI" : n === "视觉" ? "视觉设计" : n === "其他" ? "其他作品" : n}</button>)}
        </nav>
        <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden border border-stone-300 rounded-full px-3 py-2 text-xs">{mobileMenu ? "收起" : "菜单"}</button>
        <button onClick={() => go("关于我")} className="hidden sm:block text-xs tracking-wider border border-stone-300 rounded-full px-4 py-2 hover:bg-stone-900 hover:text-white transition">联系 / 关于</button>
      </div>
      {mobileMenu && <nav className="lg:hidden border-t border-stone-200 px-5 py-3 grid grid-cols-3 gap-2 bg-[#faf9f6]">
        {["首页", "运营", "视频", "视觉", "其他", "关于我"].map(n => <button key={n} onClick={() => go(n)} className="text-sm py-2 text-stone-600">{n === "运营" ? "内容运营" : n === "视频" ? "视频与AI" : n === "视觉" ? "视觉设计" : n === "其他" ? "其他作品" : n}</button>)}
      </nav>}
    </header>

    <section id="首页" className="scroll-mt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 grid md:grid-cols-[1.15fr_.85fr] gap-10 md:gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[.2em] text-stone-500 mb-7"><span className="w-7 h-px bg-stone-400"></span> PERSONAL PORTFOLIO · 2026</div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl leading-[1.08] tracking-[-.055em] font-semibold">唐艺丹<span className="text-stone-400">.</span></h1>
          <p className="mt-5 text-lg md:text-xl tracking-wide text-stone-700">网络与新媒体专业</p>
          <p className="mt-7 max-w-xl text-sm md:text-base leading-8 text-stone-500">关注内容策划、新媒体运营、视频与 AI 创作及视觉设计。希望把观察、想法与创意，转化为真实、具体的内容和作品。</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["内容策划", "新媒体运营", "视频与 AI 创作", "视觉设计"].map(x => <span key={x} className="rounded-full border border-stone-300 px-3.5 py-2 text-xs text-stone-600">{x}</span>)}
          </div>
          <div className="mt-10 flex flex-wrap gap-5 text-sm">
            <button onClick={() => go("运营")} className="border-b border-stone-900 pb-2 font-medium">浏览全部作品 ↓</button>
            <button onClick={() => go("关于我")} className="text-stone-500 pb-2 border-b border-stone-300">了解我 →</button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/4] md:aspect-[4/5] max-h-[500px] bg-[#e9e5dd] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_35%,#f8f5ef_0%,transparent_45%),linear-gradient(145deg,#d7d0c5,#eeebe5_55%,#c9c1b5)]"></div>
            <div className="absolute right-[12%] top-[12%] w-[62%] h-[76%] border border-white/60"></div>
            <div className="absolute left-[12%] bottom-[12%] text-[10px] tracking-[.3em] text-stone-600">SELECTED WORKS / 2026</div>
            <div className="absolute right-[12%] bottom-[12%] text-6xl md:text-7xl font-light text-white/80 tracking-[-.08em]">T.Y.D</div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-stone-200 bg-white/60">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-7 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((c, i) => <button key={c.id} onClick={() => go(c.id)} className="text-left flex items-center gap-3 group"><span className="text-xs text-stone-400">0{i + 1}</span><span className="text-xs md:text-sm text-stone-700 group-hover:text-stone-950">{c.label}</span></button>)}
      </div>
    </section>

    {categories.map((c, i) => <section id={c.id} key={c.id} className={"scroll-mt-20 " + (c.id === "视频" ? "bg-[#eeece7]" : "")}>
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
        <SectionHeading index={"0" + (i + 1)} title={c.label} en={c.en} intro={c.intro} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">{grouped(c.id).map((w, j) => card(w, j))}</div>
        {c.id === "运营" && <div className="mt-8 text-xs text-stone-500 border-t border-stone-200 pt-5">说明：项目数据按现有作品集资料呈现；团队项目成果与个人职责已分开说明。</div>}
        {c.id === "视频" && <div className="mt-8 text-xs text-stone-500">视频封面与播放素材待替换为原始文件；点击卡片可先查看作品说明。</div>}
        {c.id === "视觉" && <div className="mt-8 text-xs text-stone-500">视觉作品支持按项目上传不同尺寸的原图，不强制统一图片比例。</div>}
      </div>
    </section>)}

    <section id="关于我" className="scroll-mt-20 bg-[#222320] text-[#f4f2ed]">
      <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-14">
        <div><div className="text-[11px] tracking-[.25em] text-stone-400 mb-4">ABOUT ME</div><h2 className="text-4xl md:text-5xl leading-tight font-medium tracking-tight">保持好奇<br />持续创造<span className="text-stone-500">.</span></h2><p className="mt-6 text-sm text-stone-400">唐艺丹 · 网络与新媒体专业</p></div>
        <div>
          <p className="text-stone-300 text-sm md:text-base leading-8">我具备内容策划、账号运营、视频制作与视觉表达等实践经验。日常关注 AI 工具在内容生产中的应用，也乐于从用户视角发现问题、拆解需求，并尝试把想法转化为可执行的内容与项目。</p>
          <div className="mt-9 grid grid-cols-2 gap-6 border-t border-white/15 pt-7">
            {[["内容能力", "选题策划 / 文案 / 账号运营"], ["创作能力", "视频剪辑 / AIGC / 视觉设计"], ["运营能力", "数据追踪 / 内容复盘 / SOP"], ["工具应用", "ChatGPT / 剪映 / AI 创作工具"]].map(([a, b]) => <div key={a}><div className="text-sm">{a}</div><div className="mt-2 text-xs text-stone-400 leading-6">{b}</div></div>)}
          </div>
        </div>
      </div>
      <footer className="border-t border-white/15 mx-auto max-w-7xl px-5 md:px-10 py-7 flex flex-wrap justify-between gap-3 text-xs text-stone-500"><span>© 2026 TANG YI DAN · PORTFOLIO</span><span>THANK YOU FOR YOUR TIME.</span></footer>
    </section>

    {selected && <div className="fixed inset-0 z-50 bg-stone-950/55 p-3 md:p-8 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={selected.title} onClick={e => {
      if (e.target === e.currentTarget) setSelected(null);
    }}>
      <div className="bg-[#faf9f6] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-[#faf9f6]/95 backdrop-blur border-b border-stone-200 px-5 md:px-8 py-4 flex items-center justify-between">
          <span className="text-xs tracking-[.18em] text-stone-400">WORK DETAIL</span>
          <button onClick={() => setSelected(null)} className="text-sm text-stone-500 border border-stone-300 rounded-full px-3 py-1.5 hover:bg-stone-900 hover:text-white">关闭 ×</button>
        </div>
        <div className="p-5 md:p-9">
          <div className="text-xs text-stone-400">{selected.type}</div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{selected.title}</h2>
          <p className="mt-4 text-sm md:text-base text-stone-500 leading-7">{selected.desc}</p>
          <div className={"mt-7 min-h-[150px] flex items-center justify-center relative overflow-hidden " + (toneClass[selected.tone] || "bg-stone-100")} style={{ aspectRatio: selected.coverRatio === "square" ? "1 / 1" : selected.coverRatio === "portrait" ? "3 / 4" : selected.coverRatio === "landscape" ? "4 / 3" : "16 / 7" }}>
            {selected.coverImage ? <img src={selected.coverImage} alt={selected.title} className="absolute inset-0 w-full h-full" style={{ objectFit: selected.id === "1688" || selected.coverFit === "contain" ? "contain" : "cover" }} /> : <span className="text-5xl font-light text-stone-500/50">作品展示区</span>}
            <span className="absolute inset-4 border border-white/60 pointer-events-none"></span>
          </div>
          {renderCanvasBlocks("after_cover")}
          {selected.galleryPosition !== "after" && renderCanvasBlocks("before_gallery")}
          {selected.galleryPosition !== "after" && selected.gallery && selected.gallery.length > 0 && <div className="mt-5 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(3, Math.max(1, Number(selected.galleryColumns) || 2))}, minmax(0, 1fr))` }}>{selected.gallery.map((src, index) => <div key={index} className="bg-white overflow-hidden" style={{ aspectRatio: selected.galleryRatio === "square" ? "1 / 1" : selected.galleryRatio === "portrait" ? "3 / 4" : selected.galleryRatio === "landscape" ? "4 / 3" : undefined }}><img src={src} alt={selected.title + " " + (index + 1)} className={selected.galleryRatio === "original" || !selected.galleryRatio ? "w-full h-auto" : "w-full h-full"} style={{ objectFit: selected.galleryRatio === "original" || !selected.galleryRatio ? "contain" : selected.galleryFit === "cover" ? "cover" : "contain" }} /></div>)}</div>}
          {selected.galleryPosition !== "after" && renderCanvasBlocks("after_gallery")}
          {selected.videoFile && <video className="mt-5 w-full max-h-[560px] bg-black" src={selected.videoFile} controls playsInline />}
          {(selected.videoUrl || selected.externalUrl) && <div className="mt-5 flex flex-wrap gap-3">{selected.videoUrl && <a href={selected.videoUrl} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">观看视频 ↗</a>}{selected.externalUrl && <a href={selected.externalUrl} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">打开作品链接 ↗</a>}</div>}
          {renderCanvasBlocks("before_project_info")}
          {selected.id === "1688" ? <>
            <div className="mt-7 grid grid-cols-3 gap-2 md:gap-3">
              {[["30","模拟参与商家"],["14天","模拟活动周期"],["≥70%","模拟体验目标"]].map(([value,label]) => <div key={label} className="bg-[#eeeaf3] px-3 py-4 md:px-5 md:py-5"><div className="text-xl md:text-2xl font-semibold tracking-tight text-stone-900">{value}</div><div className="mt-1 text-[10px] md:text-xs text-stone-500">{label}</div></div>)}
            </div>
            <div className="mt-8">
              <div className="text-[10px] tracking-[.2em] text-stone-400 mb-4">PROJECT HIGHLIGHTS / 核心能力</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {selected.detail.map((d, i) => {
                  const [heading, ...body] = d.split("\\n");
                  return <div key={i} className={"p-4 md:p-5 " + (i === 0 ? "bg-[#eeeaf3] sm:col-span-2" : "bg-white border border-stone-200")}>
                    <div className="text-xs text-stone-400 mb-2">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className="text-sm md:text-base font-semibold">{heading.replace(/^\\d+｜/, "")}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-500">{body.join(" ")}</p>
                  </div>;
                })}
              </div>
            </div>
            <div className="mt-7 bg-stone-900 text-white p-5 md:p-6">
              <div className="text-xs text-stone-400 mb-2">MY ROLE / 个人职责</div>
              <p className="text-sm leading-7 text-stone-200">{selected.role}</p>
            </div>
            <p className="mt-4 text-xs leading-6 text-stone-400">注：30名商家、14天及≥70%均为模拟方案设定，不代表真实招募、执行或业务结果。项目基于公开资料与个人体验，尚未进行真实用户访谈。</p>
          </> : <div className="mt-8 grid md:grid-cols-[1fr_1fr] gap-7">
            <div><h3 className="text-sm font-semibold">项目 / 作品说明</h3><ul className="mt-3 space-y-2">{selected.detail.map((d, i) => <li key={i} className="text-sm leading-7 text-stone-500">· {d}</li>)}</ul></div>
            <div><h3 className="text-sm font-semibold">个人参与</h3><p className="mt-3 text-sm leading-7 text-stone-500">{selected.role}</p>{selected.result && <><h3 className="mt-6 text-sm font-semibold">项目结果</h3><p className="mt-2 text-sm leading-7 text-stone-700">{selected.result}</p></>}</div>
          </div>}
          {renderCanvasBlocks("after_gallery")}
          {renderCanvasBlocks("before_project_info")}
          {selected.galleryPosition === "after" && renderCanvasBlocks("before_gallery")}
          {selected.galleryPosition === "after" && selected.gallery && selected.gallery.length > 0 && <div className="mt-5 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(3, Math.max(1, Number(selected.galleryColumns) || 2))}, minmax(0, 1fr))` }}>{selected.gallery.map((src, index) => <div key={index} className="bg-white overflow-hidden" style={{ aspectRatio: selected.galleryRatio === "square" ? "1 / 1" : selected.galleryRatio === "portrait" ? "3 / 4" : selected.galleryRatio === "landscape" ? "4 / 3" : undefined }}><img src={src} alt={selected.title + " " + (index + 1)} className={selected.galleryRatio === "original" || !selected.galleryRatio ? "w-full h-auto" : "w-full h-full"} style={{ objectFit: selected.galleryRatio === "original" || !selected.galleryRatio ? "contain" : selected.galleryFit === "cover" ? "cover" : "contain" }} /></div>)}</div>}
          {selected.galleryPosition === "after" && renderCanvasBlocks("after_gallery")}
          {renderCanvasBlocks("after_project_info")}
          {renderCanvasBlocks("bottom")}
          <div className="mt-7 flex flex-wrap gap-2">{selected.tags.map(t => <span key={t} className="text-xs bg-stone-100 text-stone-500 px-3 py-2">{t}</span>)}</div>
          <p className="mt-8 pt-5 border-t border-stone-200 text-xs leading-6 text-stone-400">当前为作品详情结构预览，正式素材（图片、视频、文档或外部链接）将在下一步通过内容后台逐项补充。</p>
        </div>
      </div>
    </div>}
  </main>;
}