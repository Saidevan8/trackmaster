import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10" }) => {
  return (
    <svg 
      viewBox="0 0 50 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="TrackMaster Logo"
    >
      {/* Background Container */}
      <rect width="50" height="50" rx="12" className="fill-emerald-600" />
      
      {/* Chart Bars */}
      <path d="M13 36V26" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25 36V16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M37 36V22" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Accent Dot (Signifying Mastery/Goal) */}
      <circle cx="37" cy="14" r="3" className="fill-emerald-200" />
    </svg>
  );
};
