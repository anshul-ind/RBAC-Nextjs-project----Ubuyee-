"use client"

interface UbuyeeLogoProps {
  size?: "sm" | "md" | "lg"
  onClick?: () => void
}

export default function UbuyeeLogo({
  size = "md",
  onClick,
}: UbuyeeLogoProps) {
  const scale = size === "sm" ? 0.55
              : size === "lg" ? 1.1
              : 0.78

  const w = Math.round(220 * scale)
  const h = Math.round(80 * scale)

  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox="0 0 220 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Orange rounded square — cart basket */}
        <rect
          x="4" y="18"
          width="44" height="44"
          rx="8"
          fill="#f97316"
        />

        {/* White U inside orange square */}
        <path
          d="M16 26 L16 46 Q16 54 24 54 L32 54 Q40 54 40 46 L40 26"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Cart handle — navy diagonal line */}
        <line
          x1="44" y1="22"
          x2="62" y2="6"
          stroke="#1e293b"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Left wheel dot */}
        <circle cx="16" cy="70" r="4" fill="#1e293b" />

        {/* Right wheel dot */}
        <circle cx="36" cy="70" r="4" fill="#1e293b" />

        {/* "buy" in dark navy */}
        <text
          x="58" y="58"
          fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
          fontWeight="800"
          fontSize="46"
          fill="#1e293b"
          letterSpacing="-1"
        >
          buyee
        </text>

        {/* "ee" in orange */}
        <text
          x="152" y="58"
          fontFamily="'Inter','Helvetica Neue',Arial,sans-serif"
          fontWeight="800"
          fontSize="46"
          fill="#f97316"
          letterSpacing="-1"
        >
          ee
        </text>
      </svg>
    </div>
  )
}
