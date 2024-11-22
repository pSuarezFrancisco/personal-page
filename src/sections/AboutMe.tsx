import React from "react";
import SectionText from "../components/SectionText";
import { useSpring, animated } from "@react-spring/web";
import { useMode } from "../context/ModeContext";
import { useInView } from "react-intersection-observer";

const AboutMe: React.FC = () => {
  const { getColor } = useMode();

  const content = [
    {
      title: "The Beginning",
      paragraph:
        "From getting my first computer at the age of four to designing elegant interfaces today, my journey into development has been fueled by curiosity and creativity. Over the years, I’ve had the privilege of working across industries—from agriculture and government services to insurance systems, ERPs, and mobile apps for startups. I’ve also developed proof-of-concepts and integrated platforms like Salesforce, Power Apps, Genesys, and Slack.",
    },
    {
      title: "The Developer-Artist Hybrid",
      paragraph:
        "As an artist, I’ve spent years perfecting the balance between form, composition, and color. This artistic foundation allows me to approach coding and UI/UX design with a unique perspective, crafting solutions that are not only functional but visually engaging. Whether it’s designing custom components or editing animations for my personal projects, I strive to create experiences that resonate with users.",
    },
    {
      title: "A Passion for Creativity",
      paragraph:
        "My greatest satisfaction comes from creating experiences that tell a story or solve a problem in a meaningful way. Whether I’m designing a website, drawing with ink and pencil, or boxing (yes, even boxing has its artistic side!), I’m always searching for the right balance between technical precision and personal expression.",
    },
    {
      title: "Looking Ahead",
      paragraph:
        "My goals are shifting towards mastering design tools like Figma, After Effects, and Photoshop, pushing the boundaries of what’s possible in UI/UX and animation. I’m particularly excited by projects that challenge me to think outside the box, where creative solutions take precedence over conventional approaches.",
    },
    {
      title: "My Philosophy",
      paragraph:
        "Great design starts with intuition but flourishes with collaboration. I believe in listening to opinions, setting clear expectations, and letting creativity guide the way.",
    },
  ];

  const rows = [
    content.slice(0, 2), // First 2 items
    content.slice(2, 4), // Next 2 items
    content.slice(4), // Last item
  ];

  // Main title animation
  const [ref, inView] = useInView({ triggerOnce: true });
  const titleAnimation = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: inView ? 1 : 0.8, opacity: inView ? 1 : 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: getColor(1),
      }}
      className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100"
    >
      {/* General Title */}
      <animated.h1
        ref={ref} // Attach in-view ref
        style={{
          transform: titleAnimation.scale.to((s) => `scale(${s})`),
          opacity: titleAnimation.opacity,
        }}
        className="text-5xl font-extrabold mb-12 text-custom-stone text-center"
      >
        About Me
      </animated.h1>

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`mb-12 ${
            rowIndex === rows.length - 1
              ? "flex flex-col items-center justify-center" // Center the last row
              : "grid grid-cols-1 md:grid-cols-2 gap-12"
          }`}
        >
          {row.map(({ title, paragraph }, idx) => (
            <div key={idx} className="mb-8 text-center max-w-lg">
              <h2 className="text-4xl font-bold mb-6 text-custom-stone">
                {title}
              </h2>
              <SectionText
                text={paragraph}
                fadeIn
                slideIn={
                  rowIndex === rows.length - 1
                    ? "up"
                    : idx % 2 === 0
                    ? "left"
                    : "right"
                } // Slide in from bottom for the last row
                delay={(rowIndex * 2 + idx) * 300}
                config={{ tension: 250, friction: 18 }}
                className="text-lg md:text-xl leading-relaxed"
              />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default AboutMe;
