// ─── Ubuyee Design Tokens: Spacing (wraps CSS vars) ─────────────────────────
const space = {
  navHeight:    "var(--nav-height)",
  sidebarWidth: "var(--sidebar-width)",
  pageMaxWidth: "var(--page-max-width)",
  pagePadding:  "var(--page-padding)",
  cardPadding:  "var(--card-padding)",
  cardGap:      "var(--card-gap)",
  sectionGap:   "var(--section-gap)",
  1:  "var(--space-1)",
  2:  "var(--space-2)",
  3:  "var(--space-3)",
  4:  "var(--space-4)",
  5:  "var(--space-5)",
  6:  "var(--space-6)",
  8:  "var(--space-8)",
  10: "var(--space-10)",
  12: "var(--space-12)",
  16: "var(--space-16)",
} as const

export { space }
export default space
