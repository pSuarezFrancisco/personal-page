import React, { useRef, useEffect, useState } from "react";

interface ClapAnimationProps {
  play: boolean; // Controls whether the animation should play
}

const ClapAnimation: React.FC<ClapAnimationProps> = ({ play }) => {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const [isReversing, setIsReversing] = useState(false);

  useEffect(() => {
    const forwardVideo = forwardVideoRef.current;
    const reverseVideo = reverseVideoRef.current;

    if (play) {
      // Start playing the forward animation
      setIsReversing(false);
      if (forwardVideo) {
        forwardVideo.currentTime = 0;
        forwardVideo.play();

        forwardVideo.onended = () => {
          // Trigger the reversed animation after the forward animation ends
          setIsReversing(true);
          if (reverseVideo) {
            reverseVideo.currentTime = 0;
            reverseVideo.play();
          }
        };
      }
    }
  }, [play]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Forward Animation */}
      <video
        ref={forwardVideoRef}
        src="/clap-animation.webm" // Path to your forward WebM
        muted
        playsInline
        style={{
          display: isReversing ? "none" : "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Reverse Animation */}
      <video
        ref={reverseVideoRef}
        src="/clap-animation-reverse.webm" // Path to your reversed WebM
        muted
        playsInline
        style={{
          display: isReversing ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default ClapAnimation;
