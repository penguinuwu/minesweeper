import React from 'react';
import StatusAlert from '../Components/StatusAlert';

function GameStats(props) {
  let stats = null;

  if (!props.data.start) {
    // game has not begun
    stats = (
      <div className='card-body text-center'>
        <button className='btn btn-info' onClick={props.startGame}>
          Start Game!
        </button>
      </div>
    );
  } else {
    stats = (
      <div className='card-body d-flex justify-content-center'>
        <ul className='list-style-none'>
          <li className='mb-1'>
            <i className='fas fa-clock fa-fw'></i> time: {props.time}
          </li>
          <li className='mb-1'>
            <i className='fas fa-bomb fa-fw'></i> bombs: {props.data.bombs}
          </li>
          <li className='mb-0'>
            <i className='fas fa-heart fa-fw'></i> lives: {props.data.lives}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className='card text-light bg-dark'>
      <h2 className='card-header'>Game Stats</h2>
      {stats}
      <div className='card-footer'>
        <div className='text-center'>
          <p>
            Left click to reveal <i className='fas fa-bomb text-info fa-fw'></i>
          </p>
          <p>
            Right click to flag <i className='fas fa-flag text-info fa-fw'></i>
          </p>
          <button className='btn btn-sm btn-danger mb-1' onClick={props.reset}>
            Exit Game
          </button>
        </div>
        <StatusAlert status={props.status} />
      </div>
    </div>
  );
}

export default GameStats;
