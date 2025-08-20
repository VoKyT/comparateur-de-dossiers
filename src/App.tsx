import React from 'react';
import './styles/globals.css';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  return (
    <div className="app-container">
      <button 
        type="button"
        onClick={handleClick}
        className="btn-primary"
      >
        Mon Bouton
      </button>
    </div>
  );
};

export default App;
