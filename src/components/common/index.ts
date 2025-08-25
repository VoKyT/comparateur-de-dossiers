/**
 * @fileoverview Barrel export pour les composants communs
 * @description Point d'entrée centralisé pour tous les composants réutilisables
 * @exports VersionBadge - Badge de version avec mode et icône
 * @exports ActionButton - Bouton d'action avec animations
 * @exports ButtonGroup - Groupe de boutons avec espacement
 * @exports IconText - Texte avec icône pour meilleure compréhension
 * @exports LanguageToggle - Sélecteur de langue animé avec drapeaux
 * @exports ProfileIcon - Icône de profil circulaire réutilisable
 * @exports GoogleAuthButton - Bouton d'authentification Google avec gestion d'états
 * @usage import { VersionBadge, ActionButton, ButtonGroup, IconText, LanguageToggle, ProfileIcon, GoogleAuthButton } from '@/components/common'
 */

export { VersionBadge, default as VersionBadgeDefault } from './VersionBadge';
export { ActionButton, default as ActionButtonDefault } from './ActionButton';
export { ButtonGroup, default as ButtonGroupDefault } from './ButtonGroup';
export { IconText, default as IconTextDefault } from './IconText';
export { LanguageToggle } from './LanguageToggle';
export { FrenchFlag, BritishFlag } from './FlagIcon';
export { ProfileIcon, default as ProfileIconDefault } from './ProfileIcon';
export { GoogleAuthButton, default as GoogleAuthButtonDefault } from './GoogleAuthButton';