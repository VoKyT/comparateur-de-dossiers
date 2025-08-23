/**
 * @fileoverview Hook pour gestion des couleurs compatibles Framer Motion
 * @description Solution officielle pour éviter les erreurs oklch() not animatable
 * @source https://motion.dev/troubleshooting/color-not-animatable
 */

import { useMotionValue, MotionValue } from 'framer-motion';
import { useEffect } from 'react';

/**
 * Map des couleurs RGB explicites pour éviter oklch
 */
const RGB_COLORS = {
  'slate-50': 'rgb(248, 250, 252)',
  'slate-100': 'rgb(241, 245, 249)',
  'slate-200': 'rgb(226, 232, 240)',
  'slate-300': 'rgb(203, 213, 225)',
  'slate-600': 'rgb(71, 85, 105)',
  'slate-700': 'rgb(51, 65, 85)',
  'blue-50': 'rgb(239, 246, 255)',
  'blue-600': 'rgb(37, 99, 235)',
  'blue-700': 'rgb(29, 78, 216)',
  'white': 'rgb(255, 255, 255)',
} as const;

export type ColorKey = keyof typeof RGB_COLORS;

/**
 * Hook pour créer une MotionValue de couleur compatible
 */
export const useMotionColor = (initialColor: ColorKey): MotionValue<string> => {
  const color = useMotionValue(RGB_COLORS[initialColor]);
  
  const setColor = (newColor: ColorKey) => {
    color.set(RGB_COLORS[newColor]);
  };
  
  return color;
};

/**
 * Hook pour animations de couleur sécurisées
 */
export const useMotionColorAnimation = () => {
  const backgroundColor = useMotionValue(RGB_COLORS['white']);
  const borderColor = useMotionValue(RGB_COLORS['slate-300']);
  const textColor = useMotionValue(RGB_COLORS['slate-700']);
  
  const animateHover = () => {
    backgroundColor.set(RGB_COLORS['blue-50']);
    borderColor.set(RGB_COLORS['blue-600']);
    textColor.set(RGB_COLORS['blue-700']);
  };
  
  const animateRest = () => {
    backgroundColor.set(RGB_COLORS['white']);
    borderColor.set(RGB_COLORS['slate-300']);
    textColor.set(RGB_COLORS['slate-700']);
  };
  
  return {
    backgroundColor,
    borderColor,
    textColor,
    animateHover,
    animateRest,
  };
};

/**
 * Créer un gradient RGB sécurisé
 */
export const createSafeGradient = (
  direction: string,
  fromColor: ColorKey,
  toColor: ColorKey
): string => {
  return `linear-gradient(${direction}, ${RGB_COLORS[fromColor]}, ${RGB_COLORS[toColor]})`;
};

/**
 * Obtenir une couleur RGB sécurisée
 */
export const getSafeColor = (color: ColorKey): string => {
  return RGB_COLORS[color];
};