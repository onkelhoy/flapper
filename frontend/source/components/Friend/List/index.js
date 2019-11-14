import React, { useContext, } from 'react';
import { List, Button, Header, Image } from 'semantic-ui-react';
import './style.scss';
import { globalContext } from '../../../App';
import { request } from '../../../utils';

const {Item, Content} = List;
const FirendList = (props) => {
  const { user } = useContext(globalContext);
  const { view, friends, setFriends, websocket, setOpenSearch, friendshipStatus } = useContext(props.context);

  const accept = async (friendship) => {
    request('/friend/accept/'+friendship._id).then((res) => {
      if (res.error) console.error('oh wel..');
      else {
        const updatedFriends = [...friends];
        const t = updatedFriends.find(f => f._id === friendship._id);
        if (t) {
          t.status = 'offline';
          setFriends(updatedFriends);

          websocket.send(JSON.stringify({type: 'online', id: friendship._id}));
        }
      }
    })
  }
  const items = friends.map((friend, index) => {
    let text = ':('; //offline
    switch (friend.status) {
      case 'pending': 
        text = ':/';
        break;
      case 'requested': // game request
        text = ':O';
        break;
      case 'online': 
        text = ':D';
        break;
      case 'accept': // friend request
        text = ":)";
        break;
    }

    let status = friend.status;
    if (status === 'pending' && friend.creator !== user._id) 
    {
      status = <Button color="blue" size="mini" compact onClick={() => accept(friend)}>accept</Button>
    }

    const target = friend.friends.find(f => f._id !== user._id);
    
    friend.target = target;
    if (friendshipStatus[friend.target._id]) status = friendshipStatus[friend.target._id];

    return (
      <Item key={index}>
        <Content floated='right'>
          <span style={{marginRight: 10}}>{status}</span>
          
          <Button circular size="tiny" icon="paper plane" compact positive onClick={() => view(friend)}/>
        </Content>
        <Content>
          <Image src={`/content/airplane(${target.airplane}).svg`} avatar/>
          <span>{target.username}</span>
        </Content>
      </Item>
    )
  });

  return (
    <div className="friendList">
      <div className="body">

        <div className="header">
          <Header as="h2" textAlign="center">Friends</Header>
          <Button onClick={() => setOpenSearch(true)} className="add" icon="plus" color="yellow" circular/>
        </div>
        
        <List divided verticalAlign='middle'>
          {items}
        </List>

      </div>
    </div>
  )
}

export default FirendList;