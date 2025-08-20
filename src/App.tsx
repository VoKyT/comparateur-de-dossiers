import React from 'react';

// Supprimer les marges par défaut du body
if (typeof document !== 'undefined') {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
}

const App: React.FC = () => {
  const handleClick = () => {
    alert('Bouton cliqué !');
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6',
      fontFamily: 'system-ui, sans-serif',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box'
    }}>
      <button 
        onClick={handleClick}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Mon Bouton
      </button>
    </div>
  );
};

export default App;
