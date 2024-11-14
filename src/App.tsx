import React, { useState, useEffect, useCallback } from "react";
import Loading from "./components/Loading";
import { ModeProvider } from "./context/ModeContext";
import MainContent from "./sections/MainContent";
import PeaksAnimation from "./components/PeaksAnimation"; // Import the animation component
import SquareSnakeAnimation from "./components/SquareSnakeAnimation"; // Import the animation component

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulated loading delay
    return () => clearTimeout(timer);
  }, []);

  // Lock/unlock scroll based on isScrollEnabled
  useEffect(() => {
    document.body.style.overflow = isScrollEnabled ? "auto" : "hidden";
  }, [isScrollEnabled]);

  const enableScroll = useCallback(() => setIsScrollEnabled(true), []);

  return isLoading ? (
    <Loading />
  ) : (
    <ModeProvider>
      <PeaksAnimation />
      <SquareSnakeAnimation />
      <MainContent onEnableScroll={enableScroll} />
    </ModeProvider>
  );
};

export default App;
