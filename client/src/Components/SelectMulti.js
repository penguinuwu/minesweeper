import React from 'react';
import SelectCard from './SelectCard';

function SelectMulti(props) {
  // todo: coming soon!
  let content = (
    <button
      className='btn btn-info btn-lg fs-1'
      onClick={props.playMulti}
      disabled={true}
    >
      Multiplayer{' '}
      <sup>
        <span className='badge bg-danger fs-6'>coming soon!</span>
      </sup>
    </button>
  );

  return (
    <div className='col-12 col-lg-6 pt-2 pt-lg-0 ps-lg-2'>
      <SelectCard
        img={
          'https://media.discordapp.net/attachments/493210597954158604/797507754143121440/20201231_022549.jpg'
        }
        alt={'Multiplayer'}
        content={content}
      />
    </div>
  );
}

export default SelectMulti;
