import React from "react";
import { useMode } from "../context/ModeContext";

const ArtGallery: React.FC = () => {
  const { getColor } = useMode();

  return (
    <section
      id="ArtGallery"
      style={{ backgroundColor: getColor(3) }}
      className="min-h-screen flex flex-col items-center justify-center text-white p-10"
    >
      <h2 className="text-3xl font-bold mb-4 text-custom-stone">Art Gallery</h2>
      <p className="text-lg max-w-2xl text-center text-custom-stone">
        Art is a big part of my life. Here, I'll showcase some of my work and
        explore the intersection of code and creativity.
      </p>
    </section>
  );
};

export default ArtGallery;
