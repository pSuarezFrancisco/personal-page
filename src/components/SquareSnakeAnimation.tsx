import React, { useEffect, useState, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import SquareSnake from "../assets/SquareSnake.json"; // Replace with your JSON file path

const ScrollControlledLottie = () => {
  const [progress, setProgress] = useState(0);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null); // Define the type here

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progressValue = scrollPosition / maxScroll;
    setProgress(progressValue);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update the animation's frame based on scroll
  useEffect(() => {
    if (lottieRef.current) {
      const frame = progress * 100; // Map progress to a frame (adjust if needed)
      lottieRef.current.goToAndStop(frame, true); // Go to the calculated frame
    }
  }, [progress]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={SquareSnake}
      loop={false}
      style={{
        width: "30vw",
        height: "30vh",
        position: "fixed",
        bottom: 0,
        right: 0,
      }}
    />
  );
};

export default ScrollControlledLottie;
