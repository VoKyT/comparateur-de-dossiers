/**
 * @fileoverview Barrel export pour les composants communs
 * @description Point d'entrée centralisé pour tous les composants réutilisables
 * @exports VersionBadge - Badge de version avec mode et icône
 * @exports ActionButton - Bouton d'action avec animations
 * @exports ButtonGroup - Groupe de boutons avec espacement
 * @exports IconText - Texte avec icône pour meilleure compréhension
 * @usage import { VersionBadge, ActionButton, ButtonGroup, IconText } from '@/components/common'
 */

export { VersionBadge, default as VersionBadgeDefault } from './VersionBadge';
export { ActionButton, default as ActionButtonDefault } from './ActionButton';
export { ButtonGroup, default as ButtonGroupDefault } from './ButtonGroup';
export { IconText, default as IconTextDefault } from './IconText';