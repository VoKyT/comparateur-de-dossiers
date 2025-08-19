/**
 * @fileoverview Composant racine React pour le comparateur de dossiers
 * @description Point d'entrée principal de l'interface utilisateur React
 * @props Aucune prop, composant racine
 * @state Gestion de l'état global de l'application
 * @events Gestion des événements Electron via window.electronAPI
 * @dependencies React, Tailwind CSS, window.electronAPI
 * @parent Aucun (composant racine)
 * @children Composants de layout et features
 * @styling Classes Tailwind pour l'interface desktop
 * @accessibility Support clavier, ARIA, contraste élevé
 * @performance Composant mémorisé, optimisations React
 * @testing Tests unitaires dans App.test.tsx
 */

import React, { useEffect, useState } from 'react';
import './styles/globals.css';

// Types pour les informations système
interface SystemInfo {
  versions: {
    electron: string;
    node: string;
    chrome: string;
  };
}

/**
 * Composant principal de l'application Comparateur de Dossiers
 * Interface utilisateur moderne avec React + Tailwind CSS
 */
const App: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialisation de l'application
    initializeApp();
  }, []);

  /**
   * Initialise l'application et récupère les informations système
   */
  const initializeApp = async () => {
    try {
      // Vérifier la disponibilité de l'API Electron
      if (window.electronAPI) {
        const versions = await window.electronAPI.getVersions();
        setSystemInfo({ versions });
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Gère l'événement de fermeture de l'application
   */
  const handleAppClose = () => {
    if (window.electronAPI?.app?.closeApp) {
      window.electronAPI.app.closeApp();
    }
  };

  /**
   * Rendu de l'écran de chargement
   */
  const renderLoading = () => (
    <div className="min-h-screen bg-gradient-to-br from-app-primary to-app-secondary flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
    </div>
  );

  /**
   * Rendu de l'interface principale
   */
  const renderMainInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-app-primary to-app-secondary">
      {/* En-tête avec région drag pour Electron */}
      <header className="drag-region bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <h1 className="text-white text-lg font-semibold no-drag">
              Comparateur de Dossiers
            </h1>
          </div>
          
          {/* Contrôles de fenêtre (optionnels) */}
          <div className="flex gap-2 no-drag">
            <button
              onClick={handleAppClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition-all duration-200"
              aria-label="Fermer l'application"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="card animate-slide-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-app-text mb-4">
              Application React + Electron
            </h2>
            <p className="text-app-text-secondary text-lg mb-6">
              Architecture moderne avec TypeScript et Tailwind CSS
            </p>
            
            {/* Indicateur de statut */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Système initialisé
            </div>
          </div>

          {/* Informations système */}
          {systemInfo && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Informations système
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Electron:</span>
                  <br />
                  <span className="font-mono">{systemInfo.versions.electron}</span>
                </div>
                <div>
                  <span className="text-gray-500">Node.js:</span>
                  <br />
                  <span className="font-mono">{systemInfo.versions.node}</span>
                </div>
                <div>
                  <span className="text-gray-500">Chrome:</span>
                  <br />
                  <span className="font-mono">{systemInfo.versions.chrome}</span>
                </div>
              </div>
            </div>
          )}

          {/* Prochaines étapes */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-app-text mb-4">
              Prêt pour les fonctionnalités
            </h3>
            <p className="text-app-text-secondary mb-6">
              L'interface React est maintenant opérationnelle.
              <br />
              Les fonctionnalités de comparaison seront ajoutées progressivement.
            </p>
            
            <div className="flex justify-center gap-4">
              <button className="btn-primary">
                Commencer la comparaison
              </button>
              <button className="btn-secondary">
                Voir les paramètres
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer avec informations de version */}
      <footer className="fixed bottom-4 right-4">
        <div className="bg-black bg-opacity-20 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-full">
          Version 1.0.0-dev | React + Electron
        </div>
      </footer>
    </div>
  );

  // Rendu principal avec gestion du chargement
  if (isLoading) {
    return renderLoading();
  }

  return renderMainInterface();
};

export default App;
