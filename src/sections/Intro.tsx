import React from "react";
import ClickableName from "../components/ClickableName";
import { useMode } from "../context/ModeContext";

interface IntroProps {
  onEnableScroll: () => void;
}

const Intro: React.FC<IntroProps> = ({ onEnableScroll }) => {
  const { getColor } = useMode();

  return (
    <section
      style={{ backgroundColor: getColor(0) }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      <ClickableName onEnableScroll={onEnableScroll} />
    </section>
  );
};

export default Intro;
