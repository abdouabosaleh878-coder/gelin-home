// Client-safe option lists mirroring src/lib/media/sfx.ts and compose.ts's transition map.

export const TRANSITION_OPTIONS = [
  { key: "crossfade", label: "Crossfade" },
  { key: "slow-crossfade", label: "Slow crossfade" },
  { key: "hard-cut", label: "Hard cut" },
  { key: "slide", label: "Slide" },
  { key: "glitch", label: "Glitch" },
  { key: "flash-cut", label: "Flash cut" },
  { key: "zoom-punch", label: "Zoom punch" },
] as const;

export const SFX_OPTIONS = [
  { key: "whoosh-in", label: "Whoosh in" },
  { key: "riser", label: "Riser" },
  { key: "swipe", label: "Swipe" },
  { key: "pop", label: "Pop" },
  { key: "click", label: "Click" },
  { key: "ding", label: "Ding" },
  { key: "soft-thud", label: "Soft thud" },
] as const;
