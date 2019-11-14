import React, { useState, createContext, useEffect, useContext } from 'react';

import SearchFriend from '../../components/Friend/Search' 
import FirendList from '../../components/Friend/List';
import FirendInfo from '../../components/Friend/Info';
import './style.scss';
import { request } from '../../utils';
import { globalContext } from '../../App';

const context = createContext();

const Lobby = (props) => {
  const [selected, view] = useState(null);
  const { user, } = useContext(globalContext);
  const [openSearch, setOpenSearch] = useState(false);

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      request('/friend/'+user._id).then((res) => {
        if (res.error) console.error('cant do this');
        else {
          console.log(res);
          setFriends(res);
        }
      }).catch((e) => console.error(e, 'hhhmmmm'))
    }
  }, [user]);

  const provides = {
    friends,
    setFriends,
    view,
    selected,
    openSearch,
    setOpenSearch,
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