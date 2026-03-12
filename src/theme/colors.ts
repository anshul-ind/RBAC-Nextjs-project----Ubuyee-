// ─── Ubuyee Design Tokens: Colors (wraps CSS vars) ──────────────────────────
// The actual values live in globals.css :root
// These wrappers are for type-safe JS usage
// Most components use var() directly — no import needed

const colors = {
  primary: {
    DEFAULT: "var(--color-primary)",
    hover:   "var(--color-primary-hover)",
    light:   "var(--color-primary-light)",
    border:  "var(--color-primary-border)",
    muted:   "var(--color-primary-muted)",
  },
  neutral: {
    900: "var(--color-900)",
    800: "var(--color-800)",
    700: "var(--color-700)",
    600: "var(--color-600)",
    500: "var(--color-500)",
    400: "var(--color-400)",
    300: "var(--color-300)",
    200: "var(--color-200)",
    100: "var(--color-100)",
    50:  "var(--color-50)",
    0:   "var(--color-0)",
  },
  navy: {
    DEFAULT: "var(--color-navy)",
    light:   "var(--color-navy-light)",
    muted:   "var(--color-navy-muted)",
  },
  success: {
    DEFAULT: "var(--color-success)",
    light:   "var(--color-success-light)",
    border:  "var(--color-success-border)",
    text:    "var(--color-success-text)",
  },
  warning: {
    DEFAULT: "var(--color-warning)",
    light:   "var(--color-warning-light)",
    border:  "var(--color-warning-border)",
    text:    "var(--color-warning-text)",
  },
  error: {
    DEFAULT: "var(--color-error)",
    light:   "var(--color-error-light)",
    border:  "var(--color-error-border)",
    text:    "var(--color-error-text)",
  },
  info: {
    DEFAULT: "var(--color-info)",
    light:   "var(--color-info-light)",
    border:  "var(--color-info-border)",
    text:    "var(--color-info-text)",
  },
} as const

export default colors

export const primary = colors.primary
export const neutral = colors.neutral
export const navy    = colors.navy
export const success = colors.success
export const warning = colors.warning
export const error   = colors.error
export const info    = colors.info
