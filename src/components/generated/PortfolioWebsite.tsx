import './portfolio-fonts.css';
import React, { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

function PdfPreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadingTask = getDocument(url);
    setLoading(true);
    setFailed(false);
    loadingTask.promise.then(async (pdf) => {
      if (cancelled || !containerRef.current) return;
      const container = containerRef.current;
      container.innerHTML = "";
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        if (cancelled) return;
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.max((container.clientWidth - 24) / baseViewport.width, 0.5);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        canvas.className = "block w-full h-auto mb-4 shadow-sm";
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.maxWidth = "100%";
        canvas.style.height = "auto";
        container.appendChild(canvas);
        const context = canvas.getContext("2d");
        if (context) {
          await page.render({ canvasContext: context, viewport, transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0] }).promise;
        }
      }
      if (!cancelled) setLoading(false);
    }).catch(() => { if (!cancelled) { setFailed(true); setLoading(false); } });
    return () => { cancelled = true; loadingTask.destroy(); };
  }, [url]);

  return <div className="w-full rounded-lg border border-stone-200 bg-stone-100 p-3 sm:p-5">
    {loading && !failed && <p className="py-8 text-center text-sm text-stone-500">正在加载文档…</p>}
    {failed && <p className="py-8 text-center text-sm text-stone-500">文档暂时无法加载，请使用上方链接打开原 PDF</p>}
    <div ref={containerRef} aria-label={title} />
  </div>;
}
type CanvasBlock = {
  type: "canvas" | "color_panel" | "image" | "text";
  placement?: "after_cover" | "before_gallery" | "after_gallery" | "before_project_info" | "after_project_info" | "bottom";
  size?: "compact" | "standard" | "spacious";
  title?: string;
  background?: string;
  width?: "full" | "half" | "third";
  moduleAlign?: "left" | "center" | "right";
  spacing?: "compact" | "standard" | "spacious";
  height?: number;
  padding?: number;
  radius?: number;
  layout?: "vertical" | "horizontal";
  image?: string;
  imageWidth?: number;
  imageRatio?: "original" | "landscape" | "square" | "portrait";
  imageAlign?: "left" | "center" | "right";
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
  pdfUrl?: string;
  externalUrl?: string;
  externalLinks?: { type?: string; title?: string; url?: string }[];
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
  const [activeVisual, setActiveVisual] = useState(0);
  const visualDragStart = useRef<number | null>(null);
  const go = (id: string) => {
    setActive(id);
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };
  const grouped = (id: string) => works.filter(w => w.category ? w.category === id : id === "运营" ? ["mt", "1688", "sanxiang", "college", "personal"].includes(w.id) : id === "视频" ? w.id.startsWith("v") : id === "视觉" ? w.id.startsWith("d") : w.id.startsWith("o"));
  const visualWorks = grouped("视觉");
  const activeVisualWork = visualWorks.length ? visualWorks[activeVisual % visualWorks.length] : null;
  const moveVisual = (direction: number) => setActiveVisual(current => (current + direction + Math.max(visualWorks.length, 1)) % Math.max(visualWorks.length, 1));
  const card = (w: Work, i: number, stacked = false) => <button key={w.id} onClick={() => setSelected(w)} style={stacked ? { zIndex: i + 1 } : undefined} className={"text-left group bg-white border border-stone-200/80 p-5 md:p-6 flex flex-col min-h-[250px] hover:border-stone-400 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 " + (stacked ? "portfolio-stack-card" : "")}>
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
    const isSanxiangInfoImage = selected?.id === "sanxiang" && placement === "after_project_info";
    const isCollegeInfoImage = selected?.id === "college" && placement === "after_project_info";
    const isPortfolioInfoImage = isSanxiangInfoImage || isCollegeInfoImage || (selected?.id === "d5" && placement === "after_project_info");
    return <div className={"flex flex-wrap items-start gap-4" + ((selected?.id === "mt" || selected?.id === "personal") && placement === "after_project_info" ? " mt-mobile-stack" : "")}>
      {blocks.map((block, index) => {
        const hasText = Boolean(block.title || block.body);
        const isImageOnly = Boolean(block.image && !hasText);
        const hasIndependentImageWidth = block.type === "canvas" && Boolean(block.image && block.imageWidth && block.imageWidth > 0) && !isPortfolioInfoImage;
        const widthClass = "w-full";
        const moduleWidth = block.width === "third" ? "calc(33.333333% - 0.666667rem)" : block.width === "half" ? "calc(50% - 0.5rem)" : "100%";
        const moduleSpacing = block.spacing === "compact" ? 8 : block.spacing === "spacious" ? 40 : 24;
        const sizePadding = block.size === "compact" ? 8 : block.size === "spacious" ? 24 : 16;
        const moduleLayoutStyle: React.CSSProperties = {
          width: moduleWidth,
          maxWidth: moduleWidth,
          flex: "0 0 " + moduleWidth,
          boxSizing: "border-box",
          marginTop: isPortfolioInfoImage ? 0 : moduleSpacing,
          marginLeft: block.moduleAlign === "right" || block.moduleAlign === "center" ? "auto" : 0,
          marginRight: block.moduleAlign === "left" ? 0 : "auto",
        };
        const blockStyle: React.CSSProperties = {
          ...moduleLayoutStyle,
          minHeight: block.height && block.height > 0 ? block.height : undefined,
          padding: block.size ? sizePadding : (block.padding ?? sizePadding),
          borderRadius: block.type === "color_panel" || block.type === "canvas" ? (block.radius ?? 8) : 0,
          backgroundColor: block.type === "color_panel" || block.type === "canvas" ? (block.background || "#F1E7DF") : undefined,
        };
        if (block.type === "image") return block.image ? <div key={index} style={moduleLayoutStyle} className={widthClass + " overflow-hidden"}><img src={block.image} alt={selected.title + " 展示图片"} className="block w-full h-auto object-contain" /></div> : null;
        if (block.type === "text") return <div key={index} style={blockStyle} className={widthClass + " bg-white border border-stone-200"}><h3 className="font-semibold text-base">{block.title}</h3><p className="mt-3 text-sm leading-7 text-stone-600 whitespace-pre-line">{block.body}</p></div>;
        const horizontal = (block.type === "color_panel" || block.type === "canvas") && block.layout === "horizontal" && hasText;
        const imageFirst = block.imagePosition !== "end";
        return <div key={index} style={blockStyle} className={widthClass + ((selected?.id === "mt" && index < 2 || ["personal", "v1", "v2", "d1", "d2", "d4", "o6"].includes(selected?.id || "")) && placement === "after_project_info" ? " mt-mobile-stack-item personal-mobile-stack-item" : "") + " " + (horizontal ? "flex flex-col md:flex-row" : "flex flex-col") + (isImageOnly ? "" : " gap-5") + " items-center overflow-hidden"}>
          {block.image && <img src={block.image} alt={selected.title + " 模块图片"} className={horizontal ? "max-w-full h-auto object-contain" : "h-auto object-contain"} style={{ width: hasIndependentImageWidth ? Math.min(100, Math.max(10, block.imageWidth!)) + "%" : (horizontal ? "50%" : "100%"), aspectRatio: block.imageRatio === "square" ? "1 / 1" : block.imageRatio === "portrait" ? "3 / 4" : block.imageRatio === "landscape" ? "4 / 3" : undefined, objectFit: "contain", alignSelf: block.imageAlign === "left" ? "flex-start" : block.imageAlign === "right" ? "flex-end" : "center", order: horizontal && !imageFirst ? 2 : 1 }} />}
          {hasText && <div className="flex-1 min-w-0 w-full" style={{ order: horizontal && !imageFirst ? 1 : 2 }}>
            {block.title && <h3 className="text-lg font-semibold">{block.title}</h3>}
            {block.body && <p className="mt-3 text-sm leading-7 text-stone-700 whitespace-pre-line">{block.body}</p>}
          </div>}
        </div>;
      })}
    </div>;
  };
  return <main className="min-h-screen bg-[#faf9f6] text-stone-900 selection:bg-stone-200">
    <style>{`.portfolio-visual-gallery { width: 100%; }
.portfolio-visual-stage { display: grid; grid-template-columns: minmax(360px,1fr) minmax(300px,.9fr); gap: clamp(24px,4vw,64px); align-items: center; min-height: 560px; }
.portfolio-visual-orbit { width: min(100%, 470px); aspect-ratio: 1; position: relative; margin: 0 auto; border-radius: 50%; touch-action: pan-y; }
.portfolio-visual-ring { position: absolute; border: 1px solid rgba(120,113,108,.22); border-radius: 50%; pointer-events: none; }
.portfolio-visual-ring-outer { inset: 4%; }
.portfolio-visual-ring-inner { inset: 18%; border-style: dashed; opacity: .7; }
.portfolio-visual-orbit::before,.portfolio-visual-orbit::after { content: ""; position: absolute; inset: 10%; border: 1px solid rgba(120,113,108,.12); border-radius: 50%; transform: rotate(28deg) scaleX(.72); pointer-events: none; }
.portfolio-visual-orbit::after { transform: rotate(-28deg) scaleX(.72); }
.portfolio-visual-orbit-core { position: absolute; inset: 31%; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; background: radial-gradient(circle,#fff 0%,#f7f5f0 72%,rgba(247,245,240,.3) 100%); color: #a8a29e; letter-spacing: .2em; font-size: 9px; }
.portfolio-visual-orbit-core strong { color: #292524; font-size: 46px; font-weight: 300; letter-spacing: -.06em; }
.portfolio-visual-orbit-item { position: absolute; transform: translate(-50%,-50%); z-index: 2; max-width: 154px; border: 1px solid transparent; border-radius: 999px; padding: 9px 13px; background: rgba(250,249,246,.94); color: #78716c; font-size: 11px; line-height: 1.35; white-space: nowrap; transition: color .3s,background .3s,border-color .3s,box-shadow .3s,transform .3s; }
.portfolio-visual-orbit-item.is-active { background: #252522; color: #fff; border-color: #252522; box-shadow: 0 8px 24px rgba(35,31,26,.18); transform: translate(-50%,-50%) scale(1.06); }
.portfolio-visual-feature { min-width: 0; animation: portfolioVisualReveal .55s ease both; }
.portfolio-visual-feature-meta { display:flex; justify-content:space-between; gap:12px; color:#a8a29e; font-size:10px; letter-spacing:.12em; margin-bottom:14px; }
.portfolio-visual-cover { width:100%; text-align:left; display:block; }
.portfolio-visual-cover-image { position:relative; width:100%; aspect-ratio: 4 / 3; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.portfolio-visual-cover-image img { width:100%; height:100%; object-fit:contain; transition:transform .7s cubic-bezier(.2,.7,.2,1); }
.portfolio-visual-cover:hover .portfolio-visual-cover-image img { transform:scale(1.035); }
.portfolio-visual-cover-image > span { font-size:72px; font-weight:300; color:rgba(87,83,78,.4); }
.portfolio-visual-cover-image i { position:absolute; inset:14px; border:1px solid rgba(255,255,255,.65); pointer-events:none; }
.portfolio-visual-cover-copy { padding:18px 2px 0; }
.portfolio-visual-cover-copy > span { color:#a8a29e; font-size:9px; letter-spacing:.18em; }
.portfolio-visual-cover-copy h3 { margin-top:8px; font-size:22px; font-weight:600; }
.portfolio-visual-cover-copy p { margin-top:8px; color:#78716c; font-size:13px; line-height:1.8; }
.portfolio-visual-controls { display:flex; align-items:center; justify-content:space-between; margin-top:22px; color:#a8a29e; font-size:9px; letter-spacing:.16em; }
.portfolio-visual-controls button { width:38px; height:38px; border:1px solid rgba(120,113,108,.3); border-radius:50%; color:#57534e; font-size:18px; transition:background .2s,color .2s; }
.portfolio-visual-controls button:hover { background:#252522; color:#fff; }
.portfolio-visual-mobile { display:none; }
@keyframes portfolioVisualReveal { from { opacity:0; transform:translateY(12px) scale(.985); } to { opacity:1; transform:translateY(0) scale(1); } }
@media (max-width: 767px) {
 .portfolio-visual-stage { display:none; }
 .portfolio-visual-mobile { display:block; overflow:hidden; }
 .portfolio-visual-mobile-stage { height:330px; position:relative; overflow:hidden; margin:0 -4px 24px; touch-action:pan-y; }
 .portfolio-visual-mobile-arc { position:absolute; inset:0; overflow:hidden; }
 .portfolio-visual-mobile-ring { position:absolute; width:300px; height:300px; top:50%; left:calc(100% + 0px); transform:translate(-50%,-50%); border:1px solid rgba(120,113,108,.24); border-radius:50%; box-shadow:0 0 0 22px rgba(120,113,108,.035),0 0 0 48px rgba(120,113,108,.025); }
 .portfolio-visual-mobile-item { position:absolute; transform:translate(-50%,-50%); max-width:130px; border:1px solid transparent; border-radius:999px; padding:8px 10px; background:rgba(250,249,246,.96); color:#78716c; font-size:10px; line-height:1.25; white-space:nowrap; transition:background .25s,color .25s,border-color .25s; }
 .portfolio-visual-mobile-item.is-active { background:#252522; color:#fff; border-color:#252522; box-shadow:0 7px 20px rgba(35,31,26,.16); }
 .portfolio-visual-mobile-center { position:absolute; left:0; top:50%; transform:translateY(-50%); width:calc(100% - 100px); display:flex; flex-direction:column; gap:9px; padding:16px 0; border-top:1px solid rgba(120,113,108,.2); border-bottom:1px solid rgba(120,113,108,.2); pointer-events:none; }
 .portfolio-visual-mobile-center span,.portfolio-visual-mobile-center small { color:#a8a29e; font-size:9px; letter-spacing:.16em; }
 .portfolio-visual-mobile-center strong { font-size:19px; line-height:1.35; font-weight:600; color:#292524; }
 .portfolio-visual-mobile-cover { display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr); gap:16px; width:100%; text-align:left; align-items:center; animation:portfolioVisualReveal .45s ease both; }
 .portfolio-visual-mobile-image { position:relative; width:100%; aspect-ratio:1; display:flex; align-items:center; justify-content:center; overflow:hidden; }
 .portfolio-visual-mobile-image img { width:100%; height:100%; object-fit:contain; }
 .portfolio-visual-mobile-image > span { font-size:48px; color:rgba(87,83,78,.4); font-weight:300; }
 .portfolio-visual-mobile-controls { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:22px; color:#a8a29e; font-size:9px; }
 .portfolio-visual-mobile-controls button { font-size:11px; color:#57534e; padding:8px 0; }
}
@media (max-width: 380px) { .portfolio-visual-mobile-cover { grid-template-columns:1fr; } .portfolio-visual-mobile-image { aspect-ratio:16/9; } }
@media (prefers-reduced-motion: reduce) { .portfolio-visual-feature,.portfolio-visual-mobile-cover { animation:none; } .portfolio-visual-cover-image img { transition:none; } }
@media (max-width: 767px) { .mt-mobile-stack-item { width: 100% !important; max-width: 100% !important; flex: 0 0 100% !important; } .personal-mobile-stack-item img { width: 100% !important; max-width: 100% !important; } .portfolio-operations-content .portfolio-stack-grid { display: grid; grid-template-columns: minmax(0,1fr); gap: 14px; align-items: start; } .portfolio-operations-content .portfolio-stack-grid > .portfolio-stack-card { position: sticky !important; top: 84px !important; align-self: start; min-height: 0; height: auto; width: 100%; margin: 0; background: #fff; box-shadow: 0 12px 32px rgba(35,31,26,.10); border-radius: 18px; } .portfolio-stack-card:nth-child(1) { margin-top: 0; } } .portfolio-category-card { position: relative; isolation: isolate; margin-top: 28px; margin-bottom: 28px; border: 1px solid rgba(120,113,108,.22); border-radius: 26px; background: #fff; box-shadow: 0 18px 48px rgba(35,31,26,.07); overflow: visible; } @media (min-width: 768px) { .portfolio-category-card::before { content: ""; position: absolute; inset: 8px -7px -8px 7px; z-index: -1; border: 1px solid rgba(120,113,108,.13); border-radius: inherit; background: rgba(255,255,255,.72); } } .portfolio-operations-layout { display: grid; grid-template-columns: minmax(220px,.72fr) minmax(0,1.8fr); gap: clamp(28px,4vw,64px); align-items: start; } .portfolio-operations-heading { position: sticky; top: 104px; align-self: start; } .portfolio-operations-heading > div { margin-bottom: 0; } .portfolio-operations-content { min-width: 0; } .portfolio-operations-content .portfolio-stack-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; } .portfolio-stack-card { position: relative; min-height: 0; border-radius: 16px; box-shadow: 0 5px 18px rgba(35,31,26,.045); transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; } .portfolio-stack-card:hover { transform: translateY(-4px); box-shadow: 0 14px 28px rgba(35,31,26,.09); } @media (min-width: 1500px) { .portfolio-operations-content .portfolio-stack-grid { grid-template-columns: repeat(3,minmax(0,1fr)); } } @media (max-width: 1023px) { .portfolio-operations-layout { display: block; } .portfolio-operations-heading { position: static; } .portfolio-operations-content .portfolio-stack-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } } @media (max-width: 639px) { .portfolio-category-card { margin: 16px 12px; border-radius: 20px; } .portfolio-operations-content .portfolio-stack-grid { grid-template-columns: minmax(0,1fr); } } @media (prefers-reduced-motion: reduce) { .portfolio-stack-card { transition: none !important; } .portfolio-category-card { animation: none !important; } }`}</style>
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
          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 text-sm text-stone-500">
            <a href="tel:13982418101" className="inline-flex items-center gap-3 hover:text-stone-900 transition-colors">
              <span className="text-[10px] tracking-[.18em] text-stone-400">TEL</span>
              <span>13982418101</span>
            </a>
            <a href="mailto:485874231@qq.com" className="inline-flex items-center gap-3 hover:text-stone-900 transition-colors">
              <span className="text-[10px] tracking-[.18em] text-stone-400">EMAIL</span>
              <span>485874231@qq.com</span>
            </a>
          </div>
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

    {categories.map((c, i) => <section id={c.id} key={c.id} className="scroll-mt-20 py-2 md:py-5">
      <div className={"portfolio-category-card mx-auto max-w-7xl px-5 md:px-10 py-12 md:py-16 " + (c.id === "运营" ? "portfolio-operations-card" : "")}>
        <div className={c.id === "运营" ? "portfolio-operations-layout" : ""}>
          <div className={c.id === "运营" ? "portfolio-operations-heading" : ""}>
            <SectionHeading index={"0" + (i + 1)} title={c.label} en={c.en} intro={c.intro} />
          </div>
          <div className={c.id === "运营" ? "portfolio-operations-content" : ""}>
            {c.id === "视觉" ? <div className="portfolio-visual-gallery">
              {activeVisualWork && <div className="portfolio-visual-stage" onWheel={event => { if (Math.abs(event.deltaY) > 8) moveVisual(event.deltaY > 0 ? 1 : -1); }} onPointerDown={event => { visualDragStart.current = event.clientX; }} onPointerUp={event => { if (visualDragStart.current !== null && Math.abs(event.clientX - visualDragStart.current) > 35) moveVisual(event.clientX < visualDragStart.current ? 1 : -1); visualDragStart.current = null; }} onPointerCancel={() => { visualDragStart.current = null; }}>
                <div className="portfolio-visual-orbit" aria-label="视觉设计作品圆弧导航">
                  <div className="portfolio-visual-ring portfolio-visual-ring-outer"></div>
                  <div className="portfolio-visual-ring portfolio-visual-ring-inner"></div>
                  <div className="portfolio-visual-orbit-core"><span>SELECTED</span><strong>{String(activeVisual + 1).padStart(2, "0")}</strong><span>VISUAL WORKS</span></div>
                  {visualWorks.map((work, index) => {
                    const count = visualWorks.length;
                    const angle = -90 + ((index - activeVisual + count) % count) * (360 / count);
                    const radians = angle * Math.PI / 180;
                    const x = Math.cos(radians) * 174;
                    const y = Math.sin(radians) * 174;
                    const isCurrent = index === activeVisual;
                    return <button key={work.id} type="button" onClick={() => setActiveVisual(index)} className={"portfolio-visual-orbit-item" + (isCurrent ? " is-active" : "")} style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }} aria-pressed={isCurrent}>
                      <span>{work.title}</span>
                    </button>;
                  })}
                </div>
                <div className="portfolio-visual-feature" key={activeVisualWork.id}>
                  <div className="portfolio-visual-feature-meta"><span>{activeVisualWork.type}</span><span>{String(activeVisual + 1).padStart(2, "0")} / {String(visualWorks.length).padStart(2, "0")}</span></div>
                  <button type="button" onClick={() => setSelected(activeVisualWork)} className="portfolio-visual-cover group">
                    <div className={"portfolio-visual-cover-image " + (toneClass[activeVisualWork.tone] || "bg-stone-100")}>
                      {activeVisualWork.coverImage ? <img src={activeVisualWork.coverImage} alt={activeVisualWork.title} /> : <span>{String(activeVisual + 1).padStart(2, "0")}</span>}
                      <i></i>
                    </div>
                    <div className="portfolio-visual-cover-copy"><span>OPEN PROJECT ↗</span><h3>{activeVisualWork.title}</h3><p>{activeVisualWork.desc}</p></div>
                  </button>
                  <div className="portfolio-visual-controls"><button type="button" onClick={() => moveVisual(-1)} aria-label="上一个作品">←</button><span>SCROLL / DRAG TO EXPLORE</span><button type="button" onClick={() => moveVisual(1)} aria-label="下一个作品">→</button></div>
                </div>
              </div>}
              <div className="portfolio-visual-mobile">
                {activeVisualWork && <div className="portfolio-visual-mobile-stage" onTouchStart={event => { visualDragStart.current = event.touches[0]?.clientY ?? null; }} onTouchEnd={event => { const end = event.changedTouches[0]?.clientY; if (visualDragStart.current !== null && end !== undefined && Math.abs(end - visualDragStart.current) > 28) moveVisual(end < visualDragStart.current ? 1 : -1); visualDragStart.current = null; }}>
                  <div className="portfolio-visual-mobile-arc">
                    <div className="portfolio-visual-mobile-ring"></div>
                    {visualWorks.map((work, index) => {
                      const count = visualWorks.length;
                      const offset = index - activeVisual;
                      const angle = 180 + offset * Math.min(34, 170 / Math.max(count - 1, 1));
                      const radians = angle * Math.PI / 180;
                      const x = Math.cos(radians) * 150;
                      const y = Math.sin(radians) * 150;
                      const isCurrent = index === activeVisual;
                      return <button key={work.id} type="button" onClick={() => setActiveVisual(index)} className={"portfolio-visual-mobile-item" + (isCurrent ? " is-active" : "")} style={{ left: `calc(100% + ${x}px)`, top: `calc(50% + ${y}px)` }} aria-pressed={isCurrent}><span>{work.title}</span></button>;
                    })}
                  </div>
                  <div className="portfolio-visual-mobile-center"><span>NOW SELECTED</span><strong>{activeVisualWork.title}</strong><small>{String(activeVisual + 1).padStart(2, "0")} / {String(visualWorks.length).padStart(2, "0")}</small></div>
                </div>}
                {activeVisualWork && <button type="button" onClick={() => setSelected(activeVisualWork)} className="portfolio-visual-mobile-cover group">
                  <div className={"portfolio-visual-mobile-image " + (toneClass[activeVisualWork.tone] || "bg-stone-100")}>{activeVisualWork.coverImage ? <img src={activeVisualWork.coverImage} alt={activeVisualWork.title} /> : <span>{String(activeVisual + 1).padStart(2, "0")}</span>}</div>
                  <div className="pt-4"><span className="text-[10px] tracking-[.18em] text-stone-400">{activeVisualWork.type}</span><h3 className="mt-2 text-lg font-semibold">{activeVisualWork.title}</h3><p className="mt-2 text-sm leading-6 text-stone-500">{activeVisualWork.desc}</p><span className="mt-4 inline-block text-xs text-stone-500">查看作品详情 ↗</span></div>
                </button>}
                <div className="portfolio-visual-mobile-controls"><button type="button" onClick={() => moveVisual(-1)}>← 上一个</button><span>滑动弧线切换作品</span><button type="button" onClick={() => moveVisual(1)}>下一个 →</button></div>
              </div>
            </div> : <div className={c.id === "运营" ? "portfolio-stack-grid" : "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"}>{grouped(c.id).map((w, j) => card(w, j, c.id === "运营"))}</div>}
            {c.id === "运营" && <div className="mt-8 text-xs text-stone-500 border-t border-stone-200 pt-5">说明：项目数据按现有作品集资料呈现；团队项目成果与个人职责已分开说明。</div>}
            {c.id === "视频" && <div className="mt-8 text-xs text-stone-500">视频封面与播放素材待替换为原始文件；点击卡片可先查看作品说明。</div>}
          </div>
        </div>
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
          {selected.pdfUrl && <section className="mt-7"><div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold">运营 SOP 文档预览</h3><a href={selected.pdfUrl} target="_blank" rel="noreferrer" className="text-xs text-stone-500 underline underline-offset-4">打开原 PDF ↗</a></div><PdfPreview url={selected.pdfUrl} title={selected.title + " PDF 在线阅读"} /><p className="mt-2 text-xs text-stone-400">可直接上下滑动阅读全部页面，无需下载文件</p></section>}
          {selected.videoUrl && <div className="mt-5 w-full overflow-hidden rounded-lg bg-black" style={{ aspectRatio: "16 / 9" }}><iframe src={selected.videoUrl + (selected.videoUrl.includes("?") ? "&" : "?") + "embed=1&layout=full"} title={selected.title + " 视频播放器"} className="block w-full h-full border-0" allow="autoplay *; fullscreen *; encrypted-media *; picture-in-picture *" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>}
          {((selected.externalLinks && selected.externalLinks.filter(link => link.url)) || (selected.externalUrl ? [{ title: "打开作品链接", url: selected.externalUrl }] : [])).length > 0 && <div className="mt-5 flex flex-wrap gap-4">{(selected.externalLinks && selected.externalLinks.filter(link => link.url).length ? selected.externalLinks.filter(link => link.url) : selected.externalUrl ? [{ title: "打开作品链接", url: selected.externalUrl }] : []).map((link, index) => <a key={index} href={link.url} target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4">{link.title || "打开作品链接"} ↗</a>)}</div>}
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
          </> : (selected.id === "sanxiang" || selected.id === "college" || selected.id === "d5") ? <div className="mt-8 grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-7 md:gap-9 items-start">
            <div className={"min-w-0 " + (selected.id === "sanxiang" ? "order-2 md:order-1" : "")}>{renderCanvasBlocks("after_project_info")}</div>
            <div className={"min-w-0 space-y-7 " + (selected.id === "sanxiang" ? "order-1 md:order-2" : "")}>
              <section><h3 className="text-sm font-semibold">项目 / 作品说明</h3><ul className="mt-3 space-y-2">{selected.detail.map((d, i) => <li key={i} className="text-sm leading-7 text-stone-500">· {d}</li>)}</ul></section>
              <section><h3 className="text-sm font-semibold">个人参与</h3><p className="mt-3 text-sm leading-7 text-stone-500">{selected.role}</p></section>
              {selected.result && <section><h3 className="text-sm font-semibold">项目结果</h3><p className="mt-3 text-sm leading-7 text-stone-700">{selected.result}</p></section>}
            </div>
          </div> : <div className="mt-8 grid md:grid-cols-[1fr_1fr] gap-7">
            <div><h3 className="text-sm font-semibold">项目 / 作品说明</h3><ul className="mt-3 space-y-2">{selected.detail.map((d, i) => <li key={i} className="text-sm leading-7 text-stone-500">· {d}</li>)}</ul></div>
            <div><h3 className="text-sm font-semibold">个人参与</h3><p className="mt-3 text-sm leading-7 text-stone-500">{selected.role}</p>{selected.result && <><h3 className="mt-6 text-sm font-semibold">项目结果</h3><p className="mt-2 text-sm leading-7 text-stone-700">{selected.result}</p></>}</div>
          </div>}
          {renderCanvasBlocks("after_gallery")}
          {selected.galleryPosition === "after" && renderCanvasBlocks("before_gallery")}
          {selected.galleryPosition === "after" && selected.gallery && selected.gallery.length > 0 && <div className="mt-5 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(3, Math.max(1, Number(selected.galleryColumns) || 2))}, minmax(0, 1fr))` }}>{selected.gallery.map((src, index) => <div key={index} className="bg-white overflow-hidden" style={{ aspectRatio: selected.galleryRatio === "square" ? "1 / 1" : selected.galleryRatio === "portrait" ? "3 / 4" : selected.galleryRatio === "landscape" ? "4 / 3" : undefined }}><img src={src} alt={selected.title + " " + (index + 1)} className={selected.galleryRatio === "original" || !selected.galleryRatio ? "w-full h-auto" : "w-full h-full"} style={{ objectFit: selected.galleryRatio === "original" || !selected.galleryRatio ? "contain" : selected.galleryFit === "cover" ? "cover" : "contain" }} /></div>)}</div>}
          {selected.galleryPosition === "after" && renderCanvasBlocks("after_gallery")}
          {selected.id !== "sanxiang" && selected.id !== "college" && selected.id !== "d5" && renderCanvasBlocks("after_project_info")}
          {renderCanvasBlocks("bottom")}
          <div className="mt-7 flex flex-wrap gap-2">{selected.tags.map(t => <span key={t} className="text-xs bg-stone-100 text-stone-500 px-3 py-2">{t}</span>)}</div>
          <p className="mt-8 pt-5 border-t border-stone-200 text-xs leading-6 text-stone-400">当前为作品详情结构预览，正式素材（图片、视频、文档或外部链接）将在下一步通过内容后台逐项补充。</p>
        </div>
      </div>
    </div>}
  </main>;
}