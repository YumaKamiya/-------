
import React from 'react';

interface FortuneMessageProps {
  message: string | null;
}

const FortuneMessage: React.FC<FortuneMessageProps> = ({ message }) => {
  // Use a fixed height container to prevent layout shifts when the message appears/disappears.
  // Adjust min-h as needed based on expected message length and font size.
  const containerClasses = "mt-6 min-h-[4rem] flex items-center justify-center p-4 rounded-lg";

  if (!message) {
    return <div className={`${containerClasses} bg-transparent`}></div>; // Placeholder to maintain space
  }

  return (
    <div className={`${containerClasses} bg-indigo-50 shadow`}>
      <p className="text-xl md:text-2xl font-medium text-indigo-800">
        {message}
      </p>
    </div>
  );
};

export default FortuneMessage;
