import React from "react";
import { useSpring, animated, useSprings } from "@react-spring/web";
import { useClickableName } from "../hooks/useClickableName"; // Import custom hook

interface ClickableNameProps {
  onEnableScroll: () => void;
}

const ClickableName: React.FC<ClickableNameProps> = ({ onEnableScroll }) => {
  const { isClicked, handleClick, message, messageFade } =
    useClickableName(onEnableScroll);
  const name = "Francisco Suarez";

  // Breathing animation (Stage 1)
  const beatingAnimation = useSpring({
    to: async (next) => {
      while (!isClicked) {
        await next({
          transform: "scale(1.2)",
          config: { tension: 800, friction: 14 },
        });
        await next({
          transform: "scale(0.90)",
          config: { tension: 500, friction: 14 },
        });
      }
    },
    from: { transform: "scale(1)" },
    reset: !isClicked,
  });

  // Explosion animation (Stage 2)
  const [springs, api] = useSprings(name.length, (index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    transform: "scale(1)",
    config: { mass: 1, tension: 120, friction: 10 },
  }));

  // Trigger explosion from click position
  const triggerExplosion = (e: React.MouseEvent) => {
    handleClick();

    if (!isClicked) {
      // Get click position relative to the container
      api.start((index) => {
        // Calculate random angle and distance for each letter from the click point
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = 100 + Math.random() * 200; // Random distance for radial spread
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotate = (Math.random() - 0.5) * 720; // Random rotation between -360 and 360

        return {
          x,
          y,
          rotate,
          transform: "scale(1.2)",
          config: { mass: 1, tension: 120, friction: 15 },
        };
      });
    } else {
      // Reset letters to original position
      api.start(() => ({
        x: 0,
        y: 0,
        rotate: 0,
        transform: "scale(1)",
        config: { tension: 200, friction: 20 },
      }));
    }
  };

  return (
    <div className="text-center">
      <div className="relative" onClick={triggerExplosion}>
        {springs.map((style, index) => (
          <animated.span
            key={index}
            style={{
              ...style,
              transform: beatingAnimation.transform.to(
                (scale) => `${scale} ${style.transform.get()}`
              ),
              display: "inline-block",
              marginRight: index === name.length - 1 ? 0 : 2,
            }}
            className="text-4xl font-bold cursor-pointer text-custom-stone"
          >
            {name[index]}
          </animated.span>
        ))}
      </div>
      {message && (
        <animated.div
          style={message === "Back to default." ? messageFade : { opacity: 1 }}
          className="absolute left-1/2 transform -translate-x-1/2 mt-4 text-lg text-gray-600"
        >
          {message}
        </animated.div>
      )}
    </div>
  );
};

export default ClickableName;
