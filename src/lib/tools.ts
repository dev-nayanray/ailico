/**
 * AI tools directory data.
 *
 * Editorial rules:
 * - Only real products with official websites we have reviewed.
 * - Pricing is recorded as a model (free / freemium / subscription / paid),
 *   never an exact price, because vendors change prices frequently.
 *   Always confirm current pricing on the official site.
 * - affiliateUrl stays null until a partnership is approved. Never fake it.
 * - lastVerified reflects the date the listing was last editorially checked.
 */

export const LAST_VERIFIED = "2026-10-28";

export type PricingModel = "free" | "freemium" | "subscription" | "paid";

export const pricingLabels: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  subscription: "Subscription",
  paid: "Paid",
};

export interface ToolCategory {
  slug: string;
  name: string;
  headline: string;
  description: string;
}

export interface AiTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  pricing: PricingModel;
  pricingNote: string;
  website: string;
  /** Only set after an affiliate partnership is approved in writing. */
  affiliateUrl: string | null;
  useCases: string[];
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  lastVerified: string;
  featured?: boolean;
}

export const toolCategories: ToolCategory[] = [
  {
    slug: "ai-writing",
    name: "AI Writing",
    headline: "AI writing tools for drafting, editing, and polishing content",
    description:
      "AI writing assistants help you outline articles, fix grammar, rewrite clunky sentences, and repurpose content for different channels. They work best as a first-draft partner with a human editor making final decisions — not as a replacement for judgment and fact-checking.",
  },
  {
    slug: "ai-image",
    name: "AI Image Generation",
    headline: "AI image tools for marketing visuals, illustrations, and design",
    description:
      "AI image generators create visuals from text prompts, edit existing images, and expand creative options for teams without a designer on staff. They are useful for blog headers, social posts, and concepting — with attention to each tool's commercial-use terms.",
  },
  {
    slug: "ai-video",
    name: "AI Video",
    headline: "AI video tools for creation, editing, and repurposing",
    description:
      "AI video tools cover text-to-video generation, talking-head avatars, transcript-based editing, and automatic clipping of long videos into shorts. They cut production time dramatically for marketing teams and solo creators.",
  },
  {
    slug: "ai-productivity",
    name: "AI Productivity",
    headline: "General AI assistants and productivity copilots",
    description:
      "General-purpose AI assistants answer questions, draft documents, summarize research, analyze files, and help with everyday reasoning tasks. They are the most flexible category and a sensible starting point for anyone new to AI.",
  },
  {
    slug: "ai-coding",
    name: "AI Coding",
    headline: "AI coding assistants and AI-first editors for developers",
    description:
      "AI coding tools autocomplete code, explain unfamiliar codebases, write tests, and refactor across files. They measurably speed up routine work for professional developers and help learners understand new languages and frameworks.",
  },
  {
    slug: "ai-marketing",
    name: "AI Marketing",
    headline: "AI marketing tools for campaigns, content, and creative",
    description:
      "AI marketing platforms generate ad creative, plan campaigns, and personalize outreach at scale. They suit small marketing teams that need more output without proportionally more headcount.",
  },
  {
    slug: "seo-tools",
    name: "SEO Tools",
    headline: "SEO platforms with AI-assisted research and optimization",
    description:
      "SEO tools research keywords, audit sites, track rankings, and increasingly use AI to brief content and diagnose issues. They are subscription products for teams serious about organic search as a channel.",
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    headline: "Automation platforms with AI actions for business workflows",
    description:
      "Automation platforms connect your apps and let AI steps classify data, draft content, or make decisions inside workflows. They remove repetitive manual work across sales, support, and operations.",
  },
];

