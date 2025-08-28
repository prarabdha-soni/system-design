import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuClick={() => {}} />
      
      <div className="flex flex-1">
        <MainContent />
      </div>
    </div>
  );
}

export default App;