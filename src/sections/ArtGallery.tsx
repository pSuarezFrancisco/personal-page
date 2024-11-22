import React, { useEffect, useRef, useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useMode } from "../context/ModeContext";

const ArtGallery: React.FC = () => {
  const { getColor } = useMode();
  const title = "Art Gallery";

  // State to control when the animation starts
  const [isVisible, setIsVisible] = useState(false);

  // Ref for the title container
  const titleRef = useRef<HTMLDivElement>(null);

  // Wave animation for the title
  const [springs, api] = useSprings(title.length, (index) => ({
    from: { y: 0 },
    to: { y: 0 },
    config: { mass: 1, tension: 120, friction: 14 },
  }));

  useEffect(() => {
    // Intersection Observer setup
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when visible
          observer.disconnect(); // Stop observing after first animation
        }
      },
      { threshold: 0.1 } // 10% visibility triggers the animation
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect(); // Cleanup
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Trigger wave effect
      api.start((index) => ({
        to: async (next) => {
          await next({ y: -20 }); // Letter rises
          await next({ y: 0 }); // Letter settles back
        },
        delay: index * 100, // Staggered effect for the wave
      }));
    }
  }, [isVisible, api]);

  return (
    <section
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: getColor(3),
      }}
      className="min-h-screen flex flex-col items-center justify-center p-10"
    >
      {/* Animated Title */}
      <div ref={titleRef} className="mb-12 text-center">
        {title.split("").map((letter, index) => (
          <animated.span
            key={index}
            style={{
              display: "inline-block",
              marginRight: letter === " " ? "8px" : "0", // Add space between words
              transform: springs[index].y.to((y) => `translateY(${y}px)`), // Smooth wave effect
            }}
            className="text-5xl font-extrabold text-custom-stone"
          >
            {letter}
          </animated.span>
        ))}
      </div>

      {/* Placeholder Message */}
      <div className="text-center">
        <p className="text-lg md:text-xl text-gray-800 max-w-lg mx-auto">
          This section is under construction because Tanka insisted we play
          fetch instead. Priorities, right?
        </p>
      </div>
    </section>
  );
};

export default ArtGallery;
