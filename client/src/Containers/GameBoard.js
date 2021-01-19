import React from 'react';
import Cell from '../Components/Cell';

function GameBoard(props) {
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

    return <div className='btn-group-vertical'>{cells}</div>;
  }

  function renderBody() {
    let cells = renderCells();
    if (props.data.end) {
      return (
        <React.Fragment>
          <p>{props.data.lives > 0 ? 'You won!' : 'You lost!'}</p>
          <p>
            <button className='btn btn-info btn-lg' onClick={props.reset}>
              Exit game
            </button>
          </p>
          {cells}
        </React.Fragment>
      );
    } else if (props.data.start) {
      // game has started
      return cells;
    } else {
      // render start game button
      return (
        <React.Fragment>
          <p>
            <button className='btn btn-info btn-lg' onClick={props.startGame}>
              Start Game!
            </button>
          </p>
          {cells}
        </React.Fragment>
      );
    }
  }

  return (
    <div className='card text-light bg-dark'>
      <h2 className='card-header'>Play</h2>
      <div className='card-body text-center'>{renderBody()}</div>
    </div>
  );
}

export default GameBoard;
