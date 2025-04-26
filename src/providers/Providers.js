"use client";
import React from "react";
import { VisibleItemContextProvider } from "@/lib/visibleItemContext";
import { Provider } from "react-redux";
import appStore from "@/redux/store";

export default function Providers({ children }) {
  return (
    <VisibleItemContextProvider>
      <Provider store={appStore}>{children}</Provider>
    </VisibleItemContextProvider>
  );
}
