import { useState, useEffect } from "react";

export const useInView = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
};
