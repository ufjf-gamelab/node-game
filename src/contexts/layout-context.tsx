import React, { createContext, useContext, useState, ReactNode } from "react";

interface UIStateContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  asidePropertiesOpen: boolean;
  setAsidePropertiesOpen: (isOpen: boolean) => void;
  simulationOpen: boolean;
  setSimulationOpen: (isOpen: boolean) => void;
  sidebarWidth: number;
  asidePropertiesWidth: number;
}

const LayoutContent = createContext<UIStateContextProps | undefined>(undefined);

interface UIStateProviderProps {
  children: ReactNode;
}

const sidebarWidth = 192;
const asidePropertiesWidth = 240;

export const LayoutProvider: React.ComponentType<UIStateProviderProps> = ({ children }) => {
  const [simulationOpen, setSimulationOpen] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [asidePropertiesOpen, setAsidePropertiesOpen] = useState<boolean>(false);

  return (
    <LayoutContent.Provider
      value={{
        sidebarWidth,
        asidePropertiesWidth,
        sidebarOpen,
        setSidebarOpen,
        asidePropertiesOpen,
        setAsidePropertiesOpen,
        simulationOpen,
        setSimulationOpen,
      }}>
      {children}
    </LayoutContent.Provider>
  );
};

export const useLayoutContext = (): UIStateContextProps => {
  const context = useContext(LayoutContent);
  if (context === undefined) {
    throw new Error("useUIState must be used within a LayoutProvider");
  }
  return context;
};
