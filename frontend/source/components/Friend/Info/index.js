import React, {useContext}  from 'react';
import { Image, Header, Button } from 'semantic-ui-react';

import './style.scss';

const Info = (props) => {
  const { context } = props;

  const { selected, challenge } = useContext(context);

  const { wins, games, airplane = 1, name, yourscore, friendscore} = selected || {};
  return (
    <div className={`info ${selected !== null ? 'show' : 'hide'}`}>
      <Part name="Henry" className="you" airplane="1" wins={games - wins} games={games} bestscore={yourscore} />
      
      <Header className="vs" as='h1'>VS</Header>
      
      <Part name={name} className="friend" airplane={airplane} wins={wins} games={games} bestscore={friendscore} />

      <Button onClick={challenge} color="yellow" className="challange" icon="paper plane" content="Challenge" labelPosition="right" />
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