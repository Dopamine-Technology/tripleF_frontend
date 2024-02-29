import React from 'react';

const PercentageLine = ({ percentage }) => {
  const length = 100; // Length of the line
  const strokeWidth = 10; // Thickness of the line

  // Calculate the length of the line based on the percentage
  const lineLength = (percentage / 100) * length;
  const lineOffset = length - lineLength;

  return (
    <svg width="120" height="30" viewBox={`0 0 ${length} ${strokeWidth}`}>
      {/* Background line */}
      <line
        x1="0"
        y1={strokeWidth }
        x2={length}
        y2={strokeWidth}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Percentage line */}
      <line
        x1={lineOffset}
        y1={strokeWidth }
        x2={length - lineOffset}
        y2={strokeWidth  }
        stroke="#63B79F"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Percentage label */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fill="#333"
        strokeLinecap="round"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default PercentageLine;
