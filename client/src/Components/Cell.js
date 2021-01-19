import React from 'react';

function Cell(props) {
  const RENDER_ENCODER = {
    0: <span className='fa-stack-2x text-light fa-fw'></span>,
    1: <span className='fa-stack-2x text-light fa-fw'>1</span>,
    2: <span className='fa-stack-2x text-light fa-fw'>2</span>,
    3: <span className='fa-stack-2x text-light fa-fw'>3</span>,
    4: <span className='fa-stack-2x text-light fa-fw'>4</span>,
    5: <span className='fa-stack-2x text-light fa-fw'>5</span>,
    6: <span className='fa-stack-2x text-light fa-fw'>6</span>,
    7: <span className='fa-stack-2x text-light fa-fw'>7</span>,
    8: <span className='fa-stack-2x text-light fa-fw'>8</span>,
    9: <span className='fa-stack-2x text-light fa-fw'>9</span>,
    x: <span className='fas fa-bomb fa-stack-2x text-info fa-fw'></span>,
    '!': <span className='fas fa-flag fa-stack-2x text-info fa-fw'></span>,
    '?': <span className='far fa-square fa-stack-2x text-light fa-fw'></span>
  };

  function preventDefault(e) {
    e.preventDefault();
  }

  function handleClick(e) {
    preventDefault(e);
    if (e.buttons === 1) {
      // left click
      props.move('reveal');
    } else if (e.buttons === 2) {
      // right click
      props.move('flag');
    }
  }

  return (
    <button
      type='button'
      className='btn btn-sm btn-secondary'
      onContextMenu={preventDefault}
      onMouseDown={handleClick}
      disabled={props.disabled}
    >
      <span className='fa-stack fa-1x fa-fw'>
        {RENDER_ENCODER[props.value]}
      </span>
    </button>
  );
}

export default Cell;
