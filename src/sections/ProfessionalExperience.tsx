import React from "react";
import { useMode } from "../context/ModeContext";

const ProfessionalExperience: React.FC = () => {
  const { getColor } = useMode();
  return (
    <section
      id="ProfessionalExperience"
      style={{ backgroundColor: getColor(2) }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      <h2 className="text-3xl font-bold mb-4 text-custom-stone">
        Professional Experience
      </h2>
      <p className="text-lg max-w-2xl text-center text-custom-stone">
        I have worked in various roles as a developer, from React Native
        projects for startups to creating educational resources and integrating
        complex systems for large companies.
      </p>
    </section>
  );
};
export default ProfessionalExperience;
