'use client';

/**
 * Animated radial gauge component for maturity scores.
 * Renders an SVG ring that animates to the target percentage.
 */
export default function RadialGauge({ value, max = 100, color = '#63e2ff', size = 60, label }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="radial-gauge-wrap">
      <svg width={size} height={size} viewBox="0 0 60 60" className="radial-gauge">
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3.5"
        />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.8s ease-out',
            filter: `drop-shadow(0 0 5px ${color}88)`,
          }}
          transform="rotate(-90 30 30)"
        />
        <text x="30" y="26" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">
          {value}
        </text>
        <text x="30" y="40" textAnchor="middle" fill={color} fontSize="7" fontWeight="700" opacity="0.7">
          /{max}
        </text>
      </svg>
      {label && <span className="radial-gauge-label">{label}</span>}
    </div>
  );
}
