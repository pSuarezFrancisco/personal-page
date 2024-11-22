import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import { useMode } from "../context/ModeContext";

const Contact: React.FC = () => {
  const { getColor } = useMode();
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const email = "psuarez.francisco@gmail.com";

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1500); // Tooltip disappears after 1.5 seconds
  };

  // Animation for the main title
  const [springProps, api] = useSpring(() => ({
    transform: "translateY(0px)",
    opacity: 0,
    config: { tension: 200, friction: 20 },
  }));

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) {
          api.start({ transform: "translateY(0px)", opacity: 1 });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [api]);

  return (
    <section
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: getColor(4),
      }}
      className="min-h-screen flex flex-col items-center justify-center p-10"
    >
      {/* Animated Title */}
      <animated.div
        style={springProps}
        ref={titleRef}
        className="text-5xl font-bold mb-8 text-custom-stone text-center"
      >
        Contact Me
      </animated.div>

      {/* Description */}
      <p className="text-lg text-center max-w-xl mb-6">
        Feel free to reach out—whether by message, email, or through the power
        of thought.
      </p>

      {/* Icons */}
      <div className="flex gap-8 mb-8">
        <a
          href="https://www.instagram.com/franciscogermi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#E4405F] hover:text-[#B3314B] transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/francisco-su%C3%A1rez-22aa0511b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#0077B5] hover:text-[#005582] transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/pSuarezFrancisco"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl text-[#171515] hover:text-gray-700 transition"
        >
          <FaGithub />
        </a>
        <button
          onClick={copyEmailToClipboard}
          className="relative text-3xl text-[#1543FA] hover:text-blue-700 transition"
        >
          <FaEnvelope />
          {tooltipVisible && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded">
              Email copied!
            </div>
          )}
        </button>
      </div>
    </section>
  );
};

export default Contact;
