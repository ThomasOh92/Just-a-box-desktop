import * as React from 'react';
import { useEffect, useState } from 'react';
import Dashboard from './components/dashboard';
import SingleBox from './components/singlebox'; 

const App: React.FC = () => {
  const [currentComponent, setCurrentComponent] = useState('main');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#box/')) {
      setCurrentComponent('singleBox');
    }
  }, []);

  switch (currentComponent) {
    case 'singleBox':
      return <SingleBox />;
    case 'main':
    default:
      return <Dashboard />;
  }

};

export default App;
