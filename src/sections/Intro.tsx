import React, { useState } from "react";
import ClickableName from "../components/ClickableName";
import ClapAnimation from "../components/ClapAnimation";
import { useSpring } from "@react-spring/web";
import { useMode } from "../context/ModeContext";

interface IntroProps {
  onEnableScroll: () => void;
}

const Intro: React.FC<IntroProps> = ({ onEnableScroll }) => {
  const { getColor } = useMode();
  const [playAnimation, setPlayAnimation] = useState(false);

  // Spring animation for the "slam down" scroll effect
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [springProps, api] = useSpring(() => ({
    scrollY: 0,
    config: { tension: 400, friction: 30 },
    onChange: ({ value }) => {
      window.scrollTo(0, value.scrollY); // Update the scroll position
    },
  }));

  const handleNameClick = () => {
    setPlayAnimation(true); // Trigger the video animation

    setTimeout(() => {
      setPlayAnimation(false); // Reset after the animation ends

      // Start the "slam down" animation
      api.start({
        scrollY: 400, // Adjust this value for the desired scroll distance
        config: { tension: 400, friction: 30, mass: 2 },
        onRest: () => {
          // Bounce effect
          api.start({
            scrollY: 350,
            config: { tension: 200, friction: 15 },
          });
        },
      });

      onEnableScroll(); // Enable scrolling after the animation
    }, 1000); // Adjust timeout to match video duration
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
