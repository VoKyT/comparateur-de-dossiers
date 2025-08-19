import React from 'react';
import './styles/globals.css';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button 
        onClick={handleClick}
        className="btn-primary"
      >
        Mon Bouton
      </button>
    </div>
  );
};

export default App;
