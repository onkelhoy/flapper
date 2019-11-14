import React, {useRef, useEffect} from 'react';
import Player from './Player';
import Camera from './utils/camera';
import Rectangle from './utils/rectangle';
import Map from './utils/map';

window.GAME = {
  width: 0,
  height: 0,
  context: null,
};

const Game = (props) => {
  const ref = useRef();

  useEffect(() => {
    initGame(ref.current);
  }, [ref]);

  const player = new Player(2);
  const dimension = new Rectangle(0, 0, 10000, 1000);
  const cam = new Camera(
    dimension,
    new Rectangle(0, 0, GAME.width, GAME.height*2), 
  );
  const map = new Map(dimension);

  cam.follow(player);

  const initGame = (canvas) => {
    window.GAME.context = canvas.getContext('2d');
    window.GAME.width = canvas.width = window.innerWidth;
    window.GAME.height = canvas.height = window.innerHeight;

    load();
  }


  const load = async () => {
    await player.load();
    await map.load();
    render();
  }

  const render = () => {
    GAME.context.fillStyle = 'cornflowerblue';
    GAME.context.fillRect(0, 0, GAME.width, GAME.height);

    player.update(dimension);

    cam.preRender(GAME.context);
    map.render(GAME.context, player.rec);
    
    player.render(GAME.context);
    for (let i = 0; i<100; i++) {
      GAME.context.rect(100, i*100, 30, 30);
      GAME.context.fillStyle = 'black';
      GAME.context.fill();
    }

    cam.postRender(GAME.context);
    requestAnimationFrame(render);
  }

  const keyUp = (e) => {
    if (e.keyCode === 32)
    {
      // jump
      player.jump();
    }
  }


  return (
    <canvas tabIndex="1" onKeyUp={keyUp} ref={ref}></canvas>
  )
}

export default Game;