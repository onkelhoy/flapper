import React, { createContext, useState, useEffect, } from 'react';
import {hot} from 'react-hot-loader';

import Auth from './pages/authentication';
import Section from './components/Section';
import Lobby from './pages/lobby';
import Game from './pages/game';
import { request } from './utils';

const globalContext = createContext();

const App = (props) => {
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // using this as section swapper

  useEffect(() => {
    const token = window.localStorage.getItem('flapper-token')
    if (!token) {
      // we need to authenticate !! 

    } else {
      // now we need to try authenticate 
      request('/auth', {
        method: 'post',
        body: { token }
      }).then((res) => {
        if (res.error) window.localStorage.setItem('flapper-token', null);
        else {
          setUser(JSON.parse(window.localStorage.getItem('flapper-user')))
          setCurrentIndex(1);
        }
      }).catch(err => {
        window.localStorage.setItem('flapper-token', null);
      });
    } 
  }, []);

  const provides = {
    user,
    setUser,
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
      <Section index={2} className="game-container">
        <Game/>
      </Section>
    </globalContext.Provider>
  )
};

export { globalContext };
export default hot(module)(App);