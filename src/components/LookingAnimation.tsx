import React, { useRef, useEffect } from "react";

interface LookingAnimationProps {
  sectionRef: React.RefObject<HTMLElement>; // Reference to the Art Gallery section
}

const LookingAnimation: React.FC<LookingAnimationProps> = ({ sectionRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const section = sectionRef.current;

      if (video && section) {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = sectionTop + section.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Check if the section is within the viewport
        if (sectionTop < viewportHeight && sectionBottom > 0) {
          video.play(); // Play video when section is in view
        } else {
          video.pause(); // Pause video when section is out of view
        }
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRef]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden",
      }}
      className="tanka-animation" // Add a class for responsive breakpoints
    >
      <video
        ref={videoRef}
        src="/looking.webm"
        muted
        playsInline
        loop // Enable looping
        style={{
          height: "auto",
          position: "absolute",
          bottom: "0",
          maxWidth: "unset",
        }}
      />
    </div>
  );
};

export default LookingAnimation;
