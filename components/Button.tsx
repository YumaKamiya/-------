
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
  const baseStyle = "font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50";
  // Specific styles like background color, text color will be passed via className prop from the parent.
  // Adding default interactive styles that can be overridden or complemented by `className`.
  const interactiveStyle = disabled ? "opacity-50 cursor-not-allowed" : "transform hover:scale-105";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${interactiveStyle} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
