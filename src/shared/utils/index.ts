/**
 * @fileoverview Utilitaires partagés de l'application
 * @description Fonctions utilitaires réutilisables selon CLAUDE.md
 * @dependencies Pas de dépendances spécifiques - fonctions pures
 * @exports formatDate, validateEmail, generateId, etc.
 * @usage import { formatDate, validateEmail } from '@/shared/utils'
 * @related components/, features/ - Consommateurs des utilitaires
 * @notes Fonctions pures uniquement, pas de side effects
 */

/**
 * Formate une date selon le format français
 */
export function formatDate(
  date: Date | string, 
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return dateObj.toLocaleDateString('fr-FR', defaultOptions);
}

/**
 * Formate une taille de fichier en format lisible
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Génère un ID unique pour les logs selon CLAUDE.md
 */
export function generateLogId(prefix: string, suffix: string): string {
  const timestamp = Date.now().toString(36);
  return `${prefix}_${suffix}_${timestamp}`.toUpperCase();
}

/**
 * Valide une adresse email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalise la première lettre d'une chaîne
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Tronque un texte avec ellipses
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Retarde l'exécution d'une fonction (promisified sleep)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Crée un objet de classes CSS conditionnelles
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Copie du texte dans le presse-papiers
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Erreur copie presse-papiers:', error);
    return false;
  }
}

/**
 * Génère une couleur aléatoire en format hexadécimal
 */
export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * Vérifie si une valeur est un objet vide
 */
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Deep clone d'un objet (simple, sans fonctions)
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}