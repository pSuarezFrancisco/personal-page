import React, { useState, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface ClickableNameProps {
  onClick: () => void;
}

const ClickableName: React.FC<ClickableNameProps> = React.memo(({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const nameAnimation = useSpring({
    transform: isClicked ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 200, friction: 10 },
  });

  const handleClick = useCallback(() => {
    setIsClicked(true);
    onClick();
  }, [onClick]);

  return (
    <animated.h1
      style={nameAnimation}
      className="text-4xl font-bold cursor-pointer"
      onClick={handleClick}
    >
      Francisco Suarez
    </animated.h1>
  );
});

export default ClickableName;
