import React, { useState, createContext, } from 'react';

import SearchFriend from '../../components/Friend/Search' 
import FirendList from '../../components/Friend/List';
import FirendInfo from '../../components/Friend/Info';
import './style.scss';

const context = createContext();

const Lobby = (props) => {
  const [selected, view] = useState(null);

  const friends = [
    { name: 'erik', status: 'pending', yourscore: 1880, friendscore: 190, wins: 10, games: 89, airplane: 3 },
    { name: 'johan', status: 'online', yourscore: 10, friendscore: 191, wins: 32, games: 49, airplane: 5 },
    { name: 'Birgit', status: 'online', yourscore: 180, friendscore: 1911, wins: 10, games: 19, airplane: 2 },
    { name: 'Jan', status: 'online', yourscore: 188, friendscore: 1990, wins: 3, games: 8, airplane: 4 },
    { name: 'Klent', status: 'accept', yourscore: 18380, friendscore: 1920, wins: 2, games: 3, airplane: 3 },
    { name: 'Björn', status: 'accept', yourscore: 18480, friendscore: 1920, wins: 0, games: 1, airplane: 1 },
    { name: 'Anna', status: 'accept', yourscore: 182, friendscore: 1904, wins: 560, games: 982, airplane: 6 },
    { name: 'Helene', status: 'online', yourscore: 190, friendscore: 10, wins: 100, games: 278, airplane: 5 },
    { name: 'Linn', status: 'requested', yourscore: 1780, friendscore: 12, wins: 10, games: 12, airplane: 4 },
    { name: 'Hailey', status: 'offline', yourscore: 1680, friendscore: 166, wins: 6, games: 17, airplane: 2 },
  ]

  const provides = {
    friends,
    view,
    selected,
    challenge: () => {
      if (!selected) return;
      console.log('challenge', selected);
    }
  };

  return (
    <context.Provider value={provides}>
      <div className="grid">
        <FirendList context={context}/>
        <FirendInfo context={context}/>
      </div>

      <SearchFriend context={context}/>
    </context.Provider>
  )
}

export default Lobby;