import React from 'react';
import Cell from '../Components/Cell';

function GameBoard(props) {
  let startButton = (
    <button className='btn btn-info btn-lg' onClick={props.startGame}>
      Start Game!
    </button>
  );
  let exitButton = (
    <button className='btn btn-info btn-lg' onClick={props.reset}>
      Exit game
    </button>
  );

  function renderCells() {
    // counter for array key
    let counter = 0;
    let cells = [];

    for (let r = 0; r < props.data.board.length; r++) {
      // temp array for button group
      let group = [];
      for (let c = 0; c < props.data.board[r].length; c++) {
        // create cell
        group.push(
          <Cell
            key={counter++}
            value={props.data.board[r][c]}
            // move function customized with row, col index
            move={(a) => props.makeMove(a, r, c)}
            // disabled if not my turn
            disabled={!props.data.myTurn}
          />
        );
      }
      // push button group
      cells.push(
        <div key={`group-${r}`} className='btn-group'>
          {group}
        </div>
      );
    }

    return (
      <div className='btn-group-vertical px-3 mx-auto game-stack'>{cells}</div>
    );
  }

  function renderBody() {
    let cells = renderCells();
    if (props.data.end) {
      return (
        <React.Fragment>
          {cells}
          <div className='rounded p-3 bg-dark game-stack z-index-0'>
            <p>{props.data.lives > 0 ? 'You won!' : 'You lost!'}</p>
            {exitButton}
          </div>
        </React.Fragment>
      );
    } else if (props.data.start) {
      // game has started
      return cells;
    } else {
      // render start game button
      return (
        <React.Fragment>
          {cells}
          <div className='rounded p-3 bg-dark game-stack z-index-0'>
            {startButton}
          </div>
        </React.Fragment>
      );
    }
  }

  return (
    <div className='card text-light bg-dark'>
      <h2 className='card-header'>Play</h2>
      <div className='card-body text-center px-0 overflow-auto d-grid place-items-center'>
        {renderBody()}
      </div>
    </div>
  );
}

export default GameBoard;
