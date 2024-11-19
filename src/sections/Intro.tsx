import React, { useState } from "react";
import ClickableName from "../components/ClickableName";
import ClapAnimation from "../components/ClapAnimation";
import { useMode } from "../context/ModeContext";

interface IntroProps {
  onEnableScroll: () => void;
}

const Intro: React.FC<IntroProps> = ({ onEnableScroll }) => {
  const { getColor } = useMode();
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleNameClick = () => {
    setPlayAnimation(true); // Trigger the video animation
    setTimeout(() => {
      setPlayAnimation(false); // Reset after the animation ends
    }, 1000); // Adjust timeout to match video duration
    onEnableScroll(); // Enable scrolling after the first click
  };

  return (
    <section
      style={{ backgroundColor: getColor(0), position: "relative" }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      {/* Video Animation (Behind the Name) */}
      <div className="absolute inset-0 z-0">
        <ClapAnimation play={playAnimation} />
      </div>

      {/* Clickable Name (Above the Video) */}
      <div className="z-10">
        <ClickableName onEnableScroll={handleNameClick} />
      </div>
    </section>
  );
};

export default Intro;
