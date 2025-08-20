/**
 * @fileoverview Point d'entrée React pour le renderer process
 * @description Bootstrap de l'application React dans l'environnement Electron
 * @props Aucune prop - point d'entrée racine
 * @state Gestion de l'état de démarrage de l'application
 * @events Gestion des événements DOM et Electron
 * @dependencies React, ReactDOM, App component
 * @parent Aucun - point d'entrée renderer
 * @children App component racine
 * @styling Chargement des styles Tailwind via globals.css
 * @accessibility Configuration ARIA et accessibilité globale
 * @performance Rendu optimisé avec StrictMode
 * @testing Point d'entrée pour les tests d'intégration
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './shared/types/electron';

// Vérification de l'environnement Electron
if (typeof window === 'undefined') {
  throw new Error('Cette application doit être exécutée dans un environnement Electron renderer');
}

// Vérification de l'API Electron
if (!window.electronAPI) {
  console.warn('⚠️ API Electron non disponible. Fonctionnalités limitées.');
} else {
  console.log('✅ API Electron disponible');
}

/**
 * Initialisation de l'application React
 */
const initializeApp = (): void => {
  // Récupération du conteneur DOM
  const container = document.getElementById('root');
  
  if (!container) {
    throw new Error('Conteneur DOM "root" non trouvé');
  }

  // Création de la racine React 18
  const root = createRoot(container);
  
  // Rendu de l'application avec StrictMode pour le développement
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Log de démarrage
  console.log('⚛️ Application React initialisée dans Electron');

  // Configuration pour le développement
  if (process.env.NODE_ENV === 'development') {
    // Informations de debug
    console.log('🔧 Mode développement activé');
    
    // Hot reload detection (si supporté par le bundler)
    if (typeof module !== 'undefined' && 'hot' in module && (module as any).hot) {
      (module as any).hot.accept('./App', () => {
        console.log('🔄 Hot reload détecté');
      });
    } else if (import.meta.hot) {
      // Support Vite HMR
      import.meta.hot.accept('./App', () => {
        console.log('🔄 Vite HMR détecté');
      });
    }
  }
};

/**
 * Gestion des erreurs globales de React
 */
const handleGlobalErrors = (): void => {
  // Gestion des erreurs React non capturées
  window.addEventListener('error', (event) => {
    console.error('🚨 Erreur JavaScript globale:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
    
    // Notifier Electron si possible
    if (window.electronAPI?.notifications?.showErrorDialog) {
      window.electronAPI.notifications.showErrorDialog(
        'Erreur Application',
        `Une erreur s'est produite: ${event.message}`
      );
    }
  });

  // Gestion des promesses rejetées
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Promise rejetée non gérée:', event.reason);
    
    // Empêcher le log par défaut du navigateur
    event.preventDefault();
  });
};

/**
 * Configuration de l'accessibilité
 */
const setupAccessibility = (): void => {
  // Configuration de base pour l'accessibilité
  document.documentElement.setAttribute('lang', 'fr');
  
  // Meta viewport pour responsive design
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  }

  // Configuration du focus visible
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });

  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
};

/**
 * Démarrage sécurisé de l'application
 */
const safeStart = (): void => {
  try {
    // Configuration préliminaire
    handleGlobalErrors();
    setupAccessibility();
    
    // Initialisation de React
    initializeApp();
    
  } catch (error) {
    console.error('🚨 Échec de l\'initialisation de l\'application:', error);
    
    // Fallback : affichage d'un message d'erreur dans le DOM
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: system-ui, sans-serif;
          color: #dc2626;
          background: #fee2e2;
          text-align: center;
          padding: 2rem;
        ">
          <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">
            Erreur de démarrage
          </h1>
          <p style="margin-bottom: 1rem;">
            L'application n'a pas pu se charger correctement.
          </p>
          <button 
            onclick="location.reload()" 
            style="
              background: #dc2626;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
            "
          >
            Recharger l'application
          </button>
        </div>
      `;
    }
    
    // Notifier Electron de l'erreur
    if (window.electronAPI?.notifications?.showErrorDialog) {
      window.electronAPI.notifications.showErrorDialog(
        'Erreur de démarrage',
        'L\'application n\'a pas pu se charger. Veuillez redémarrer.'
      );
    }
  }
};

// Démarrage de l'application quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeStart);
} else {
  safeStart();
}
