import React, { useContext, } from 'react';
import { List, Button, Header, Image } from 'semantic-ui-react';
import './style.scss';

const {Item, Content} = List;
const FirendList = (props) => {
  const {context} = props;
  const { view, friends, } = useContext(context);

  const accept = (friend) => {
    console.log('accept friend', friend);
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
    if (status === 'accept') 
    {
      status = <Button color="blue" size="mini" compact onClick={() => accept(friend)}>{status}</Button>
    }
    return (
      <Item key={index}>
        <Content floated='right'>
          <span style={{marginRight: 10}}>{status}</span>
          
          <Button circular size="tiny" icon="paper plane" compact positive onClick={() => view(friend)}/>
        </Content>
        <Content>
          <Image src={`/content/airplane(${friend.airplane}).svg`} avatar/>
          <span>{friend.name}</span>
        </Content>
      </Item>
    )
  });

  return (
    <div className="friendList">
      <div className="body">

        <div className="header">
          <Header as="h2" textAlign="center">Friends</Header>
          <Button className="add" icon="plus" color="yellow" circular/>
        </div>
        
        <List divided verticalAlign='middle'>
          {items}
        </List>

      </div>
    </div>
  )
}

export default FirendList;