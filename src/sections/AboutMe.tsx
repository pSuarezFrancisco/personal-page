import React from "react";
import { useMode } from "../context/ModeContext";

const AboutMe: React.FC = () => {
  const { getColor } = useMode();

  return (
    <section
      id="AboutMe"
      style={{ backgroundColor: getColor(1) }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      <h2 className="text-3xl font-bold mb-4 text-custom-stone">About Me</h2>
      <p className="text-lg max-w-2xl text-center text-custom-stone">
        Hi, I'm Francisco! I've been coding for over 14 years and have a strong
        passion for both development and art. My background in art enhances my
        approach to UI/UX design, allowing me to pay close attention to details
        and composition.
      </p>
    </section>
  );
};

export default AboutMe;
