import React, { useEffect, useState } from 'react';
import './styles/globals.css';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { 
  Zap, 
  Settings
} from 'lucide-react';

const App: React.FC = () => {
  useEffect(() => {
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const handleTestClick = () => {
    console.log('🔥 [TEST_BUTTON] [TB_CLICK_01] Bouton test cliqué');
    alert('🚀 Bouton test fonctionne !');
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 font-sans overflow-hidden">
      <div className="flex flex-col items-center">
        {/* Titre stylé sans card */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Comparateur de Dossiers
          </h1>
          <p className="text-blue-100 text-lg">
            Interface moderne avec shadcn/ui
          </p>
        </div>

        {/* Badge version stylé */}
        <div className="mb-8">
          <Badge variant="outline" className="bg-white/20 border-white/30 text-white px-6 py-2 text-sm">
            <Zap className="h-4 w-4 mr-2" />
            Version 1.2.2 • Test Mode
          </Badge>
        </div>

        {/* Bouton test simple */}
        <Button 
          onClick={handleTestClick}
          size="lg"
          className="px-12 py-6 bg-white hover:bg-gray-50 text-blue-600 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Zap className="h-5 w-5 mr-2" />
          Bouton Test
        </Button>
        
        {/* Bouton DevTools */}
        <Button 
          onClick={openDevTools}
          variant="outline"
          size="lg"
          className="mt-4 px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-white/30"
        >
          <Settings className="h-5 w-5 mr-2" />
          DevTools
        </Button>
      </div>
    </div>
  );
};

export default App;
