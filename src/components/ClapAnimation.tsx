import React, { useRef, useEffect } from "react";

interface ClapAnimationProps {
  play: boolean; // Controls whether the animation should play
}

const ClapAnimation: React.FC<ClapAnimationProps> = ({ play }) => {
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const forwardVideo = forwardVideoRef.current;
    const reverseVideo = reverseVideoRef.current;

    if (play) {
      // Start playing the forward animation
      if (forwardVideo) {
        forwardVideo.currentTime = 0;
        forwardVideo.play();

        forwardVideo.onended = () => {
          // Trigger the reversed animation after the forward animation ends
          if (reverseVideo) {
            reverseVideo.currentTime = 0;
            reverseVideo.play();
          }
        };
      }
    }
  }, [play]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Forward Animation */}
      <video
        ref={forwardVideoRef}
        src="/clap-animation.webm" // Path to your forward WebM
        muted
        playsInline
        style={{
          width: "85%",
          height: "auto",
          objectFit: "contain",
          position: "absolute",
          bottom: 0,
        }}
      />
    </div>
  );
};

export default ClapAnimation;
