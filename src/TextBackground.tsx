import React from "react";

interface TextBackgroundProps {
  children: React.ReactNode;
  translateY: number;
}

export const TextBackground: React.FC<TextBackgroundProps> = ({ children, translateY }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 32,
      transform: `translateY(${translateY}px)`,
    }}
  >
    {children}
  </div>
);