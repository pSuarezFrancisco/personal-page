import React, { createContext, useContext, useState, ReactNode } from "react";

// Colors for each section in two modes
const colors = {
  default: ["#fef9c3", "#fef08a", "#fde047", "#facc15", "#f59e0b"],
  germi: ["#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981"],
};

type ModeContextType = {
  mode: "default" | "germi";
  toggleMode: () => void;
  getColor: (index: number) => string;
};

interface ModeProviderProps {
  children: ReactNode;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"default" | "germi">("default");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "default" ? "germi" : "default"));
  };

  const getColor = (index: number) => {
    return colors[mode][index % colors[mode].length];
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, getColor }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
