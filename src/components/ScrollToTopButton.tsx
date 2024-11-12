import React from "react";

interface ScrollToTopButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  onClick,
  visible,
}) => {
  if (!visible) return null; // Return null instead of false

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 p-4 rounded-full bg-gray-700 text-white hover:bg-gray-900"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
