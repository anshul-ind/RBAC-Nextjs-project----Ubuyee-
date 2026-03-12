// ─── Ubuyee Design Tokens: Border Radius (wraps CSS vars) ───────────────────
const radius = {
  none:  "0px",
  xs:    "var(--radius-xs)",
  sm:    "var(--radius-sm)",
  md:    "var(--radius-md)",
  lg:    "var(--radius-lg)",
  xl:    "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "3xl": "var(--radius-3xl)",
  "4xl": "var(--radius-4xl)",
  full:  "var(--radius-full)",
} as const

export default radius
