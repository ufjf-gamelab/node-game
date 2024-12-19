import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIStateContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  asideDetailsOpen: boolean;
  setAsideDetailsOpen: (isOpen: boolean) => void;
  sidebarWidth: number;
  asideDetailsWidth: number;
}

const LayoutContent = createContext<UIStateContextProps | undefined>(undefined);

interface UIStateProviderProps {
  children: ReactNode;
}

const sidebarWidth = 192;
const asideDetailsWidth = 240;

export const LayoutProvider: React.ComponentType<UIStateProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [asideDetailsOpen, setAsideDetailsOpen] = useState<boolean>(false);

  return (
    <LayoutContent.Provider value={{ sidebarWidth, asideDetailsWidth, sidebarOpen, setSidebarOpen, asideDetailsOpen, setAsideDetailsOpen }}>
      {children}
    </LayoutContent.Provider>
  );
};

// Custom hook to use the UI state context
export const useLayoutContext = (): UIStateContextProps => {
  const context = useContext(LayoutContent);
  if (context === undefined) {
    throw new Error("useUIState must be used within a LayoutProvider");
  }
  return context;
};
