import React, { useContext } from 'react';
import { Modal, Button, } from 'semantic-ui-react';
import { globalContext } from '../../'

const GameRequest = (props) => {
  const { context } = props;
  const { user } = useContext(globalContext);
  const { websocket, gamerequest, friends, setGamerequest, } = useContext(context);


  const decline = () => {
    websocket.send(JSON.stringify({type: 'decline-game', target: gamerequest}));
    setGamerequest(null);
  }

  const accept = () => {
    websocket.send(JSON.stringify({type: 'accept-game', target: gamerequest, id: user._id}));
    setGamerequest(null);

    // init peer as remote 

  }

  const friend = friends.find(f => f.target._id === gamerequest) || {};
  const {username} = friend.target || {}

  return (
    <Modal
      size="tiny"
      open={!!gamerequest} 
      onClose={() => setGamerequest(null)}>

      <Modal.Header>{username} wants to play</Modal.Header>
      <Modal.Actions>
        <Button compact negative onClick={decline}>
          Decline
        </Button>
        <Button compact positive onClick={accept}>
          Accept
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default GameRequest;