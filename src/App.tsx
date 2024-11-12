import React, { useState, useEffect, useCallback } from 'react';
import Loading from './components/Loading';
import MainContent from './sections/MainContent';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500); // Simulated loading delay
    return () => clearTimeout(timer);
  }, []);

  // Lock/unlock scroll based on isScrollEnabled
  useEffect(() => {
    document.body.style.overflow = isScrollEnabled ? 'auto' : 'hidden';
  }, [isScrollEnabled]);

  const enableScroll = useCallback(() => setIsScrollEnabled(true), []);

  return (
    isLoading ? <Loading /> : <MainContent onEnableScroll={enableScroll} />
  );
};

export default App;
