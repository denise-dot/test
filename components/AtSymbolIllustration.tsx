import React from 'react';

export default function AtSymbolIllustration() {
  return (
    <svg 
      width="200" 
      height="200" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" fill="#1e3a8a" opacity="0.1" />
      
      {/* Main @ symbol */}
      <path
        d="M100 40C70.9 40 47.5 63.4 47.5 92.5C47.5 121.6 70.9 145 100 145C110.5 145 120 140 120 130V92.5C120 81.5 110.5 72.5 100 72.5C89.5 72.5 80 81.5 80 92.5C80 103.5 89.5 112.5 100 112.5C105 112.5 109.5 110.5 112.5 107.5"
        stroke="#1e3a8a"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Inner circle of @ */}
      <circle cx="100" cy="92.5" r="15" fill="#ea580c" />
      
      {/* Decorative dots */}
      <circle cx="145" cy="60" r="5" fill="#ea580c" />
      <circle cx="155" cy="100" r="4" fill="#1e3a8a" />
      <circle cx="145" cy="140" r="6" fill="#ea580c" />
      <circle cx="55" cy="60" r="4" fill="#1e3a8a" />
      <circle cx="45" cy="100" r="5" fill="#ea580c" />
      <circle cx="55" cy="140" r="4" fill="#1e3a8a" />
      
      {/* Accent lines */}
      <path
        d="M130 50 L140 40"
        stroke="#ea580c"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M130 135 L140 145"
        stroke="#ea580c"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
