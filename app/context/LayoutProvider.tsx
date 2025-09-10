"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type SidebarType = "left" | "right" | null;

interface LayoutContextValues {
  openSidebar: SidebarType;
  toggleSidebar: (sidebar: SidebarType) => void;
  closeSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextValues>({
  openSidebar: null,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<SidebarType>(null);

  const toggleSidebar = (sidebar: SidebarType) => {
    setOpenSidebar((prev) => (prev === sidebar ? null : sidebar));
  };

  const closeSidebar = () => {
    setOpenSidebar(null);
  };

  return (
    <LayoutContext.Provider value={{ openSidebar, toggleSidebar, closeSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
