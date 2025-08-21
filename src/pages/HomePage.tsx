/**
 * @fileoverview Page d'accueil de l'application comparateur de dossiers
 * @description Page principale composée de modules réutilisables selon architecture CLAUDE.md
 * @props Aucune - Composant de page autonome
 * @state Aucun état local - Délégué aux composants enfants
 * @events handleTestClick, openWebConsole - Actions utilisateur
 * @dependencies AppLayout, PageHeader, VersionBadge, ActionButton, ButtonGroup
 * @parent App.tsx - Point d'entrée de l'application
 * @children Composants modulaires layout + common
 * @styling Classes Tailwind via composants shadcn/ui
 * @accessibility Navigation clavier et ARIA via composants
 * @performance Composants memo optimisés, pas de re-renders inutiles
 * @testing Logs avec IDs uniques pour traçabilité
 */

import React, { useEffect } from 'react';
import { Zap, Globe } from 'lucide-react';

// Layout components - Architecture modulaire
import { AppLayout, PageHeader } from '@/components/layout';

// Common reusable components - Réutilisabilité
import { VersionBadge, ActionButton, ButtonGroup } from '@/components/common';

// Shared constants - Configuration centralisée
import { APP_CONFIG, LOG_IDS } from '@/shared/constants';

/**
 * Page d'accueil avec architecture modulaire professionnelle
 * 
 * Fonctionnalités :
 * - Structure modulaire selon CLAUDE.md
 * - Composants réutilisables et isolés
 * - Séparation des responsabilités stricte
 * - Logs de traçabilité avec IDs uniques
 * - Design responsive mobile-first
 */
export const HomePage: React.FC = () => {
  useEffect(() => {
    console.log(`🆕 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.INIT}] Page d'accueil initialisée`);
    
    // Configuration initiale du body selon CLAUDE.md
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    console.log(`📊 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.CONFIG}] Configuration body appliquée`);
  }, []);

  const handleTestClick = () => {
    console.log(`👆 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.TEST}] Bouton test cliqué`);
    console.log(`✅ [HOME_PAGE] [${LOG_IDS.HOME_PAGE.SUCCESS}] Action test exécutée avec succès`);
    alert('🚀 Application web fonctionne parfaitement !');
  };

  const openWebConsole = () => {
    console.log(`👆 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.CONSOLE}] Bouton console cliqué`);
    console.log(`💡 [HOME_PAGE] [${LOG_IDS.HOME_PAGE.INFO}] Instructions console affichées`);
    alert('💡 Ouvrez la console développeur avec F12 ou Ctrl+Shift+I');
  };

  return (
    <AppLayout>
      {/* En-tête modulaire avec typographie responsive */}
      <PageHeader 
        title={APP_CONFIG.name}
        subtitle={APP_CONFIG.description}
      />

      {/* Badge de version modulaire */}
      <VersionBadge 
        version={APP_CONFIG.version} 
        mode={APP_CONFIG.mode}
        icon={Globe}
      />

      {/* Groupe de boutons avec espacement optimisé */}
      <ButtonGroup direction="vertical" spacing="compact">
        <ActionButton
          onClick={handleTestClick}
          variant="primary"
          size="lg"
          icon={Zap}
        >
          Lancer le Test
        </ActionButton>

        <ActionButton
          onClick={openWebConsole}
          variant="outline"
          size="lg"
          icon={Globe}
        >
          Console Web (F12)
        </ActionButton>
      </ButtonGroup>
    </AppLayout>
  );
};

export default HomePage;