import React, { useState, useEffect, FC, ReactNode } from "react";

const FadeIn: FC<{ children: ReactNode }> = ({ children }) => {
  const [showing, setShowing] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowing(true), 300);
  }, []);
  return (
    <div
      className={`linear w-full transition-opacity duration-500 ${
        showing ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
