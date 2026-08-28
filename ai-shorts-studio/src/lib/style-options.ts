// Plain client-safe option lists (no node built-ins), kept in sync with
// src/lib/media/captions.ts and src/lib/media/music.ts.

export const TONE_OPTIONS = [
  { key: "DRAMATIC", label: "Dramatic" },
  { key: "FUNNY", label: "Funny" },
  { key: "EDUCATIONAL", label: "Educational" },
  { key: "MOTIVATIONAL", label: "Motivational" },
  { key: "STORYTELLING", label: "Storytelling" },
  { key: "LUXURY", label: "Luxury" },
  { key: "DOCUMENTARY", label: "Documentary" },
] as const;

export const VISUAL_STYLE_OPTIONS = [
  { key: "cinematic-stock", label: "Cinematic stock" },
  { key: "dramatic-lighting", label: "Dramatic lighting" },
  { key: "corporate-modern", label: "Corporate modern" },
  { key: "futuristic-ui", label: "Futuristic UI" },
  { key: "archival-cinematic", label: "Archival cinematic" },
  { key: "luxury-slow-motion", label: "Luxury slow motion" },
  { key: "moody-dark", label: "Moody dark" },
  { key: "phone-screen-mockup", label: "Phone screen mockup" },
  { key: "high-energy-action", label: "High-energy action" },
] as const;

export const CAPTION_STYLE_OPTIONS = [
  { key: "bold-highlight", label: "Bold Highlight" },
  { key: "impact-caps", label: "Impact Caps" },
  { key: "clean-minimal", label: "Clean Minimal" },
  { key: "tech-glow", label: "Tech Glow" },
  { key: "documentary-serif", label: "Documentary Serif" },
  { key: "elegant-serif", label: "Elegant Serif" },
  { key: "news-ticker", label: "News Ticker" },
  { key: "dark-suspense", label: "Dark Suspense" },
  { key: "chat-bubble", label: "Chat Bubble" },
] as const;

export const MUSIC_STYLE_OPTIONS = [
  { key: "upbeat", label: "Upbeat" },
  { key: "cinematic-build", label: "Cinematic Build" },
  { key: "corporate-uplifting", label: "Corporate Uplifting" },
  { key: "electronic-pulse", label: "Electronic Pulse" },
  { key: "orchestral-tension", label: "Orchestral Tension" },
  { key: "ambient-luxury", label: "Ambient Luxury" },
  { key: "sports-hype", label: "Sports Hype" },
  { key: "suspense-drone", label: "Suspense Drone" },
  { key: "emotional-piano", label: "Emotional Piano" },
  { key: "lofi-ambient", label: "Lo-fi Ambient" },
  { key: "curious-playful", label: "Curious & Playful" },
] as const;

export const LANGUAGE_OPTIONS = [
  { key: "en", label: "English" },
  { key: "en-GB", label: "English (UK)" },
  { key: "es", label: "Spanish" },
  { key: "fr", label: "French" },
  { key: "de", label: "German" },
  { key: "pt", label: "Portuguese" },
] as const;

export const VIDEO_LENGTH_OPTIONS = [15, 30, 45, 60] as const;
