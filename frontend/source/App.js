import React, { createContext, useState, useEffect, } from 'react';
import {hot} from 'react-hot-loader';

import Auth from './pages/authentication';

const globalContext = createContext();

const App = (props) => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    if (!window.localStorage.getItem('flapper-token')) {
      // we need to authenticate !! 

    } else {

    } 
  }, []);

  const provides = {
    authenticated,
    setAuthenticated,
  };

  return (
    <globalContext.Provider value={provides}>
      {!authenticated ? <Auth/> : <p>You did it you son of a biotch</p>}
    </globalContext.Provider>
  )
};

export { globalContext };
export default hot(module)(App);