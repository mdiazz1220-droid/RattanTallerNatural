import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  lightBg?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-8 text-current', style, src, lightBg = false }) => {
  const [useFallback, setUseFallback] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  useEffect(() => {
    // If a custom src is specified, try to render it, otherwise use the beautiful SVG logo directly
    if (src) {
      setCurrentSrc(src);
      setUseFallback(false);
    } else {
      setUseFallback(true);
    }
  }, [src]);

  const handleImgError = () => {
    // Fallback chain for various possible file name variations or encodings
    if (currentSrc === '/sin-título-1.PNG') {
      setCurrentSrc('/sin-título-1.png');
    } else if (currentSrc === '/sin-título-1.png') {
      setCurrentSrc('/sin-titulo-1.PNG');
    } else if (currentSrc === '/sin-titulo-1.PNG') {
      setCurrentSrc('/sin-titulo-1.png');
    } else if (currentSrc === '/sin-titulo-1.png') {
      setCurrentSrc('/logo.png');
    } else {
      setUseFallback(true);
    }
  };

  if (!useFallback && currentSrc) {
    // If we're on a light background: use multiply blend mode to hide white background and keep green text
    // If we're on a dark background: invert colors and use screen blend mode to get transparent white text
    const filterStyle = lightBg 
      ? {
          mixBlendMode: 'multiply' as const,
        }
      : {
          filter: 'invert(1) grayscale(1) brightness(3) contrast(100)',
          mixBlendMode: 'screen' as const,
        };

    return (
      <img 
        src={currentSrc} 
        alt="Rattan Taller Natural" 
        className={`${className} object-contain`}
        onError={handleImgError}
        style={{
          ...filterStyle,
          ...style
        }}
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 434 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* R */}
      <path 
        d="M 15 95 L 15 15 M 15 15 L 42 15 C 55 15, 55 55, 42 55 L 15 55 M 32 55 C 44 55, 50 75, 59 95" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* A (Custom Logo with Teardrop Leaf/Weave) */}
      {/* Outer Triangle A-Frame */}
      <path 
        d="M 85 95 L 112 15 L 139 95" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Teardrop Inner Shape */}
      <path 
        d="M 112 45 C 99 56, 96 72, 112 92 C 128 72, 125 56, 112 45 Z" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Center Line of Leaf */}
      <path 
        d="M 112 45 L 112 92" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
      />
      {/* Concentric Woven Basket Curves */}
      <path 
        d="M 107 53 Q 112 56, 117 53" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <path 
        d="M 102 63 Q 112 68, 122 63" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <path 
        d="M 99 74 Q 112 81, 125 74" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <path 
        d="M 101 84 Q 112 90, 123 84" 
        stroke="currentColor" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />

      {/* T */}
      <path 
        d="M 155 15 L 209 15 M 182 15 L 182 95" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* T */}
      <path 
        d="M 225 15 L 279 15 M 252 15 L 252 95" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* A (Normal) */}
      <path 
        d="M 295 95 L 322 15 L 349 95 M 306 67 L 338 67" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* N */}
      <path 
        d="M 365 95 L 365 15 L 419 95 L 419 15" 
        stroke="currentColor" 
        strokeWidth="3.2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* TALLER NATURAL Subtitle */}
      <text 
        x="217" 
        y="126" 
        fill="currentColor" 
        fontFamily="'Inter', 'Space Grotesk', system-ui, sans-serif" 
        fontSize="17.5" 
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
