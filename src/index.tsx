/**
 * @fileoverview Point d'entrée React pour l'application web
 * @description Bootstrap de l'application React moderne avec Vite
 * @props Aucune prop - point d'entrée racine
 * @state Gestion de l'état de démarrage de l'application
 * @events Gestion des événements DOM web
 * @dependencies React, ReactDOM, App component
 * @parent Aucun - point d'entrée web
 * @children App component racine
 * @styling Chargement des styles Tailwind via globals.css
 * @accessibility Configuration ARIA et accessibilité globale
 * @performance Rendu optimisé avec StrictMode et Vite HMR
 * @testing Point d'entrée pour les tests d'intégration
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('🚀 [WEB_APP] [WA_INIT_01] Application web en cours d\'initialisation...');

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
  console.log('⚛️ [WEB_APP] [WA_READY_02] Application React initialisée dans le navigateur');

  // Configuration pour le développement avec Vite HMR
  if ((import.meta as any).env?.DEV) {
    console.log('🔧 [WEB_APP] [WA_DEV_03] Mode développement Vite activé');
    
    // Support Vite HMR optimisé
    if ((import.meta as any).hot) {
      (import.meta as any).hot.accept('./App', () => {
        console.log('🔄 [WEB_APP] [WA_HMR_04] Vite HMR - rechargement de App détecté');
      });
    }
  }
};

/**
 * Gestion des erreurs globales web
 */
const handleGlobalErrors = (): void => {
  // Gestion des erreurs JavaScript non capturées
  window.addEventListener('error', (event) => {
    console.error('🚨 [WEB_APP] [WA_ERROR_05] Erreur JavaScript globale:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });

  // Gestion des promesses rejetées
  window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 [WEB_APP] [WA_PROMISE_06] Promise rejetée non gérée:', event.reason);
    
    // Empêcher le log par défaut du navigateur
    event.preventDefault();
  });
};

/**
 * Configuration de l'accessibilité web
 */
const setupAccessibility = (): void => {
  console.log('♿ [WEB_APP] [WA_A11Y_07] Configuration de l\'accessibilité...');
  
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

  // Configuration du focus visible pour navigation clavier
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
 * Démarrage sécurisé de l'application web
 */
const safeStart = (): void => {
  try {
    console.log('🔧 [WEB_APP] [WA_START_08] Démarrage sécurisé de l\'application...');
    
    // Configuration préliminaire
    handleGlobalErrors();
    setupAccessibility();
    
    // Initialisation de React
    initializeApp();
    
    console.log('✅ [WEB_APP] [WA_SUCCESS_09] Application démarrée avec succès !');
    
  } catch (error) {
    console.error('🚨 [WEB_APP] [WA_FAIL_10] Échec de l\'initialisation:', error);
    
    // Fallback simple : message d'erreur dans le navigateur
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
            L'application web n'a pas pu se charger correctement.
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
            Recharger la page
          </button>
        </div>
      `;
    }
  }
};

// Démarrage de l'application quand le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeStart);
} else {
  safeStart();
}
