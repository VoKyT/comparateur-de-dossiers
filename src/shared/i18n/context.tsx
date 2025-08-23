/**
 * @fileoverview Context d'internationalisation avec persistance
 * @description Provider et context pour la gestion globale des langues
 * @exports I18nProvider, I18nContext
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, TranslationValues } from './types';
import { frTranslations } from './translations/fr';
import { enTranslations } from './translations/en';

interface I18nContextType {
  language: Language;
  translations: TranslationValues;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  fr: frTranslations,
  en: enTranslations
};

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Récupérer la langue sauvegardée ou utiliser français par défaut
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('folder-comparator-language');
      return (saved as Language) || 'fr';
    }
    return 'fr';
  });

  // Fonction pour changer la langue avec persistance
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('folder-comparator-language', lang);
    }
    console.log(`🌍 [I18N] Langue changée vers: ${lang.toUpperCase()}`);
  };

  // Fonction helper pour récupérer une traduction par chemin
  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = translations[language];
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        console.warn(`🌍 [I18N] Traduction manquante pour: ${path} en ${language}`);
        return path; // Retourner le chemin si traduction non trouvée
      }
    }
    
    return typeof value === 'string' ? value : path;
  };

  // Mettre à jour l'attribut lang du document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const contextValue: I18nContextType = {
    language,
    translations: translations[language],
    setLanguage,
    t
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};