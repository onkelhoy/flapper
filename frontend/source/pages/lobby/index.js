import React, { useState, createContext, useEffect, useContext } from 'react';
import Peer from 'peerjs';
import { Dimmer, Header, Icon } from 'semantic-ui-react';

import SearchFriend from '../../components/Friend/Search' 
import FirendList from '../../components/Friend/List';
import FirendInfo from '../../components/Friend/Info';
import './style.scss';
import { request } from '../../utils';
import { globalContext } from '../../App';
import GameRequest from '../../components/Game/Request';

const context = createContext();

const Lobby = (props) => {
  const { user, } = useContext(globalContext);
  const [selected, view] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const [friendshipStatus, setFrindshipStatus] = useState({});
  const [friends, setFriends] = useState([]);
  const [gamerequest, setGamerequest] = useState(null);
  const [message, setMessage] = useState(null);

  // handle websocket + friends 
  useEffect(() => {
    if (user) {
      request('/friend/'+user._id).then((res) => {
        if (res.error) console.error('cant do this');
        else {
          setFriends(res);

          if (websocket) {
            for (let friend of res)
            {
              if (friend.status === 'offline')
              {
                websocket.send(JSON.stringify({type: 'online', id: user._id}));
              }
            }
          }
        }
      }).catch(console.error);

      if (!websocket)
      {
        const _websocket = new window.WebSocket('ws://localhost:8080');
        _websocket.onopen = () => {
          console.log('websocket successfully connected');
        };
        _websocket.onmessage = (message) => {
          const data = JSON.parse(message.data);
  
          switch (data.type) {
            case 'online': 
              _websocket.send(JSON.stringify({type: 'online-ACK', id: user._id }));
            case 'online-ACK':
              updateFriendStatus(data.id, 'online');
              break;
            case 'in-game':
              updateFriendStatus(data.id, 'in-game');
              break;
            case 'offline':
              updateFriendStatus(data.id, 'offline')
              break;
            case 'accept-game': // other person accepted : we are host
              const _peer = new Peer();
              const con = _peer.connect(data.id);
              con.on('data', function(data){console.log(data)});
              con.send('HELLO WORLD');
              break;
            case 'decline-game':
              setMessage('Player declined your request for a game');
              break;
            case 'game-request':
              setGamerequest(data.id);
              break;
          }
          console.log('incomming message', data);
        }
        setWebsocket(_websocket);
      } 
    }
  }, [user, websocket]);

  const updateFriendStatus = (id, status) => {
    const updated = {...friendshipStatus};

    updated[id] = status;
    setFrindshipStatus(updated);
  }

  const provides = {
    friends,
    setFriends,
    websocket,
    message, 
    setMessage,
    view,
    selected,
    gamerequest,
    setGamerequest,
    openSearch,
    friendshipStatus,
    setOpenSearch,
  };

  return (
    <context.Provider value={provides}>
      <div className="grid">
        <FirendList context={context}/>
        <FirendInfo context={context}/>
      </div>

      <SearchFriend context={context}/>
      <GameRequest context={context}/>

      <Dimmer active={!!message} onClickOutside={() => setMessage(null)} page>
        <Header as='h2' icon inverted>
          <Icon name="exclamation"/>
          {message}
        </Header>
      </Dimmer>
    </context.Provider>
  )
}

export default Lobby;