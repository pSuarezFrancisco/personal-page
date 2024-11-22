import React from "react";
import SectionText from "../components/SectionText";
import { useSpring, animated } from "@react-spring/web";
import { useMode } from "../context/ModeContext";
import { useInView } from "react-intersection-observer";

const ProfessionalExperience: React.FC = () => {
  const { getColor } = useMode();

  const roles = [
    {
      title: "Quark.ai (React.js Developer)",
      dates: "Remote (2021-02 to Present)",
      description:
        "Developed internal apps to enhance user experience with our core product. Created demos, proofs-of-concept, and proofs-of-value showcasing technology. Redesigned UI branding for consistency and stronger identity. Integrated the product with Salesforce, Power Apps, Genesys, and Slack.",
    },
    {
      title: "Codimbo (React Native Developer)",
      dates: "Remote (2019-05 to 2021-02)",
      description:
        "Built mobile and web applications for startups and small businesses. Focused on aligning UI/UX with client needs for functional, user-friendly solutions. Contributed insights on tech advancements and best practices.",
    },
    {
      title: "Incoding (Partner - Software Developer and Systems Analyst)",
      dates: "Rosario (2015-10 to 2022-03)",
      description:
        "Developed apps for small businesses using .NET Framework, SQL, and Backbone/Marionette. Transitioned to React for front-end development. Handled project analysis, budgets, and client demos.",
    },
    {
      title: "Neoris (Software Developer)",
      dates: "Rosario (2018-03 to 2019-04)",
      description:
        "Created educational resources for a React.js course for international partners. Maintained and improved insurance systems using .NET Framework and SQL. Contributed to Neoris Global Campus content.",
    },
    {
      title: "A&J Sistemas (Software Developer and Systems Analyst)",
      dates: "Rosario (2010-10 to 2018-03)",
      description:
        "Led development of modules for agriculture and government systems. Upgraded older systems to scalable, efficient frameworks. Managed client presentations, project budgets, and requirements.",
    },
  ];

  // Define the section title
  const title = "Professional Experience";

  // In-view detection for triggering the animation
  const [ref, inView] = useInView({ triggerOnce: true });

  // Animation for the whole title
  const titleAnimation = useSpring({
    from: { rotate: 0 },
    to: { rotate: inView ? 360 : 0 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: getColor(2),
      }}
      className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-100"
    >
      {/* General Title with One-Time Rotation Animation */}
      <animated.h1
        ref={ref} // Ref for in-view detection
        style={{
          transform: titleAnimation.rotate.to((r) => `rotate(${r}deg)`),
          transformOrigin: "center",
        }}
        className="text-5xl font-extrabold mb-12 text-custom-stone text-center"
      >
        {title}
      </animated.h1>

      {roles.map(({ title, dates, description }, idx) => (
        <div key={idx} className="mb-12 text-center max-w-xl">
          <h2
            className="text-3xl font-bold mb-4 text-custom-stone"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <h3 className="text-lg italic mb-2 text-gray-600">{dates}</h3>
          <SectionText
            text={description}
            fadeIn
            slideIn={idx % 2 === 0 ? "left" : "right"}
            delay={idx * 300}
            config={{ tension: 250, friction: 18 }}
          />
          {idx !== roles.length - 1 && (
            <hr className="w-1/2 mx-auto border-t-2 border-gray-800 my-8" />
          )}
        </div>
      ))}

      <div className="text-center mt-6">
        <a
          href="https://drive.google.com/file/d/1gDh3cdbVkW0j4EPtSz-cPBhlLTE8eE7C/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-[#1543FA] hover:underline"
        >
          View My CV
        </a>
        <br />
        <a
          href="https://drive.google.com/uc?export=download&id=1gDh3cdbVkW0j4EPtSz-cPBhlLTE8eE7C"
          className="inline-block bg-[#1543FA] text-white py-2 px-4 rounded hover:bg-blue-700 transition mt-4"
        >
          Download My CV
        </a>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
