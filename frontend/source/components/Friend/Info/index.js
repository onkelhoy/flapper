import React, {useContext}  from 'react';
import { Image, Header, Button } from 'semantic-ui-react';

import './style.scss';
import { globalContext } from '../../../App';

const Info = (props) => {
  const { context } = props;
  const { user, } = useContext(globalContext);
  const { selected, challenge } = useContext(context);

  const { status, wins, games, target = {}, yourscore, friendscore, creator} = selected || {};
  const { username, airplane = 1 } = target;

  const _wins = {
    you: wins,
    friend: wins,
  };

  if (!user) return null;

  if (creator === user._id)
  {
    _wins.friend = games - wins;
  }
  else 
  {
    _wins.you = games - wins;
  }
  return (
    <div className={`info ${selected !== null ? 'show' : 'hide'}`}>
      <Part name={user.username} className="you" airplane={user.airplane} wins={_wins.you} games={games} bestscore={yourscore} />
      
      <Header className="vs" as='h1'>VS</Header>
      
      <Part name={username} className="friend" airplane={airplane} wins={_wins.friend} games={games} bestscore={friendscore} />

      <Button disabled={status !== 'online'} onClick={challenge} color="yellow" className="challange" icon="paper plane" content="Challenge" labelPosition="right" />
    </div>
  );
}

const Part = (props) => {
  const { className, airplane, name, wins, games, bestscore } = props;

  return (
    <div className={"part " + className}>
      <Image src={`/content/airplane(${airplane}).svg`} size='medium' circular />

      <Header as='h2'>{name}</Header>
      <Header as='h3' className="best-score">
        BEST SCORE: {bestscore}p
      </Header>

      <Header as='h3' className="wins">
        WINS: {wins + "/" + games}
      </Header>
    </div>
  )
}

export default Info;