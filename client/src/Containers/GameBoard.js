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
    if (props.data.start) {
      // game has started
      return renderCells();
    } else {
      // render start game button
      return (
        <button className='btn btn-info' onClick={props.startGame}>
          Start Game!
        </button>
      );
    }
  }

  return (
    <div className='card text-light bg-dark'>
      <h2 className='card-header'>Play</h2>
      <div className='card-body text-center'>{renderBody()}</div>
      <div className='card-footer'></div>
    </div>
  );
}

export default GameBoard;
