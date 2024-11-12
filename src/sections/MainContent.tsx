import React from 'react';
import ClickableName from '../components/ClickableName';
import AboutMe from './AboutMe';
import ProfessionalExperience from './ProfessionalExperience';
import ArtGallery from './ArtGallery';
import Contact from './Contact';

interface MainContentProps {
  onEnableScroll: () => void;
}

const MainContent: React.FC<MainContentProps> = React.memo(({ onEnableScroll }) => {
  return (
    <div>
      {/* First Screen */}
      <div className="flex items-center justify-center h-screen bg-yellow-100 text-white">
        <ClickableName onClick={onEnableScroll} />
      </div>
      {/* Scrollable Sections */}
      <AboutMe />
      <ProfessionalExperience />
      <ArtGallery />
      <Contact />
    </div>
  );
});

export default MainContent;
