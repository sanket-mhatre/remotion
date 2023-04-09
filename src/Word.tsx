// Word.tsx
import React from 'react';
import { useSpring, animated } from 'react-spring';

interface WordProps {
  children: React.ReactNode;
  index: number;
  highlightedWordIndex: number;
}

export const Word: React.FC<WordProps> = ({ children, index, highlightedWordIndex }) => {
  const isHighlighted = index === highlightedWordIndex;
  const shouldBeAnimated = highlightedWordIndex >= index;

  const style = useSpring({
    display: "inline-block",
    opacity: shouldBeAnimated ? 1 : 0.5,
    fontSize: shouldBeAnimated ? 24 : 18,
    marginRight: '0.25em', // Add this line for margin
    config: {
      stiffness: 100,
      damping: 10,
    },
  });

  return (
    <animated.div style={style}>
      {children}
    </animated.div>
  );
};
