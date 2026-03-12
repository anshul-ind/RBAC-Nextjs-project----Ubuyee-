// ─── Ubuyee Design Tokens — Single Entry Point ───────────────────────────────
//
// IMPORT:
//   import { primary, neutral, radius, space, textStyles } from "@/theme"
//
// USAGE EXAMPLES:
//
//   // Colors
//   color: primary.DEFAULT          → #f97316
//   background: primary.light       → #fff7ed
//   border: `1px solid ${primary.border}`
//   color: neutral[900]             → #111827
//   color: neutral[500]             → #6b7280
//   background: neutral[0]          → #ffffff
//
//   // Radius
//   borderRadius: radius.xl         → 12px
//   borderRadius: radius.full       → 9999px
//
//   // Spacing
//   padding: space.cardPadding      → 1.5rem
//   height: space.navHeight         → 4rem
//   gap: space.cardGap              → 1.25rem
//
//   // Typography
//   style={{ ...textStyles.pageTitle }}
//   style={{ ...textStyles.navLink }}
//   fontSize: typography.fontSize["2xl"]
//   fontWeight: typography.fontWeight.bold

import colors, {
  primary, neutral, navy,
  success, warning, error, info,
} from "./colors"

import radius from "./radius"
import spacing, { space } from "./spacing"
import typography, { textStyles } from "./typography"

const theme = {
  colors,
  radius,
  spacing,
  typography,
} as const

export default theme

export {
  colors,
  primary, neutral, navy,
  success, warning, error, info,
  radius,
  spacing, space,
  typography, textStyles,
}
