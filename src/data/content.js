// -----------------------------------------------------------------------------
// STATS — fallback numbers if the YouTube API is unreachable
// -----------------------------------------------------------------------------
export const STATS = [
  { value: 991, suffix: "+", label: "YOUTUBE SUBSCRIBERS" },
  { value: 225836, suffix: "+", label: "TOTAL VIEWS", format: true },
  { value: 576, suffix: "+", label: "VIDEOS PUBLISHED" },
  { value: 2018, suffix: "", label: "CREATING SINCE" },
];

export const GAMES = [
  { id: "01", name: "VALORANT", tags: "Competitive • Live • Gameplay" },
  { id: "02", name: "GTA V", tags: "Experiments • Mods • Gameplay" },
  { id: "03", name: "MINECRAFT", tags: "Gameplay • Challenges • Builds" },
  { id: "04", name: "FREE FIRE", tags: "Tournaments • Gameplay • Live" },
];

// -----------------------------------------------------------------------------
// AFFILIATE PARTNERS
// -----------------------------------------------------------------------------
export const PARTNERS = [
  {
    name: "ExitLag",
    tagline: "Official Partner — reduce your game ping",
    url: "https://exitlag.com/refer/SUBHRA18",
    cta: "GET EXITLAG",
  },
  {
    name: "Athena Gaming",
    tagline: "Play & win with my creator code",
    url: "https://subhragaming.athenagaming.gg",
    cta: "PLAY ON ATHENA",
  },
  {
    name: "TipsOnStream",
    tagline: "Support the stream with a tip",
    url: "https://tipsonstream.in/subhragaming69",
    cta: "TIP THE STREAM",
  },
];

// -----------------------------------------------------------------------------
// SETUP — devices used for gaming / streaming / editing
// -----------------------------------------------------------------------------
export const SETUP = [
  {
    category: "GAMING LAPTOP",
    name: "MSI GF63 Thin 11UC",
    specs: ["i5-11260H @ 2.60GHz", "16GB RAM", "RTX 3050 4GB"],
  },
  {
    category: "MOUSE",
    name: "Lapcare RAPIDO",
    specs: ["2400 DPI", "Wired", "Ergonomic design"],
  },
  {
    category: "KEYBOARD",
    name: "Lapcare RAPIDO",
    specs: ["RGB backlit", "Anti-ghosting", "Membrane"],
  },
  {
    category: "HEADSET",
    name: "boAt BassHeads 100",
    specs: ["10mm driver", "HD sound", "3.5mm jack"],
  },
  {
    category: "COOLING PAD",
    name: "Lapcare Chillmate",
    specs: ["Powerful fan", "Silent", "Ergonomic lift"],
  },
];

// -----------------------------------------------------------------------------
// COLLABORATE — categories from docs/BRAND_COLLABORATION.md
// -----------------------------------------------------------------------------
export const COLLAB_CATEGORIES = [
  {
    title: "Gaming Hardware",
    items: ["Mouse", "Keyboard", "Headset", "Controller", "Laptop/PC", "Accessories"],
  },
  {
    title: "Gaming Products",
    items: ["Games", "Gaming services", "Apps", "Platforms"],
  },
  {
    title: "Apparel",
    items: ["Jerseys", "Streetwear", "Gaming merchandise"],
  },
  {
    title: "Content Integrations",
    items: [
      "YouTube integration",
      "Livestream integration",
      "Shorts/Reels",
      "Product showcase",
      "Gaming challenge",
    ],
  },
];

export const COLLAB_TAGS = [
  "Gaming Hardware",
  "Games & Apps",
  "Apparel",
  "Product Integrations",
  "Livestream Campaigns",
  "Short-form Content",
];

// -----------------------------------------------------------------------------
// CHANNEL / IDENTITY
// -----------------------------------------------------------------------------
export const CHANNEL = {
  name: "Subhra Gaming",
  handle: "@subhragaming69",
  channelId: import.meta.env.VITE_YT_CHANNEL_ID || "UCqcRS--TP_aB46wDXSzBAbw",
  url: "https://www.youtube.com/@subhragaming69",
  avatar: "https://yt3.ggpht.com/9fDmuza7_GlrL6dpiU2-WSQCukV8PliP554Ktw2OA0__6AJK3HxyGCvKekJF91Ogy7oiC_RP5w=s800-c-k-c0x00ffffff-no-rj",
  email: "profession.subhra@gmail.com",
  badge: "OFFICIAL EXITLAG PARTNER",
};

export const SOCIALS = [
  { short: "YT", label: "YouTube", href: "https://www.youtube.com/@subhragaming69" },
  { short: "IG", label: "Instagram", href: "https://instagram.com/wao._.subhra" },
  { short: "DC", label: "Discord", href: "https://discord.com/invite/G7Qy28swPN" },
  { short: "KK", label: "Kick", href: "https://kick.com/SubhraGaming69" },
];

// -----------------------------------------------------------------------------
// FEATURED VIDEOS — hand-picked. Thumbnails load at max resolution (1280×720)
// directly from YouTube; no API needed for this section.
// -----------------------------------------------------------------------------
export const FEATURED_VIDEOS = [
  {
    id: "b5DGDLiTGuA",
    title: "I Ate Balasore's Breakfast for ₹100 😱 | Odisha Street Food Vlog",
    kind: "VLOG",
  },
  {
    id: "mfw40lh15dk",
    title: "We Survived Odisha's Wildest Waterfall Trek… | VLOG #1",
    kind: "VLOG",
  },
  {
    id: "OmYKZEJbxno",
    title: "I Love Roasting | Omegle - 3 | Subhra Gaming",
    kind: "ROAST",
  },
  {
    id: "xI94cG74CuI",
    title: "My FIRST VALORANT Premier Match Was INSANE! 🏆",
    kind: "GAMEPLAY",
  },
  {
    id: "qu8TW6EU6us",
    title: "🔴 LOUD vs EDG | GE vs. VIT — VALORANT Champions Shanghai — Group Stage #vctwatchparty",
    kind: "LIVE",
  },
  {
    id: "IeYV8pPCsHA",
    title: "🔴 CHAMPIONS 2026 BUNDLE IS HERE! 🔥 | VALORANT LIVE",
    kind: "LIVE",
  },
];
