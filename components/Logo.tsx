import React from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-8 text-current', style, src }) => {
  if (src) {
    return (
      <img 
        src={src} 
        alt="Rattan Taller Natural" 
        className={className} 
        style={{ objectFit: 'contain', ...style }}
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 460 142" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* R */}
      <path 
        d="M 15 90 L 15 10 M 15 10 L 42 10 C 56 10, 56 46, 42 46 L 15 46 M 34 46 L 55 90" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* A (Custom Logo with Teardrop Leaf/Weave) */}
      {/* Outer Triangle A-Frame */}
      <path 
        d="M 85 90 L 115 10 L 145 90" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Teardrop Inner Shape */}
      <path 
        d="M 115 38 C 103 48, 97 60, 97 70 C 97 80, 105 86, 115 86 C 125 86, 133 80, 133 70 C 133 60, 127 48, 115 38 Z" 
        stroke="currentColor" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Center Line of Leaf */}
      <path 
        d="M 115 38 L 115 86" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
      />
      {/* Concentric Woven Basket Curves */}
      <path 
        d="M 109 46 C 111 50, 119 50, 121 46" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 103 54 C 108 61, 122 61, 127 54" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 99 64 C 104 72, 126 72, 131 64" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M 97 74 C 102 81, 128 81, 133 74" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />

      {/* T */}
      <path 
        d="M 175 10 L 225 10 M 200 10 L 200 90" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* T */}
      <path 
        d="M 245 10 L 295 10 M 270 10 L 270 90" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* A (Normal) */}
      <path 
        d="M 315 90 L 345 10 L 375 90 M 326 60 L 364 60" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* N */}
      <path 
        d="M 395 90 L 395 10 L 445 90 L 445 10" 
        stroke="currentColor" 
        strokeWidth="4.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* TALLER NATURAL Subtitle */}
      <text 
        x="230" 
        y="126" 
        fill="currentColor" 
        fontFamily="'Inter', 'Space Grotesk', system-ui, sans-serif" 
        fontSize="21" 
        letterSpacing="0.45em" 
        textAnchor="middle" 
        fontWeight="500"
      >
        TALLER NATURAL
      </text>
    </svg>
  );
};

export default Logo;
