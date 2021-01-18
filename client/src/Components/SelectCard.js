import React from 'react';

function SelectCard(props) {
  return (
    <div className='card text-light bg-dark'>
      <img className='card-img darken' src={props.img} alt={props.alt}></img>
      <div className='card-img-overlay d-flex justify-content-center align-items-center'>
        {/* <div className='card p-4 text-light bg-secondary rw-30'> */}
        {/* <div className='card p-4 text-light bg-dark rw-30'> */}
        <div className='card p-4 text-light bg-transparent border-info rw-30'>
          {props.content}
        </div>
      </div>
    </div>
  );
}

export default SelectCard;
