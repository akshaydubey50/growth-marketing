import React, { useContext, createContext, useState, useEffect } from "react";

export const VisibleItemData = createContext();

export function VisibleItemContextProvider({ children }) {
  const [visibleItem, setVisibleItem] = useState(12);
  const [showLoginForm, setShowLoginForm] = useState(false);
  return (
    <>
      <VisibleItemData.Provider
        value={{ visibleItem, setVisibleItem, showLoginForm, setShowLoginForm }}
      >
        {children}
      </VisibleItemData.Provider>
    </>
  );
}

export const useVisibleItemContextData = () => {
  return useContext(VisibleItemData);
};
