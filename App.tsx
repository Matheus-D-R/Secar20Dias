import React from 'react';
import SalesPage from './components/SalesPage';



import { useEffect } from 'react'

function App() {

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [])

  return (
    <>
      {/* seu conteúdo */}
    </>
  )
}

export default App



const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <SalesPage />
    </div>
  );
};

export default App;
