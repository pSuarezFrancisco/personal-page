import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface SectionTextProps {
  text: string;
  fadeIn?: boolean;
  slideIn?: "left" | "right" | "up" | "down";
  delay?: number;
  config?: { tension: number; friction: number };
  className?: string;
}

const SectionText: React.FC<SectionTextProps> = ({
  text,
  fadeIn = true,
  slideIn,
  delay = 0,
  config = { tension: 170, friction: 26 },
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Set up the observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation
          observer.disconnect(); // Remove observer after it's visible
        }
      },
      { threshold: 0.1 } // 50% visibility triggers the animation
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const props = useSpring({
    from: {
      opacity: fadeIn ? 0 : 1,
      transform:
        slideIn === "left"
          ? "translateX(-100px)"
          : slideIn === "right"
          ? "translateX(100px)"
          : slideIn === "up"
          ? "translateY(100px)"
          : slideIn === "down"
          ? "translateY(-100px)"
          : "translate(0px, 0px)",
    },
    to: isVisible
      ? {
          opacity: 1,
          transform: "translate(0px, 0px)",
        }
      : {
          opacity: fadeIn ? 0 : 1,
          transform:
            slideIn === "left"
              ? "translateX(-100px)"
              : slideIn === "right"
              ? "translateX(100px)"
              : slideIn === "up"
              ? "translateY(100px)"
              : slideIn === "down"
              ? "translateY(-100px)"
              : "translate(0px, 0px)",
        },
    delay,
    config,
  });

  return (
    <div ref={ref}>
      <animated.p
        style={props}
        className={`${className || ""} transition-all duration-500`}
      >
        {text}
      </animated.p>
    </div>
  );
};

export default SectionText;
