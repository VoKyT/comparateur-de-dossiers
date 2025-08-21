import React, { useEffect } from 'react';
import './styles/globals.css';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  Zap, 
  Globe
} from 'lucide-react';

const App: React.FC = () => {
  useEffect(() => {
    document.body.className = 'm-0 p-0';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }, []);

  const handleTestClick = () => {
    console.log('🔥 [TEST_BUTTON] [TB_CLICK_01] Bouton test cliqué');
    alert('🚀 Application web fonctionne parfaitement !');
  };

  const openWebConsole = () => {
    console.log('🔧 [WEB_CONSOLE] [WC_OPEN_01] Console développeur ouverte');
    alert('💡 Ouvrez la console développeur avec F12 ou Ctrl+Shift+I');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 font-sans overflow-hidden p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center w-full max-w-4xl">
        {/* Titre stylé avec typographie responsive */}
        <div className="mb-8 md:mb-12 text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h1 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent text-balance">
            Comparateur de Dossiers
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-800/80 leading-5 sm:leading-6 md:leading-7 font-medium tracking-wide">
            Application web moderne • Vite HMR • Comparaison intelligente et rapide
          </p>
        </div>

        {/* Badge version responsive */}
        <div className="mb-8 md:mb-10">
          <Badge variant="outline" className="bg-blue-800/10 border-blue-600/30 text-blue-800 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold tracking-wide shadow-sm">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Version 1.2.3 • Mode Web
          </Badge>
        </div>

        {/* Container pour les boutons avec design moderne et compact */}
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          {/* Bouton test principal responsive avec design élégant */}
          <Button 
            onClick={handleTestClick}
            size="lg"
            className="group px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl md:rounded-2xl font-bold text-base sm:text-lg md:text-xl tracking-wide shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
          >
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Lancer le Test
          </Button>
          
          {/* Bouton Console Web responsive avec style harmonieux */}
          <Button 
            onClick={openWebConsole}
            variant="outline"
            size="lg"
            className="group px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-white/80 hover:bg-white text-blue-700 hover:text-blue-800 rounded-xl md:rounded-xl font-semibold text-sm sm:text-base md:text-lg tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-blue-300/50 hover:border-blue-400/70"
          >
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
            Console Web (F12)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
