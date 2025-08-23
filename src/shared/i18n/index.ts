/**
 * @fileoverview Module d'internationalisation centralisé
 * @description Export principal du système i18n
 * @exports useTranslation, I18nProvider, Language, flags
 */

export { I18nProvider, useI18n } from './context';
export type { Language, TranslationValues } from './types';
export { frTranslations } from './translations/fr';
export { enTranslations } from './translations/en';

// Hook simplifié pour les composants
import { useI18n } from './context';

export const useTranslation = () => {
  const { t, language, setLanguage, translations } = useI18n();
  return { t, language, setLanguage, translations };
};

// Flags et métadonnées des langues
export const languageFlags = {
  fr: {
    flag: '🇫🇷',
    name: 'Français',
    code: 'FR'
  },
  en: {
    flag: '🇬🇧',
    name: 'English', 
    code: 'EN'
  }
} as const;