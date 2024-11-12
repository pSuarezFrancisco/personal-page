import React from "react";
import { useMode } from "../context/ModeContext";

const Contact: React.FC = () => {
  const { getColor } = useMode();

  return (
    <section
      id="Contact"
      style={{ backgroundColor: getColor(4) }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      <h2 className="text-3xl font-bold mb-4 text-custom-stone">Contact</h2>
      <p className="text-lg max-w-2xl text-center text-custom-stone">
        Feel free to reach out for collaboration or just to connect!
      </p>
    </section>
  );
};

export default Contact;
