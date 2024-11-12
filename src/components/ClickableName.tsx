import React, { useState, useCallback } from 'react';
import { useSpring, animated, useSprings } from '@react-spring/web';

interface ClickableNameProps {
  onClick: () => void;
}

const ClickableName: React.FC<ClickableNameProps> = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const name = "Francisco Suarez";

  // Breathing animation (Stage 1) with smoother config
  const beatingAnimation = useSpring({
    to: async (next) => {
      while (!isClicked) {
        await next({ transform: 'scale(1.2)', config: { tension: 800, friction: 14 } });
        await next({ transform: 'scale(0.95)', config: { tension: 500, friction: 14 } });
      }
    },
    from: { transform: 'scale(1)' },
    reset: !isClicked,
  });

  // Explosion animation (Stage 2) with adjusted angles and distances
  const [springs, api] = useSprings(name.length, (index) => ({
    x: 0,
    y: 0,
    rotate: 0,
    transform: "scale(1)",
    config: { mass: 1, tension: 120, friction: 10 },
  }));

  // Handle click to trigger explosion from click position
  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true);
    onClick();

    // Get click position relative to the container
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    setClickPos({ x: clickX, y: clickY });

    // Trigger explosion effect
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
        transform: "scale(1.2)", // Slightly enlarge each letter during explosion
        config: { mass: 1, tension: 120, friction: 15 },
      };
    });
  };

  // Reset letters to original position
  const handleReset = useCallback(() => {
    api.start(() => ({
      x: 0,
      y: 0,
      rotate: 0,
      transform: "scale(1)",
      config: { tension: 200, friction: 20 },
    }));
    setIsClicked(false);
  }, [api]);

  return (
    <div className="text-center">
      <div className="relative">
        {springs.map((style, index) => (
          <animated.span
            key={index}
            style={{
              ...style,
              transform: beatingAnimation.transform.to((scale) => `${scale} ${style.transform.get()}`),
              display: "inline-block",
              marginRight: index === name.length - 1 ? 0 : 2,
            }}
            className="text-4xl font-bold cursor-pointer text-custom-stone"
            onClick={isClicked ? handleReset : handleClick}
          >
            {name[index]}
          </animated.span>
        ))}
      </div>
    </div>
  );
};

export default ClickableName;
