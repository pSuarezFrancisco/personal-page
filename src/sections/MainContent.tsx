import React, { useState, useEffect } from "react";
import Intro from "./Intro"; // New component for the first section
import AboutMe from "./AboutMe";
import ProfessionalExperience from "./ProfessionalExperience";
import ArtGallery from "./ArtGallery";
import Contact from "./Contact";
import ScrollToTopButton from "../components/ScrollToTopButton";

const MainContent: React.FC<{ onEnableScroll: () => void }> = ({
  onEnableScroll,
}) => {
  const [showTopButton, setShowTopButton] = useState(false);

  const handleEnableScroll = () => {
    onEnableScroll();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      setShowTopButton(scrollPercentage > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Intro onEnableScroll={handleEnableScroll} />
      <AboutMe />
      <ProfessionalExperience />
      <ArtGallery />
      <Contact />
      <ScrollToTopButton onClick={scrollToTop} visible={showTopButton} />
    </div>
  );
};

export default MainContent;
