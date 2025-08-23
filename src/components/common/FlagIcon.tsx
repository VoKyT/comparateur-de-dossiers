/**
 * @fileoverview Composants d'icônes de drapeaux en SVG
 * @description Drapeaux France et UK en vraies icônes SVG
 */

import React from 'react';

interface FlagProps {
  size?: number;
  className?: string;
}

export const FrenchFlag: React.FC<FlagProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect x="0" y="0" width="8" height="24" fill="#002395" />
    <rect x="8" y="0" width="8" height="24" fill="#ffffff" />
    <rect x="16" y="0" width="8" height="24" fill="#ed2939" />
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="#ccc" strokeWidth="0.5" rx="2" />
  </svg>
);

export const BritishFlag: React.FC<FlagProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    {/* Blue background */}
    <rect x="0" y="0" width="24" height="24" fill="#012169" rx="2" />
    
    {/* White diagonal crosses */}
    <path d="M0 0 L24 24 M24 0 L0 24" stroke="#ffffff" strokeWidth="2.5" />
    
    {/* Red diagonal crosses */}
    <path d="M0 0 L24 24 M24 0 L0 24" stroke="#c8102e" strokeWidth="1.5" />
    
    {/* White cross */}
    <path d="M12 0 L12 24 M0 12 L24 12" stroke="#ffffff" strokeWidth="4" />
    
    {/* Red cross */}
    <path d="M12 0 L12 24 M0 12 L24 12" stroke="#c8102e" strokeWidth="2.5" />
    
    {/* Border */}
    <rect x="0" y="0" width="24" height="24" fill="none" stroke="#ccc" strokeWidth="0.5" rx="2" />
  </svg>
);