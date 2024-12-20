"use client";

import { INITIAL_BOX_SHADOW } from "@/constant/appConstant";
import { createContext, useState } from "react";

const defaultProviders = {
  boxShadow: INITIAL_BOX_SHADOW,
  updateBoxShadow: () => {},
  getBoxShadowString: () => {},
};

const ConstantContext = createContext(defaultProviders);

const ConstantProvider = ({ children }) => {
  const [shadow, setShadow] = useState(defaultProviders.boxShadow);

  const getBoxShadowString = (shadowObject) => {
    const { horizontalOffset, verticalOffset, blur, spread, color, inset } =
      shadowObject ?? shadow;
    return `${inset ? "inset" : ""} ${horizontalOffset}px ${verticalOffset}px ${blur}px ${spread}px ${color}`;
  };

  const updateBoxShadow = (value) => {
    setShadow((prev) => ({ ...prev, ...value }));
  };

  const value = {
    boxShadow: shadow,
    updateBoxShadow,
    getBoxShadowString,
  };

  return (
    <ConstantContext.Provider value={value}>
      {children}
    </ConstantContext.Provider>
  );
};

export { ConstantProvider, ConstantContext };
