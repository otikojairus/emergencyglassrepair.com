export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`brand-logo${compact ? " brand-logo-compact" : ""}`}
      viewBox="0 0 260 42"
      role="img"
      aria-label="Emergency Glass Repair Canada"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="6" width="28" height="28" fill="none" stroke="#e85d04" strokeWidth="3" />
      <path d="M8 30 L16 10 L24 30 Z" fill="#1f6b68" opacity="0.9" />
      <path d="M12 30 L16 18 L20 30 Z" fill="#f3efe6" />
      <text x="40" y="19" fill="currentColor" fontFamily="var(--font-display), Georgia, serif" fontSize="15" fontWeight="600">
        Emergency Glass
      </text>
      <text x="40" y="33" fill="currentColor" opacity="0.55" fontFamily="system-ui, sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="0.16em">
        REPAIR · CANADA
      </text>
    </svg>
  );
}
