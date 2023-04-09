// TextContainer.tsx
import React from "react";

interface TextContainerProps {
  children: React.ReactNode;
}

export const TextContainer: React.FC<TextContainerProps> = ({ children }) => (
  <div
    style={{
      width: "70%",
      // WordWrap: "break-word",
      display: "inline-block",
      whiteSpace: "pre-wrap",
      // BackgroundColor : "yellow",
    }}
  >
    {children}
  </div>
);