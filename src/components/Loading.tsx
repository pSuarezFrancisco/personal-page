import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const Loading: React.FC = React.memo(() => {
  const loadingAnimation = useSpring({
    from: { opacity: 0.5, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1.1)' },
    config: { duration: 800 },
    loop: true,
  });

  return (
    <animated.div
      style={loadingAnimation}
      className="flex items-center justify-center h-screen bg-gray-900 text-white"
    >
      <h1 className="text-2xl font-semibold">Loading test...</h1>
    </animated.div>
  );
});

export default Loading;
