/**
 * @fileoverview Barrel export principal pour tous les composants
 * @description Point d'entrée centralisé pour l'ensemble des composants de l'application
 * @exports * from layout - Composants de mise en page (AppLayout, PageHeader)
 * @exports * from common - Composants communs réutilisables
 * @exports * from ui - Composants shadcn/ui (Button, Badge, etc.)
 * @usage import { AppLayout, ActionButton, Button } from '@/components'
 * @related components/layout/index.ts, components/common/index.ts
 * @notes Export centralisé pour une meilleure DX et imports simplifiés
 */

// Layout components
export * from './layout';

// Common reusable components  
export * from './common';

// Feature components - Composants métier modulaires
export * from './features';

// UI components (shadcn/ui)
export * from './ui/button';
export * from './ui/badge';
export * from './ui/card';
export * from './ui/dialog';
export * from './ui/avatar';
export * from './ui/alert-dialog';
export * from './ui/command';
export * from './ui/dropdown-menu';
export * from './ui/hover-card';
export * from './ui/popover';
export * from './ui/progress';
export * from './ui/separator';
export * from './ui/sheet';
export * from './ui/tabs';
export * from './ui/tooltip';