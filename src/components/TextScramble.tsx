import React, { useState, useEffect } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  onHover?: boolean;
}

const GLYPHS = '01#%&*+=-~_/<>[{}]';

export const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  className = '', 
  trigger = false,
  onHover = true 
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
      });

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 28);
  };

  useEffect(() => {
    if (trigger) {
      scramble();
    }
  }, [trigger]);

  return (
    <span
      onMouseEnter={() => {
        if (onHover) scramble();
      }}
      className={`inline-block cursor-default transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
};
