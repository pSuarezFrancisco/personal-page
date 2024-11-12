import { useState, useCallback } from 'react';
import { useMode } from '../context/ModeContext';
import { useSpring } from '@react-spring/web';

export const useClickableName = (onEnableScroll: () => void) => {
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState(""); // Start with an empty message
  const [hasActivated, setHasActivated] = useState(false); // Tracks if Germi mode was activated once
  const { toggleMode } = useMode();

  // Fade-out effect only for "Back to default."
  const messageFade = useSpring({
    opacity: message === "Back to default." ? 0 : 1,
    config: { duration: 1500 },
    onRest: () => {
      // Clear message after fade-out
      if (message === "Back to default.") setMessage("");
    },
  });

  const handleClick = useCallback(() => {
    setIsClicked((prev) => !prev);
    toggleMode();

    if (!hasActivated) {
      // First click: Activate Germi mode and display message
      setMessage("Germi mode activated.");
      setHasActivated(true);
      onEnableScroll(); // Enable scroll on first click
    } else if (isClicked) {
      // If resetting to default, show "Back to default."
      setMessage("Back to default.");
    } else {
      // Re-activating Germi mode
      setMessage("Germi mode activated.");
    }
  }, [isClicked, toggleMode, hasActivated, onEnableScroll]);

  return {
    isClicked,
    handleClick,
    message,
    messageFade,
  };
};