export const aiTools: AiTool[] = [
  // ---------- AI Productivity ----------
  {
    slug: "chatgpt",
    name: "ChatGPT",
    tagline: "OpenAI's general-purpose AI assistant for writing, analysis, and coding",
    description:
      "ChatGPT is a conversational AI assistant made by OpenAI. It drafts and edits text, brainstorms, summarizes documents, analyzes data, writes and explains code, and supports custom instructions and memory for recurring work. It also handles image generation and file analysis in paid tiers, making it the most versatile general assistant for everyday productivity.",
    category: "ai-productivity",
    tags: ["assistant", "writing", "coding", "analysis"],
    pricing: "freemium",
    pricingNote: "Free tier available; paid plans add faster models and advanced features.",
    website: "https://chatgpt.com",
    affiliateUrl: null,
    useCases: [
      "Drafting emails, posts, and documentation",
      "Summarizing long documents and meeting notes",
      "Learning new topics with step-by-step explanations",
      "Writing and debugging code snippets",
    ],
    keyFeatures: [
      "Conversational assistant with strong general reasoning",
      "File upload and document analysis",
      "Custom instructions for consistent outputs",
      "Image generation and vision capabilities",
      "Web browsing for current information",
    ],
    pros: [
      "Very broad capability range in one interface",
      "Large ecosystem of guides and integrations",
      "Generous free tier for casual use",
    ],
    cons: [
      "Can be confidently wrong — outputs need fact-checking",
      "Popular features are gated behind paid plans",
      "Not designed as a specialized tool for any single job",
    ],
    bestFor: "Anyone who wants one flexible assistant for mixed everyday tasks.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "claude",
    name: "Claude",
    tagline: "Anthropic's AI assistant known for long documents and careful writing",
    description:
      "Claude is an AI assistant made by Anthropic. It is frequently used for long-form writing, editing, code, and analysis of lengthy documents, with a large context window that suits whole-file or whole-book tasks. Its Projects feature keeps reference material and instructions in one workspace, which is useful for recurring editorial and development work.",
    category: "ai-productivity",
    tags: ["assistant", "long-form writing", "coding", "analysis"],
    pricing: "freemium",
    pricingNote: "Free tier with usage limits; paid plans raise limits and add features.",
    website: "https://claude.ai",
    affiliateUrl: null,
    useCases: [
      "Editing and restructuring long documents",
      "Analyzing large codebases or contracts",
      "First drafts of articles and reports",
      "Structured brainstorming and decision support",
    ],
    keyFeatures: [
      "Very large context window for long documents",
      "Projects for organizing files and instructions",
      "Artifacts for iterating on documents and code",
      "Strong editing and nuanced writing quality",
    ],
    pros: [
      "Excels at long, careful written work",
      "Handles very large documents in one go",
      "Tone tends to be measured and precise",
    ],
    cons: [
      "Usage limits on lower tiers",
      "Fewer built-in extras than some rivals (e.g., image generation)",
      "Free tier availability varies by region",
    ],
    bestFor: "Writers, editors, and developers working with long documents or code.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "google-gemini",
    name: "Google Gemini",
    tagline: "Google's AI assistant integrated with Search and Workspace apps",
    description:
      "Gemini is Google's AI assistant, available as a standalone app and inside Gmail, Docs, and other Workspace tools. Its strengths are answers grounded in Google Search, multimodal input (text, images, audio), and convenience for people already living in Google's ecosystem.",
    category: "ai-productivity",
    tags: ["assistant", "google workspace", "research", "multimodal"],
    pricing: "freemium",
    pricingNote: "Free to use with a Google account; premium tier adds advanced models.",
    website: "https://gemini.google.com",
    affiliateUrl: null,
    useCases: [
      "Research with current web information",
      "Drafting and replying inside Gmail",
      "Summarizing and rewriting in Google Docs",
      "Working across text and images in one chat",
    ],
    keyFeatures: [
      "Integration with Gmail, Docs, and other Google apps",
      "Responses grounded in Google Search",
      "Multimodal input and output",
      "Generous free access",
    ],
    pros: [
      "Convenient if you already use Google Workspace",
      "Good at current-events questions via Search grounding",
      "Free tier is capable",
    ],
    cons: [
      "Quality varies more than rivals across query types",
      "Workspace integration is smoother on paid plans",
      "Feature rollout varies by region",
    ],
    bestFor: "Google Workspace users who want AI inside the apps they already use.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "notion-ai",
    name: "Notion AI",
    tagline: "AI writing and search built into the Notion workspace",
    description:
      "Notion AI adds writing assistance, summarization, translation, and Q&A over your workspace directly inside Notion. Instead of copying notes into a separate chatbot, you can summarize meeting notes, draft docs in place, and ask questions answered from your team's own pages.",
    category: "ai-productivity",
    tags: ["notes", "knowledge base", "writing", "summaries"],
    pricing: "subscription",
    pricingNote: "Paid add-on for Notion plans; pricing is per member.",
    website: "https://www.notion.com/product/ai",
    affiliateUrl: null,
    useCases: [
      "Summarizing meeting notes and long pages",
      "Drafting docs without leaving your workspace",
      "Searching company knowledge with natural questions",
      "Translating and polishing internal documentation",
    ],
    keyFeatures: [
      "Inline AI writing and editing in any Notion page",
      "Q&A grounded in your workspace content",
      "Auto-filled database properties and summaries",
      "Connectors to search selected external tools",
    ],
    pros: [
      "Zero context-switching for existing Notion users",
      "Answers grounded in your own documentation",
      "Improves consistency of team knowledge",
    ],
    cons: [
      "Only valuable if you already run your work in Notion",
      "Add-on cost scales with team size",
      "Less capable as a general assistant than dedicated chat tools",
    ],
    bestFor: "Teams already standardized on Notion for docs and project knowledge.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- AI Writing ----------
  {
    slug: "jasper",
    name: "Jasper",
    tagline: "AI writing platform built for marketing teams and brand content",
    description:
      "Jasper is an AI writing tool aimed at marketing teams. It supports brand voice configuration, campaign briefs, and dozens of templates for ads, emails, blogs, and social copy, with collaboration features for reviewing content at scale. It positions itself as a marketing content system rather than a general chatbot.",
    category: "ai-writing",
    tags: ["marketing copy", "brand voice", "campaigns", "long-form"],
    pricing: "subscription",
    pricingNote: "Paid subscription with tiers by usage and seats; no permanent free plan.",
    website: "https://www.jasper.ai",
    affiliateUrl: null,
    useCases: [
      "Producing on-brand marketing copy at volume",
      "Repurposing blog posts into emails and social variants",
      "Campaign briefs and ad variations",
      "Maintaining consistent tone across writers",
    ],
    keyFeatures: [
      "Brand voice training and style enforcement",
      "Templates and workflows for common marketing formats",
      "Team collaboration and review flows",
      "Browser extension for writing where you work",
    ],
    pros: [
      "Strong consistency controls for brand tone",
      "Purpose-built workflows for marketing output",
      "Good collaboration features for teams",
    ],
    cons: [
      "More expensive than general AI assistants",
      "Overkill for individuals with light writing needs",
      "Best output still requires editorial review",
    ],
    bestFor: "Marketing teams producing high volumes of on-brand content.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "copy-ai",
    name: "Copy.ai",
    tagline: "AI copy generator and go-to-market workflow automation",
    description:
      "Copy.ai started as a short-form copy generator and now also markets GTM AI workflows that chain research, drafting, and enrichment steps. It retains a large template library for emails, ads, product descriptions, and social posts, with a free tier suitable for trying the core generator.",
    category: "ai-writing",
    tags: ["copywriting", "sales copy", "workflows", "templates"],
    pricing: "freemium",
    pricingNote: "Free tier with limited credits; paid plans expand usage and workflows.",
    website: "https://www.copy.ai",
    affiliateUrl: null,
    useCases: [
      "Product descriptions and category copy",
      "Email and ad copy variants for testing",
      "Sales outreach first drafts",
      "Turning briefs into structured drafts",
    ],
    keyFeatures: [
      "Large library of copy templates",
      "Brand voice customization",
      "Multi-step workflows for repeatable content ops",
      "Team collaboration on projects",
    ],
    pros: [
      "Easy start with guided templates",
      "Free tier for evaluation",
      "Covers many marketing formats",
    ],
    cons: [
      "Short-form output often needs editing for quality",
      "Advanced workflow features take time to learn",
      "Credit limits can surprise heavy users",
    ],
    bestFor: "Small teams that need quick marketing copy drafts from templates.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "writesonic",
    name: "Writesonic",
    tagline: "AI writer for articles, ads, and SEO-focused content",
    description:
      "Writesonic is an AI writing tool with a broad template catalog covering long-form articles, landing page copy, ads, and product descriptions. It includes SEO-oriented features such as AI article drafts with outlines and integrations for fact-checking claims, targeting content marketers who publish frequently.",
    category: "ai-writing",
    tags: ["seo content", "articles", "ads", "long-form"],
    pricing: "freemium",
    pricingNote: "Free tier with limited words; paid plans unlock higher limits and features.",
    website: "https://writesonic.com",
    affiliateUrl: null,
    useCases: [
      "Drafting SEO-oriented blog articles",
      "Landing page and ad copy",
      "Product descriptions at scale",
      "Rewriting and expanding existing drafts",
    ],
    keyFeatures: [
      "Article writer with outline control",
      "Built-in SEO checks and suggestions",
      "Bulk generation for product copy",
      "Brand voice settings",
    ],
    pros: [
      "Wide template coverage",
      "Good balance of free usage to start",
      "SEO helpers guide structure",
    ],
    cons: [
      "Long-form drafts still need editing and fact-checking",
      "Interface has grown complex with many products",
      "Output quality varies by template",
    ],
    bestFor: "Content marketers publishing frequently on a budget.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "grammarly",
    name: "Grammarly",
    tagline: "Grammar, clarity, and tone checker across every app you write in",
    description:
      "Grammarly checks grammar, spelling, clarity, and tone in real time across browsers, desktop apps, and its web editor. Its generative features rewrite sentences, adjust tone, and draft short content, but its core value remains catching errors and tightening prose before you hit send.",
    category: "ai-writing",
    tags: ["grammar", "editing", "tone", "browser extension"],
    pricing: "freemium",
    pricingNote: "Solid free tier; premium adds advanced clarity, tone, and style suggestions.",
    website: "https://www.grammarly.com",
    affiliateUrl: null,
    useCases: [
      "Error-free emails and professional communication",
      "Tightening wordy drafts",
      "Adjusting tone for different audiences",
      "Consistent writing across a team",
    ],
    keyFeatures: [
      "Real-time grammar and spelling checks everywhere",
      "Clarity and conciseness rewrites",
      "Tone detection and adjustment",
      "Style guides for teams",
    ],
    pros: [
      "Works in virtually every writing surface",
      "Free tier covers most everyday needs",
      "Noticeably improves polish with minimal effort",
    ],
    cons: [
      "Suggestions can feel conservative for creative work",
      "Best features are behind premium",
      "Cloud processing of text may not suit all privacy policies",
    ],
    bestFor: "Professionals who write all day and need a safety net.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "quillbot",
    name: "QuillBot",
    tagline: "Paraphrasing and summarizing toolkit for writers and students",
    description:
      "QuillBot specializes in paraphrasing: it rewrites sentences and paragraphs in several modes (standard, formal, simple, and more), summarizes documents, checks grammar, and translates. It is popular with students and non-native English speakers who want alternative phrasings quickly.",
    category: "ai-writing",
    tags: ["paraphrasing", "summarizing", "students", "grammar"],
    pricing: "freemium",
    pricingNote: "Free tier with word limits per paraphrase; premium unlocks modes and length.",
    website: "https://quillbot.com",
    affiliateUrl: null,
    useCases: [
      "Rephrasing sentences for clarity or variety",
      "Summarizing research papers",
      "Grammar checking drafts",
      "Simplifying complex text",
    ],
    keyFeatures: [
      "Multiple paraphrase modes and synonym slider",
      "Summarizer for long documents",
      "Grammar and plagiarism tools",
      "Browser and Word integrations",
    ],
    pros: [
      "Fast, focused paraphrasing",
      "Useful free tier",
      "Simple interface with a short learning curve",
    ],
    cons: [
      "Narrower scope than full writing platforms",
      "Free mode limits on input length",
      "Paraphrasing alone won't fix weak structure",
    ],
    bestFor: "Writers who mainly need rewording, summarizing, and language help.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- AI Image ----------
  {
    slug: "midjourney",
    name: "Midjourney",
    tagline: "High-quality AI image generation with a distinctive artistic style",
    description:
      "Midjourney is an AI image generator known for painterly, high-detail results and strong art direction controls such as style references and consistent characters. It runs through Discord and a web app, and it is widely used for concept art, illustrations, and distinctive marketing visuals.",
    category: "ai-image",
    tags: ["text-to-image", "illustration", "concept art", "style reference"],
    pricing: "subscription",
    pricingNote: "Paid subscription tiers by generation time; no free tier.",
    website: "https://www.midjourney.com",
    affiliateUrl: null,
    useCases: [
      "Concept art and mood boards",
      "Illustrations for blogs and editorial content",
      "Distinctive hero and social visuals",
      "Exploring art directions quickly",
    ],
    keyFeatures: [
      "Industry-leading aesthetic quality",
      "Style and character reference controls",
      "Image editing and region-specific changes",
      "Web organizer for prompts and results",
    ],
    pros: [
      "Outstanding visual quality out of the box",
      "Deep controls for consistent style",
      "Strong community for prompts and ideas",
    ],
    cons: [
      "No free tier",
      "Learning curve for advanced prompting",
      "Commercial terms should be reviewed per plan",
    ],
    bestFor: "Creators and brands that want distinctive, high-craft visuals.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "adobe-firefly",
    name: "Adobe Firefly",
    tagline: "Adobe's commercially-safe AI image generation and editing family",
    description:
      "Firefly is Adobe's generational AI system for images, available as a standalone web app and inside Photoshop and Illustrator. It is trained on Adobe Stock and public-domain content, and Adobe offers indemnification on enterprise plans, which matters for brands with strict legal risk requirements.",
    category: "ai-image",
    tags: ["text-to-image", "photoshop", "generative fill", "commercial safe"],
    pricing: "freemium",
    pricingNote: "Free monthly generations; paid plans increase limits and add models.",
    website: "https://www.firefly.adobe.com",
    affiliateUrl: null,
    useCases: [
      "Marketing images with cleaner copyright risk",
      "Generative Fill edits inside Photoshop",
      "Vector and texture generation in Illustrator",
      "Brand-safe creative exploration",
    ],
    keyFeatures: [
      "Generative Fill and generative expand in Photoshop",
      "Text-to-image and structure/style references",
      "Designed for commercial safety",
      "Tight integration with Creative Cloud apps",
    ],
    pros: [
      "Best legal posture for enterprise brand work",
      "Feels native inside Photoshop workflows",
      "Free tier for trying the core features",
    ],
    cons: [
      "Aesthetic range narrower than some rivals",
      "Credit system takes planning",
      "Best experience requires Creative Cloud apps",
    ],
    bestFor: "Teams that need commercially safer generation inside Adobe workflows.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "leonardo-ai",
    name: "Leonardo.Ai",
    tagline: "Pro-grade AI image generation with fine control and trained models",
    description:
      "Leonardo.Ai offers text-to-image generation with an emphasis on control: fine-tuned community models, consistent characters, style presets, and an editor for refining results. It is popular for game art, product visuals, and marketing imagery where repeatable style matters.",
    category: "ai-image",
    tags: ["text-to-image", "custom models", "game art", "image editing"],
    pricing: "freemium",
    pricingNote: "Daily free token allowance; paid subscriptions expand speed and volume.",
    website: "https://leonardo.ai",
    affiliateUrl: null,
    useCases: [
      "Game and app art assets",
      "Product mockups and variations",
      "Consistent characters across a set of images",
      "Marketing visuals with repeatable style",
    ],
    keyFeatures: [
      "Large library of fine-tuned models",
      "Consistent character workflows",
      "Inpainting, outpainting, and upscaling",
      "Live canvas and real-time generation",
    ],
    pros: [
      "Excellent control for repeatable styles",
      "Daily free tokens make it easy to evaluate",
      "Strong tooling beyond raw generation",
    ],
    cons: [
      "Many options can overwhelm beginners",
      "Queue times vary on free tier",
      "Commercial terms depend on plan",
    ],
    bestFor: "Creators needing consistent, controllable image styles at volume.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "canva-magic-studio",
    name: "Canva Magic Studio",
    tagline: "AI design tools layered on Canva's template universe",
    description:
      "Magic Studio bundles Canva's AI features: text-to-image, Magic Write drafting, Magic Edit object replacement, background remover, and brand-locked templates. For small businesses already designing in Canva, it adds AI without changing tools.",
    category: "ai-image",
    tags: ["graphic design", "templates", "social graphics", "magic edit"],
    pricing: "freemium",
    pricingNote: "Free Canva tier includes some AI credits; Pro unlocks the full Magic Studio.",
    website: "https://www.canva.com",
    affiliateUrl: null,
    useCases: [
      "Social media graphics at brand speed",
      "Presentations and pitch decks",
      "Quick background removal and object edits",
      "Marketing kits from templates",
    ],
    keyFeatures: [
      "Magic Write for in-design copywriting",
      "Text-to-image and Magic Edit",
      "Brand kits enforce logos, fonts, and colors",
      "Huge template and stock library",
    ],
    pros: [
      "Gentlest learning curve in the category",
      "One tool for design plus AI helpers",
      "Free tier is genuinely usable",
    ],
    cons: [
      "AI features are lighter-duty than dedicated tools",
      "Credit limits on free plans",
      "Template-driven look requires effort to avoid",
    ],
    bestFor: "Small businesses that design in-house without a designer.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- AI Video ----------
  {
    slug: "runway",
    name: "Runway",
    tagline: "AI video generation and editing suite for creative teams",
    description:
      "Runway provides text-to-video and image-to-video generation plus a toolkit of AI editing utilities such as inpainting, motion brush, and green screen. It is used for ads, music videos, short films, and b-roll generation, with continuous model releases improving motion fidelity.",
    category: "ai-video",
    tags: ["text-to-video", "video editing", "vfx", "b-roll"],
    pricing: "freemium",
    pricingNote: "Limited free one-time credits; subscription plans expand generation capacity.",
    website: "https://runwayml.com",
    affiliateUrl: null,
    useCases: [
      "Generating b-roll and establishing shots",
      "Concepting video ideas before shooting",
      "VFX-style edits without After Effects",
      "Animated imagery for campaigns",
    ],
    keyFeatures: [
      "Text-to-video and image-to-video models",
      "Motion brush and camera controls",
      "Inpainting and object removal in video",
      "Frame interpolation and upscaling tools",
    ],
    pros: [
      "One of the most complete AI video toolkits",
      "Regular model improvements",
      "Fine creative controls beyond basic prompting",
    ],
    cons: [
      "Credits burn quickly on generations",
      "Physics and fine detail still imperfect",
      "Best results need prompt iteration",
    ],
    bestFor: "Creative teams adding generated video to real production work.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "pika",
    name: "Pika",
    tagline: "Playful text and image-to-video generation with effect presets",
    description:
      "Pika turns text prompts and images into short video clips, with signature 'Pikaffects' style effects and scene ingredients that make it easy for non-professionals to produce fun, shareable motion content. It targets social content creators more than film production.",
    category: "ai-video",
    tags: ["text-to-video", "image-to-video", "social content", "effects"],
    pricing: "freemium",
    pricingNote: "Free monthly credits; paid tiers increase length, quality, and priority.",
    website: "https://pika.art",
    affiliateUrl: null,
    useCases: [
      "Short social video clips from stills",
      "Attention-grabbing product teases",
      "Memes and reaction-style motion content",
      "Quick animatics for ideas",
    ],
    keyFeatures: [
      "Text-to-video and image-to-video",
      "One-click creative effects",
      "Scene ingredients for consistent elements",
      "Simple web editor",
    ],
    pros: [
      "Very easy to get started",
      "Fun presets produce shareable results fast",
      "Free credits to evaluate",
    ],
    cons: [
      "Clips are short and lower fidelity than pro tools",
      "Less fine control for precise direction",
      "Credit limits on free tier",
    ],
    bestFor: "Social creators making short, playful video from text or images.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "synthesia",
    name: "Synthesia",
    tagline: "AI avatar videos from scripts, in many languages",
    description:
      "Synthesia turns scripts into presenter-style videos using AI avatars, supporting dozens of languages and voices. Companies use it for training, onboarding, and internal comms because updating a video is as simple as editing the script.",
    category: "ai-video",
    tags: ["avatars", "training video", "localization", "presenters"],
    pricing: "subscription",
    pricingNote: "Paid plans by video minutes; limited free demo available.",
    website: "https://www.synthesia.io",
    affiliateUrl: null,
    useCases: [
      "Employee training and onboarding videos",
      "Product explainers without a film crew",
      "Localizing one video into many languages",
      "Regular internal comms updates",
    ],
    keyFeatures: [
      "Large library of realistic AI avatars",
      "Text-to-speech in many languages and accents",
      "Custom avatars of real people (on higher tiers)",
      "Slide-style scene editor with branding",
    ],
    pros: [
      "Cheapest path to presenter video at scale",
      "Localization is nearly instant",
      "Script-based editing is genuinely fast",
    ],
    cons: [
      "Avatar delivery can feel corporate",
      "Not suitable for cinematic marketing",
      "Minutes-based pricing needs monitoring",
    ],
    bestFor: "Teams producing training and internal comms videos frequently.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "descript",
    name: "Descript",
    tagline: "Edit video and podcasts by editing the transcript",
    description:
      "Descript transcribes your recordings and lets you edit audio and video by deleting words in the text. It adds studio sound cleanup, filler-word removal, eye-contact correction, and AI voices, making it a full podcast and YouTube production hub.",
    category: "ai-video",
    tags: ["podcast", "video editing", "transcription", "overdub"],
    pricing: "freemium",
    pricingNote: "Free tier with limited transcription hours; paid plans expand hours and AI features.",
    website: "https://www.descript.com",
    affiliateUrl: null,
    useCases: [
      "Editing podcasts by transcript",
      "Removing filler words and silences in one pass",
      "Producing YouTube talking-head videos",
      "Turning recordings into clips and articles",
    ],
    keyFeatures: [
      "Text-based audio and video editing",
      "Studio Sound audio cleanup",
      "Filler word and gap removal",
      "Screen recording with instant transcripts",
    ],
    pros: [
      "Fastest edit loop for talking-head content",
      "Audio cleanup saves re-records",
      "Great for solo podcasters",
    ],
    cons: [
      "Not a timeline NLE for complex video work",
      "Transcription hours capped per tier",
      "Heavy projects can strain the app",
    ],
    bestFor: "Podcasters and YouTube creators who speak for a living.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "opus-clip",
    name: "OpusClip",
    tagline: "Turn long videos into short social clips automatically",
    description:
      "OpusClip analyzes long videos, finds compelling moments, and cuts them into vertical short clips with captions, reframing, and virality scores. It is aimed at repurposing podcasts, webinars, and streams into TikTok, Reels, and Shorts content.",
    category: "ai-video",
    tags: ["shorts", "repurposing", "captions", "vertical video"],
    pricing: "freemium",
    pricingNote: "Free tier with limited upload minutes; paid plans raise minutes and quality.",
    website: "https://www.opus.pro",
    affiliateUrl: null,
    useCases: [
      "Podcast-to-shorts pipelines",
      "Webinar highlight reels",
      "Auto-captioned vertical clips for social",
      "Testing which moments resonate",
    ],
    keyFeatures: [
      "AI selection of highlight moments",
      "Auto captions with brand styles",
      "Speaker tracking and auto-reframe",
      "Scheduling and publishing assist",
    ],
    pros: [
      "Enormous time saver for repurposing",
      "Captions and reframing handled automatically",
      "Free tier enough to test the workflow",
    ],
    cons: [
      "Clip selection sometimes misses context",
      "Caption styles may need manual touch-ups",
      "Minutes pricing adds up for heavy use",
    ],
    bestFor: "Creators recycling long-form video into daily social clips.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- AI Coding ----------
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    tagline: "AI pair programmer embedded in your editor and GitHub",
    description:
      "GitHub Copilot autocompletes code and chat-explains codebases across major editors, backed by OpenAI models. A coding agent can take on issues in GitHub, and it is deeply integrated with the platform most developers already use for reviews and CI.",
    category: "ai-coding",
    tags: ["autocomplete", "pair programming", "chat", "github"],
    pricing: "freemium",
    pricingNote: "Limited free tier; paid individual and business plans with higher limits.",
    website: "https://github.com/features/copilot",
    affiliateUrl: null,
    useCases: [
      "Everyday autocomplete while coding",
      "Explaining unfamiliar code and errors",
      "Generating tests and commit messages",
      "Handing well-specified issues to the agent",
    ],
    keyFeatures: [
      "Inline code completions in major editors",
      "Copilot Chat with codebase context",
      "PR summaries and coding agent on GitHub",
      "Wide language and framework coverage",
    ],
    pros: [
      "Works wherever you already code",
      "Free tier for individuals",
      "Strong ecosystem momentum and updates",
    ],
    cons: [
      "Suggestions need review — security and correctness matter",
      "Deep context handling is weaker than AI-first editors",
      "Business features priced per seat",
    ],
    bestFor: "Professional developers who want solid autocomplete plus GitHub integration.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "cursor",
    name: "Cursor",
    tagline: "AI-first code editor built around multi-file context",
    description:
      "Cursor is a fork of VS Code rebuilt around AI: it indexes your codebase, lets you chat with the whole project as context, and applies multi-file edits from a single instruction. Composer-style agent workflows make refactors and feature scaffolds dramatically faster for experienced developers.",
    category: "ai-coding",
    tags: ["code editor", "agent", "refactoring", "vs code"],
    pricing: "freemium",
    pricingNote: "Free tier with limited usage; Pro plans expand models and agent runs.",
    website: "https://cursor.com",
    affiliateUrl: null,
    useCases: [
      "Multi-file refactors from one prompt",
      "Ramping into an unfamiliar codebase",
      "Scaffolding features end to end",
      "Fixing lint and test failures in bulk",
    ],
    keyFeatures: [
      "Codebase-wide indexing and chat",
      "Agent mode for multi-step edits",
      "VS Code extension compatibility",
      "Tab completion tuned for whole-project context",
    ],
    pros: [
      "Best-in-class whole-project context",
      "Imports your VS Code setup in minutes",
      "Rapid release cadence",
    ],
    cons: [
      "Usage-based limits can interrupt heavy sessions",
      "Agents can over-edit — review diffs carefully",
      "VS Code-only (no other editors)",
    ],
    bestFor: "Developers who want an editor where AI is the core, not a plugin.",
    lastVerified: LAST_VERIFIED,
    featured: true,
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    tagline: "Agentic IDE that plans and executes coding tasks with you",
    description:
      "Windsurf (formerly Codeium's editor) is an AI-first IDE whose agent plans, edits, and verifies changes across your repo while keeping you in flow. It grew from the Codeium autocomplete product and keeps a generous free tier.",
    category: "ai-coding",
    tags: ["code editor", "agent", "autocomplete", "free tier"],
    pricing: "freemium",
    pricingNote: "Free tier available; paid plans add model choice and usage.",
    website: "https://windsurf.com",
    affiliateUrl: null,
    useCases: [
      "Agentic feature development in a repo",
      "Fast autocomplete during normal coding",
      "Explaining and documenting legacy code",
      "Writing tests against existing modules",
    ],
    keyFeatures: [
      "Cascade agent for multi-step coding tasks",
      "Whole-repo awareness",
      "Strong free tier inherited from Codeium",
      "Familiar IDE experience with AI at the center",
    ],
    pros: [
      "Generous free usage",
      "Agent is good at planning before editing",
      "Lighter setup friction for newcomers",
    ],
    cons: [
      "Smaller ecosystem than VS Code/Cursor",
      "Agent quality varies by task complexity",
      "Rapid product changes under active development",
    ],
    bestFor: "Developers wanting an agentic IDE with a strong free tier.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "tabnine",
    name: "Tabnine",
    tagline: "AI code completion with privacy-first deployment options",
    description:
      "Tabnine is a code completion assistant focused on enterprise privacy: it can run fully on-premises or in your VPC, with personalized models trained on your codebase. It appeals to regulated teams that cannot send source code to third-party clouds.",
    category: "ai-coding",
    tags: ["autocomplete", "privacy", "enterprise", "self-hosted"],
    pricing: "freemium",
    pricingNote: "Basic free tier; dev and enterprise plans add personalization and private deployment.",
    website: "https://www.tabnine.com",
    affiliateUrl: null,
    useCases: [
      "Autocomplete in security-sensitive codebases",
      "Team-wide code style personalization",
      "On-prem AI for regulated industries",
      "Chat about code without cloud egress",
    ],
    keyFeatures: [
      "Air-gapped and VPC deployment options",
      "Personalized model training on your repos",
      "Chat and test generation",
      "Broad IDE support",
    ],
    pros: [
      "Strongest privacy story in the category",
      "Admin controls for large orgs",
      "Long track record in AI completion",
    ],
    cons: [
      "Raw capability trails the frontier assistants",
      "Setup heavier than SaaS rivals",
      "Best value emerges at team scale",
    ],
    bestFor: "Enterprises and regulated teams with strict code privacy rules.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- AI Marketing ----------
  {
    slug: "hubspot-breeze",
    name: "HubSpot Breeze",
    tagline: "AI built into HubSpot CRM for marketing, sales, and service",
    description:
      "Breeze is HubSpot's AI layer: it drafts content, scores and enriches leads, summarizes customer interactions, and automates prospecting research across the CRM. Because it acts on your real CRM data, outputs like email drafts and deal summaries arrive already in context.",
    category: "ai-marketing",
    tags: ["crm", "email marketing", "lead scoring", "content assistant"],
    pricing: "freemium",
    pricingNote: "Free CRM includes basic AI features; Breeze credits come with paid hubs.",
    website: "https://www.hubspot.com",
    affiliateUrl: null,
    useCases: [
      "Drafting marketing emails and landing copy",
      "Researching and enriching prospects",
      "Summarizing calls and deal threads",
      "Lead scoring tuned to your pipeline",
    ],
    keyFeatures: [
      "Content agent for campaigns and posts",
      "Prospecting agent for list research",
      "Conversation intelligence summaries",
      "Data enrichment from company web data",
    ],
    pros: [
      "AI works directly on your CRM data",
      "No separate tool to integrate",
      "Scales from free CRM upward",
    ],
    cons: [
      "Depth requires paid hubs and credits",
      "Most valuable only within HubSpot ecosystem",
      "Credit model needs monitoring",
    ],
    bestFor: "Small businesses already running marketing and sales on HubSpot.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "adcreative-ai",
    name: "AdCreative.ai",
    tagline: "Generate conversion-focused ad creatives and scores",
    description:
      "AdCreative.ai generates ad banners, product shots, and video ads from brand assets, and scores creative against historical performance data. It targets performance marketers who need many ad variants for testing without a design team.",
    category: "ai-marketing",
    tags: ["ad creative", "banners", "performance marketing", "a/b testing"],
    pricing: "subscription",
    pricingNote: "Trial available; subscription tiers based on credits per month.",
    website: "https://www.adcreative.ai",
    affiliateUrl: null,
    useCases: [
      "Producing many ad variants for testing",
      "Refreshed creatives for fatigue campaigns",
      "Product-focused banners from a store feed",
      "Scoring creative before spend",
    ],
    keyFeatures: [
      "Brand-locked creative generation",
      "Creative performance scoring",
      "Product photo enhancement workflows",
      "Platform-sized outputs for major ad networks",
    ],
    pros: [
      "Fast volume of on-brand ad variants",
      "Useful for small teams without designers",
      "Direct publishing integrations",
    ],
    cons: [
      "Templates can look similar across users",
      "Credit-based limits require planning",
      "Human review still needed for claims and compliance",
    ],
    bestFor: "Performance marketers testing lots of creative variants.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- SEO Tools ----------
  {
    slug: "semrush",
    name: "Semrush",
    tagline: "All-in-one SEO, content, and competitive research suite",
    description:
      "Semrush is one of the most complete SEO platforms: keyword research, rank tracking, site audits, backlink analysis, and content tooling under one login. Its AI writing assistant and keyword strategy features integrate with the core data, which keeps research and drafting in one place.",
    category: "seo-tools",
    tags: ["keyword research", "site audit", "rank tracking", "competitor analysis"],
    pricing: "subscription",
    pricingNote: "Paid subscription tiers; limited free tools and account access available.",
    website: "https://www.semrush.com",
    affiliateUrl: null,
    useCases: [
      "Keyword and topic research for content plans",
      "Technical audits of your site",
      "Competitor backlink and ad research",
      "Rank tracking over time",
    ],
    keyFeatures: [
      "Large keyword and domain databases",
      "Site audit with prioritized issues",
      "Content assistant and SEO writing tools",
      "Local SEO and listing management",
    ],
    pros: [
      "Very broad feature coverage",
      "Strong data for competitive analysis",
      "Industry standard — easy to hire for",
    ],
    cons: [
      "Expensive for hobby use",
      "Interface complexity takes learning",
    ],
    bestFor: "Marketing teams running SEO as a serious channel.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "ahrefs",
    name: "Ahrefs",
    tagline: "Backlink intelligence and SEO research trusted by pros",
    description:
      "Ahrefs is best known for its backlink index and Site Explorer, plus strong keyword research and site audit tools. Many SEO professionals prefer its data quality for link analysis and its straightforward reporting on what competitors rank for and why.",
    category: "seo-tools",
    tags: ["backlinks", "keyword research", "site explorer", "site audit"],
    pricing: "subscription",
    pricingNote: "Subscription tiers by tools and data access; free Webmaster Tools for own sites.",
    website: "https://ahrefs.com",
    affiliateUrl: null,
    useCases: [
      "Backlink audits and link prospecting",
      "Competitor content gap analysis",
      "Keyword difficulty checks",
      "Monitoring rankings and mentions",
    ],
    keyFeatures: [
      "Industry-leading backlink index",
      "Content Gap and competitor reports",
      "Site audit with clear issue explanations",
      "Free Webmaster Tools for site owners",
    ],
    pros: [
      "Excellent link and keyword data quality",
      "Clean, fast interface",
      "Free tier for site owners is genuinely useful",
    ],
    cons: [
      "Full toolset is costly",
      "Fewer non-SEO marketing features than suites",
    ],
    bestFor: "SEO practitioners focused on links and organic research.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    tagline: "Content optimization against live SERP data",
    description:
      "Surfer analyzes current top-ranking pages and turns the findings into an editorial brief: terms to include, headings, length, and images. Its document editor scores your draft as you write, making on-page optimization concrete rather than guesswork.",
    category: "seo-tools",
    tags: ["content optimization", "serp analysis", "briefs", "on-page seo"],
    pricing: "subscription",
    pricingNote: "Subscription plans by article credits; occasional limited free tools.",
    website: "https://surferseo.com",
    affiliateUrl: null,
    useCases: [
      "Briefing writers with data-backed outlines",
      "Optimizing drafts before publishing",
      "Refreshing old posts to regain rankings",
      "Auditing competitors' on-page structure",
    ],
    keyFeatures: [
      "Content editor with live optimization score",
      "SERP-based term and entity suggestions",
      "Content audit for existing URLs",
      "AI writing assistant integration",
    ],
    pros: [
      "Turns SEO guidance into concrete checklists",
      "Great for coordinating freelance writers",
      "Fast feedback loop while writing",
    ],
    cons: [
      "Score-chasing can produce keyword stuffing if used naively",
      "Article credits limit volume",
      "Needs judgment — SERPs aren't pure word counts",
    ],
    bestFor: "Content teams that publish SEO-targeted articles regularly.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "screaming-frog",
    name: "Screaming Frog SEO Spider",
    tagline: "Desktop crawler for technical SEO audits",
    description:
      "Screaming Frog crawls websites like a search engine and surfaces technical problems: broken links, redirects, duplicate content, missing metadata, and structured data issues. The free version covers small sites up to 500 URLs, which suits most small business audits.",
    category: "seo-tools",
    tags: ["crawler", "technical seo", "audits", "broken links"],
    pricing: "freemium",
    pricingNote: "Free up to 500 crawled URLs; one-time paid license removes the limit.",
    website: "https://www.screamingfrog.co.uk/seo-spider",
    affiliateUrl: null,
    useCases: [
      "Finding broken links and redirect chains",
      "Auditing titles, descriptions, and headings",
      "Checking structured data sitewide",
      "Pre-launch technical checks",
    ],
    keyFeatures: [
      "Full site crawl with exportable reports",
      "Custom extraction from page HTML",
      "Integration with analytics and Search Console data",
      "JavaScript rendering for modern sites",
    ],
    pros: [
      "Free tier covers small sites completely",
      "Extremely detailed technical data",
      "One-time license rather than monthly fees",
    ],
    cons: [
      "Desktop app, not cloud — tied to your machine",
      "Overwhelming output for beginners",
      "Requires SEO knowledge to act on findings",
    ],
    bestFor: "Anyone doing hands-on technical SEO audits.",
    lastVerified: LAST_VERIFIED,
  },

  // ---------- Business Automation ----------
  {
    slug: "zapier",
    name: "Zapier",
    tagline: "Connect thousands of apps with no-code automations and AI steps",
    description:
      "Zapier automates work between thousands of apps using simple trigger-and-action rules, and its AI steps and agents add drafting, classification, and decision-making inside flows. It is the default choice for small teams that need integrations without engineering.",
    category: "business-automation",
    tags: ["integrations", "no-code", "workflows", "ai agents"],
    pricing: "freemium",
    pricingNote: "Free tier for limited tasks; paid plans scale by task volume and features.",
    website: "https://zapier.com",
    affiliateUrl: null,
    useCases: [
      "Lead forms routed to CRM and notifications",
      "AI-drafted replies to common form inputs",
      "Syncing data between apps automatically",
      "Notifications and handoffs across teams",
    ],
    keyFeatures: [
      "Thousands of app integrations",
      "No-code editor with paths, filters, and formatting",
      "AI actions for text tasks inside Zaps",
      "Team workspaces with shared workflows",
    ],
    pros: [
      "Widest integration library in the market",
      "Non-technical teammates can build flows",
      "Free tier proves value quickly",
    ],
    cons: [
      "Task-based pricing grows with success",
      "Complex logic gets hard to maintain visually",
      "Not for high-volume data pipelines",
    ],
    bestFor: "Small teams automating handoffs between SaaS apps.",
    lastVerified: LAST_VERIFIED,
  },
  {
    slug: "make",
    name: "Make",
    tagline: "Visual automation platform for complex multi-step scenarios",
    description:
      "Make (formerly Integromat) is a visual automation builder where you design branching, iterating, error-handling workflows on a canvas. It handles more complex logic per operation than simpler trigger-action tools, at a lower price point for high volumes, with AI modules available for intelligent steps.",
    category: "business-automation",
    tags: ["visual automation", "scenarios", "data pipelines", "ai modules"],
    pricing: "freemium",
    pricingNote: "Free tier with limited operations; paid plans scale operations and features.",
    website: "https://www.make.com",
    affiliateUrl: null,
    useCases: [
      "Multi-step data pipelines between systems",
      "Conditional branching workflows with error routes",
      "Bulk processing with iterators and aggregators",
      "AI classification steps inside flows",
    ],
    keyFeatures: [
      "Visual scenario canvas with branching",
      "Iterators, aggregators, and error handlers",
      "HTTP and webhook modules for any API",
      "AI modules for text and classification tasks",
    ],
    pros: [
      "Handles complex logic elegantly",
      "Very good value for high-volume automation",
      "Powerful debugging view of every run",
    ],
    cons: [
      "Steeper learning curve than simple tools",
      "Canvas can look intimidating at first",
      "Operations pricing still needs monitoring",
    ],
    bestFor: "Ops-minded teams building more intricate automations affordably.",
    lastVerified: LAST_VERIFIED,
  },
];

export function getToolBySlug(slug: string): AiTool | undefined {
  return aiTools.find((tool) => tool.slug === slug);
}

export function getCategoryBySlug(slug: string): ToolCategory | undefined {
  return toolCategories.find((category) => category.slug === slug);
}

export function toolsInCategory(categorySlug: string): AiTool[] {
  return aiTools.filter((tool) => tool.category === categorySlug);
}

export function toolCountByCategory(categorySlug: string): number {
  return toolsInCategory(categorySlug).length;
}

export function featuredTools(): AiTool[] {
  return aiTools.filter((tool) => tool.featured);
}

export function relatedTools(tool: AiTool, count = 3): AiTool[] {
  const sameCategory = aiTools.filter(
    (candidate) => candidate.category === tool.category && candidate.slug !== tool.slug
  );
  if (sameCategory.length >= count) return sameCategory.slice(0, count);
  const others = aiTools.filter(
    (candidate) => candidate.category !== tool.category && candidate.slug !== tool.slug
  );
  return [...sameCategory, ...others].slice(0, count);
}

export function toolDestination(tool: AiTool): string {
  // Affiliate links activate only after an approved partnership.
  return tool.affiliateUrl ?? tool.website;
}
