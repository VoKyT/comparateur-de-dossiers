/**
 * @fileoverview Module d'accessibilité centralisé avec i18n
 * @description Utilitaires et constantes pour l'accessibilité des composants
 * @exports AccessibilityLabelKey, getAriaLabel, createAccessibleProps
 * @dependencies i18n - Module d'internationalisation
 * @usage import { getAriaLabel } from '@/shared/accessibility'
 */

import { useTranslation } from '@/shared/i18n';

/**
 * Type pour les clés des labels d'accessibilité
 * Basé sur les clés du module i18n accessibility
 */
export type AccessibilityLabelKey = 
  | 'folderSelectA'
  | 'folderSelectB' 
  | 'folderSelectSingle'
  | 'backToWelcome'
  | 'compare'
  | 'reset'
  | 'expand'
  | 'collapse'
  | 'download'
  | 'export'
  | 'instagram'
  | 'languageToggle'
  | 'close'
  | 'open'
  | 'toggle';

/**
 * Hook pour récupérer un label d'accessibilité traduisible
 * @param key - Clé du label à récupérer
 * @returns Le label d'accessibilité dans la langue courante
 */
export const useAriaLabel = (key: AccessibilityLabelKey): string => {
  const { t } = useTranslation();
  return t(`accessibility.${key}`);
};

/**
 * Hook pour créer les propriétés d'accessibilité standards
 * @param labelKey - Clé du label d'accessibilité
 * @param role - Rôle ARIA optionnel (défaut: 'button')
 * @returns Objet avec aria-label, role et title (tooltip) traduits
 */
export const useAccessibleProps = (
  labelKey: AccessibilityLabelKey, 
  role: string = 'button'
) => {
  const label = useAriaLabel(labelKey);
  return {
    'aria-label': label,
    'title': label, // Tooltip au survol
    role
  };
};

/**
 * Hook pour les props d'accessibilité des images
 * @param labelKey - Clé du label d'accessibilité
 * @param altText - Texte alternatif pour l'image
 * @returns Objet avec aria-label et alt traduits
 */
export const useImageAccessibleProps = (
  labelKey: AccessibilityLabelKey,
  altText: string
) => {
  const label = useAriaLabel(labelKey);
  return {
    'aria-label': label,
    alt: altText
  };
};

/**
 * Version non-hook pour compatibilité (deprecated)
 * DEPRECATED: Utiliser useAccessibleProps à la place
 * @param labelKey - Clé du label d'accessibilité
 * @param role - Rôle ARIA optionnel (défaut: 'button')
 * @returns Objet avec aria-label, role et title (fallback français)
 */
export const createAccessibleProps = (
  labelKey: AccessibilityLabelKey, 
  role: string = 'button'
) => {
  // Fallback en français pour compatibilité
  const fallbackLabels: Record<AccessibilityLabelKey, string> = {
    folderSelectA: "Sélectionner le dossier A pour la comparaison",
    folderSelectB: "Sélectionner le dossier B pour la comparaison",
    folderSelectSingle: "Sélectionner un dossier pour explorer son contenu",
    backToWelcome: "Retourner à l'écran d'accueil",
    compare: "Lancer la comparaison des dossiers",
    reset: "Réinitialiser la sélection",
    expand: "Développer l'arborescence",
    collapse: "Réduire l'arborescence",
    download: "Télécharger le rapport de comparaison",
    export: "Exporter les résultats",
    instagram: "Suivre @vokytrg sur Instagram",
    languageToggle: "Changer la langue de l'interface",
    close: "Fermer",
    open: "Ouvrir",
    toggle: "Basculer l'affichage"
  };

  const label = fallbackLabels[labelKey];
  return {
    'aria-label': label,
    'title': label, // Tooltip au survol
    role
  };
};