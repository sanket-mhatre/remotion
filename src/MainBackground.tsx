// MainBackground.tsx
import React from "react";

interface MainBackgroundProps {
  children: React.ReactNode;
}

export const MainBackground: React.FC<MainBackgroundProps> = ({ children }) => (
  <div
    style={{
      flex: 1,
      backgroundColor: "black",
      color: "white",
      marginLeft: 80,
      marginRight: 80,
    }}
  >
    {children}
  </div>
);
