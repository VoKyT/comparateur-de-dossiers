/**
 * @fileoverview Hooks React partagés de l'application
 * @description Hooks réutilisables selon architecture modulaire CLAUDE.md
 * @dependencies React hooks, shared utilities
 * @exports useLocalStorage, useDebounce, useMediaQuery, etc.
 * @usage import { useLocalStorage, useMediaQuery } from '@/shared/hooks'
 * @related components/, features/ - Consommateurs des hooks
 * @notes Hooks génériques uniquement, pas de feature-specific
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook pour gérer le localStorage avec type safety
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erreur localStorage pour la clé ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur sauvegarde localStorage pour ${key}:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * Hook pour debounce des valeurs
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook pour media queries responsive
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

/**
 * Hook pour gérer les clics outside d'un élément
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}

/**
 * Hook pour gérer l'état de loading
 */
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  const toggleLoading = useCallback(() => setIsLoading(prev => !prev), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading
  };
}

// Business Logic Hooks
export { useFileSystem } from './useFileSystem';
export { useComparison } from './useComparison';
export { useFolderSelection } from './useFolderSelection';
export { useReportGenerator } from './useReportGenerator';
export { useFileListExport } from './useFileListExport';

// Motion & Animation Hooks
export { useMotionColor, useMotionColorAnimation, createSafeGradient, getSafeColor } from './useMotionColors';