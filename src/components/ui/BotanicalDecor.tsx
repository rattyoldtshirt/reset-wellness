import React from 'react';

export function LeafEmblem({ className = 'w-6 h-6', color = '#536451' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20.24 12.24C21.3659 7.9255 18.0745 4.63406 13.76 5.76C8.84 7.05 4.5 12.5 3 21C11.5 19.5 16.95 15.16 20.24 12.24Z"
        fill={color}
        fillOpacity="0.85"
      />
      <path
        d="M3 21C8 16 12.5 13 20.24 12.24"
        stroke="#F5EBD8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function OliveSprig({ className = 'w-16 h-16', color = '#A9B7A0' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 52C22 42 36 28 52 12"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Leaf 1 */}
      <path
        d="M24 38C20 32 23 26 29 27C31 32 28 37 24 38Z"
        fill={color}
        fillOpacity="0.65"
      />
      {/* Leaf 2 */}
      <path
        d="M36 26C32 20 35 14 41 15C43 20 40 25 36 26Z"
        fill={color}
        fillOpacity="0.75"
      />
      {/* Leaf 3 */}
      <path
        d="M20 44C26 45 29 40 27 34C22 35 19 40 20 44Z"
        fill={color}
        fillOpacity="0.5"
      />
      {/* Leaf 4 */}
      <path
        d="M32 32C38 33 41 28 39 22C34 23 31 28 32 32Z"
        fill={color}
        fillOpacity="0.6"
      />
      {/* Top tip */}
      <path
        d="M48 16C51 10 55 10 54 14C53 17 49 19 48 16Z"
        fill={color}
        fillOpacity="0.85"
      />
    </svg>
  );
}

export function ZenRipples({ className = 'w-24 h-24', color = '#A9B7A0' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="12" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="26" stroke={color} strokeWidth="1.5" strokeOpacity="0.25" />
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1.5" strokeOpacity="0.15" />
    </svg>
  );
}

export function GentleSun({ className = 'w-12 h-12', color = '#E8C4CA' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="9" fill={color} fillOpacity="0.5" />
      <path d="M24 7V10M24 38V41M7 24H10M38 24H41M12 12L14 14M34 34L36 36M12 36L14 34M34 12L36 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

export function GentleSparkle({ className = 'w-5 h-5', color = '#C9C2DD' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M12 2L14.39 8.26L21 9.27L16.14 13.97L17.48 20.73L12 17.27L6.52 20.73L7.86 13.97L3 9.27L9.61 8.26L12 2Z"
        fill={color}
        fillOpacity="0.8"
      />
    </svg>
  );
}
