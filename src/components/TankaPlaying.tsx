import React, { useRef, useEffect } from "react";

interface TankaPlayingProps {
  sectionRef: React.RefObject<HTMLElement>; // Reference to the Art Gallery section
}

const TankaPlaying: React.FC<TankaPlayingProps> = ({ sectionRef }) => {
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
        position: "absolute", // Scoped to the ArtGallery section
        bottom: "-15%", // Offset towards the bottom
        right: "-20%", // Default value
        transform: "translate(0%, 0%)", // Ensure proper alignment
        pointerEvents: "none", // Prevent interaction
      }}
      className="tanka-animation" // Add a class for responsive breakpoints
    >
      <video
        ref={videoRef}
        src="/tanka-playing.webm"
        muted
        playsInline
        loop // Enable looping
        style={{
          width: "100%", // Increased size for a bigger visual impact
          height: "auto", // Maintain aspect ratio
          objectFit: "contain", // Ensure proper scaling
        }}
      />
    </div>
  );
};

export default TankaPlaying;
