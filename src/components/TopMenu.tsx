import React from "react";
import { useSpring, useTrail, animated } from "@react-spring/web";

interface TopMenuProps {
  sections: string[];
  scrollToSection: (sectionId: string) => void;
}

const TopMenu: React.FC<TopMenuProps> = ({ sections, scrollToSection }) => {
  // Bounce effect for the whole menu container
  const menuAnimation = useSpring({
    from: { opacity: 0, transform: "translateX(100%) scale(0.8)" },
    to: { opacity: 1, transform: "translateX(0%) scale(1)" },
    config: { tension: 180, friction: 12, mass: 1 }, // Elastic bounce effect
  });

  // Staggered bounce for each menu item
  const trail = useTrail(sections.length, {
    from: { opacity: 0, transform: "scale(0.9) translateY(0px)" },
    to: { opacity: 1, transform: "scale(1) translateY(0px)" },
    config: { tension: 220, friction: 14, mass: 0.5 }, // More elasticity for individual items
  });

  return (
    <animated.div
      style={menuAnimation}
      className="fixed top-4 right-4 flex space-x-4"
    >
      {trail.map((style, index) => (
        <animated.button
          key={sections[index]}
          onClick={() => scrollToSection(sections[index])}
          style={style}
          className="text-lg font-semibold text-gray-700 hover:text-gray-900"
        >
          {sections[index]}
        </animated.button>
      ))}
    </animated.div>
  );
};

export default TopMenu;
