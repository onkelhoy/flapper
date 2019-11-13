import React, { createContext, useState, useEffect, } from 'react';
import {hot} from 'react-hot-loader';

import Auth from './pages/authentication';
import Section from './components/Section';
import Lobby from './pages/lobby';

const globalContext = createContext();

const App = (props) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // using this as section swapper

  useEffect(() => {
    if (!window.localStorage.getItem('flapper-token')) {
      // we need to authenticate !! 

    } else {

    } 
  }, []);

  const provides = {
    authenticated,
    setAuthenticated,
    currentIndex,
    setCurrentIndex,
  };

  return (
    <globalContext.Provider value={provides}>
      <Section index={0}>
        <Auth/>
      </Section>
      <Section index={1} className="lobby-container">
        <Lobby/>
      </Section>
    </globalContext.Provider>
  )
};

export { globalContext };
export default hot(module)(App);