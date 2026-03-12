// ─── Ubuyee Design Tokens: Typography (wraps CSS vars) ───────────────────────
const typography = {
  fontSize: {
    xs:    "var(--text-xs)",
    sm:    "var(--text-sm)",
    base:  "var(--text-base)",
    md:    "var(--text-md)",
    lg:    "var(--text-lg)",
    xl:    "var(--text-xl)",
    "2xl": "var(--text-2xl)",
    "3xl": "var(--text-3xl)",
    "4xl": "var(--text-4xl)",
    "5xl": "var(--text-5xl)",
    "6xl": "var(--text-6xl)",
  },
  fontWeight: {
    normal:    "var(--font-normal)",
    medium:    "var(--font-medium)",
    semibold:  "var(--font-semibold)",
    bold:      "var(--font-bold)",
    extrabold: "var(--font-extrabold)",
    black:     "var(--font-black)",
  },
} as const

export default typography

export const font = typography

// Semantic text style presets (spread into inline styles)
export const textStyles = {
  pageTitle: {
    fontSize:      "var(--text-4xl)",
    fontWeight:    800 as const,
    lineHeight:    1.1,
    letterSpacing: "-0.03em",
    color:         "var(--color-900)",
  },
  sectionTitle: {
    fontSize:      "var(--text-2xl)",
    fontWeight:    800 as const,
    lineHeight:    1.1,
    letterSpacing: "-0.03em",
    color:         "var(--color-900)",
  },
  cardTitle: {
    fontSize:      "var(--text-lg)",
    fontWeight:    700 as const,
    lineHeight:    1.25,
    color:         "var(--color-900)",
  },
  bodyText: {
    fontSize:      "var(--text-base)",
    fontWeight:    400 as const,
    lineHeight:    1.5,
    color:         "var(--color-700)",
  },
  mutedText: {
    fontSize:      "var(--text-base)",
    fontWeight:    400 as const,
    lineHeight:    1.5,
    color:         "var(--color-500)",
  },
  label: {
    fontSize:      "var(--text-xs)",
    fontWeight:    700 as const,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color:         "var(--color-700)",
  },
  navLink: {
    fontSize:      "var(--text-base)",
    fontWeight:    500 as const,
    color:         "var(--color-500)",
  },
  badge: {
    fontSize:      "var(--text-xs)",
    fontWeight:    700 as const,
    letterSpacing: "0.02em",
  },
} as const
