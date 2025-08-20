import React, { useEffect } from 'react';
import './styles/globals.css';

const App: React.FC = () => {
  useEffect(() => {
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  const openDevTools = async () => {
    try {
      // @ts-ignore - electronAPI ajouté par preload
      const electronAPI = window.electronAPI;
      console.log('🔍 [DEBUG_API] ElectronAPI:', electronAPI);
      console.log('🔍 [DEBUG_DEV] Development API:', electronAPI?.development);
      
      if (electronAPI && electronAPI.development && electronAPI.development.openDevTools) {
        await electronAPI.development.openDevTools();
        console.log('🔧 [DEV_TOOLS] [DT_OPEN_01] DevTools ouvertes via bouton');
      } else {
        console.warn('⚠️ [DEV_TOOLS] [DT_WARN_01] API dev non disponible (mode production?)');
        console.log('🔍 [DEBUG_MISSING] API manquante. electronAPI existe:', !!electronAPI);
        console.log('🔍 [DEBUG_MISSING] development existe:', !!electronAPI?.development);
      }
    } catch (error) {
      console.error('❌ [DEV_TOOLS] [DT_ERROR_02] Erreur ouverture DevTools:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 font-sans overflow-hidden">
      <div className="flex flex-col items-center space-y-8">
        {/* Titre de l'application */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Comparateur de Dossiers
          </h1>
          <p className="text-blue-100 text-lg">
            Comparez facilement le contenu de vos dossiers
          </p>
        </div>

        {/* Conteneur des boutons */}
        <div className="flex gap-6">
          <button 
            type="button"
            onClick={handleClick}
            className="group relative px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out border-none cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Commencer</span>
            </span>
          </button>
          
          <button 
            type="button"
            onClick={openDevTools}
            className="group relative px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out border border-white/30 cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>DevTools</span>
            </span>
          </button>
        </div>

        {/* Badge version */}
        <div className="mt-8">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white shadow-sm border border-white/30">
            Version 1.2.1 • Electron + React + TypeScript
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
