import React, { useState } from 'react';

const PercentageCircle = ({ percentage }) => {

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        r={radius}
        cx="60"
        cy="60"
        fill="none"
        stroke="#ddd"
        strokeWidth="5"
      />
      <circle
        r={radius}
        cx="60"
        cy="60"
        fill="none"
        stroke="#63B79F"
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fill="#333"
      >
        {percentage}%
      </text>
    </svg>
  );
};

export default PercentageCircle;