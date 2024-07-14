"use client"
import React, { createContext, useContext, useState } from 'react';

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const hide = () => setIsVisible(false);
  const show = () => setIsVisible(true);

  return (
    <VisibilityContext.Provider value={{ isVisible, hide, show }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const useVisibility = () => useContext(VisibilityContext);

