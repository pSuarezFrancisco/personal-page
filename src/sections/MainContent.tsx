import React, { useState, useEffect } from "react";
import Intro from "./Intro"; // New component for the first section
import AboutMe from "./AboutMe";
import ProfessionalExperience from "./ProfessionalExperience";
import ArtGallery from "./ArtGallery";
import Contact from "./Contact";
import TopMenu from "../components/TopMenu";
import ScrollToTopButton from "../components/ScrollToTopButton";

const sections = ["AboutMe", "ProfessionalExperience", "ArtGallery", "Contact"];

const MainContent: React.FC<{ onEnableScroll: () => void }> = ({
  onEnableScroll,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const handleEnableScroll = () => {
    setMenuVisible(true);
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {menuVisible && (
        <TopMenu sections={sections} scrollToSection={scrollToSection} />
      )}

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
