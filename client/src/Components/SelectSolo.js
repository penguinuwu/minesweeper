import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../Redux/Selectors';
import SelectCard from './SelectCard';
import StatusAlert from './StatusAlert';

function SelectSolo(props) {
  const [shape, setShape] = useState('square');
  const [diff, setDiff] = useState('easy');
  const [height, setHeight] = useState('0');
  const [width, setWidth] = useState('0');
  const [bombCount, setBombCount] = useState('0');
  const [status, setStatus] = useState(false);
  const user = props.username;

  async function generateGame(type) {
    try {
      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/play/${type}`,
        data: {
          shape: shape,
          difficulty: diff,
          height: height,
          width: width,
          bombCount: bombCount
        },
        withCredentials: true
      });

      // create game success
      props.setLobbyID(res.data.lobbyID);
    } catch (err) {
      if (err.response && err.response.data) {
        // authorization fail
        setStatus(err.response.data);
      } else {
        // server error
        setStatus('Error: cannot create game.');
      }
    }
  }

  function renderReminder() {
    if (user) {
      return <span className='m-0'>You can continue past games below!</span>;
    } else {
      return (
        <span className='m-0'>
          Without an account, your games will not be saved!{' '}
          <a className='text-info' href='/register'>
            Register here!
          </a>
        </span>
      );
    }
  }

  let content = null;
  let customForm = null;

  if (!props.solo || props.multi) {
    // if user has not selected solo, or has selected multi
    // then display big play button
    content = (
      <button className='btn btn-info btn-lg fs-1' onClick={props.playSolo}>
        Play Solo
      </button>
    );
  } else {
    // display custom game options
    if (diff === 'custom') {
      customForm = (
        <React.Fragment>
          {/* height */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-arrows-alt-v fa-fw'></i>
            </span>
            <input
              type='number'
              className='form-control'
              min='2'
              max='50'
              onChange={(e) => setHeight(e.target.value)}
              placeholder='Height'
            ></input>
          </div>
          {/* width */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-arrows-alt-h fa-fw'></i>
            </span>
            <input
              type='number'
              className='form-control'
              min='2'
              max='50'
              onChange={(e) => setWidth(e.target.value)}
              placeholder='Width'
            ></input>
          </div>
          {/* bomb count */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-bomb fa-fw'></i>
            </span>
            <input
              type='number'
              className='form-control'
              min='1'
              max='2497'
              onChange={(e) => setBombCount(e.target.value)}
              placeholder='Amount of Bombs'
            ></input>
          </div>
        </React.Fragment>
      );
    }

    content = (
      <React.Fragment>
        <h2 className='card-header bg-transparent border-info'>Play Solo</h2>
        <div className='card-body bg-transparent border-info text-center px-3 my-1'>
          {/* shape */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-shapes fa-fw'></i>
            </span>
            <select
              className='form-select'
              value={shape}
              onChange={(e) => setShape(e.target.value)}
            >
              <option value='square'>Square</option>
            </select>
          </div>

          {/* difficulty */}
          <div className='btn-group mb-2' role='group'>
            <input
              type='radio'
              className='btn-check'
              id='easy'
              name='easy'
              onChange={(e) => setDiff(e.target.name)}
              checked={diff === 'easy'}
            />
            <label className='btn btn-outline-info' htmlFor='easy'>
              Easy
            </label>

            <input
              type='radio'
              className='btn-check'
              id='intermediate'
              name='intermediate'
              onChange={(e) => setDiff(e.target.name)}
              checked={diff === 'intermediate'}
            />
            <label className='btn btn-outline-info' htmlFor='intermediate'>
              Normal
            </label>

            <input
              type='radio'
              className='btn-check'
              id='expert'
              name='expert'
              onChange={(e) => setDiff(e.target.name)}
              checked={diff === 'expert'}
            />
            <label className='btn btn-outline-info' htmlFor='expert'>
              Hard
            </label>

            <input
              type='radio'
              className='btn-check'
              id='custom'
              name='custom'
              onChange={(e) => setDiff(e.target.name)}
              checked={diff === 'custom'}
            />
            <label className='btn btn-outline-info' htmlFor='custom'>
              Custom
            </label>
          </div>
          {customForm}
          {/* submit button */}
          <div className='mt-2'>
            <button
              className='btn btn-info float-end'
              onClick={() => generateGame('solo')}
            >
              Play <i className='fas fa-sign-in-alt fa-fw'></i>
            </button>
          </div>
        </div>
        <div className='card-footer bg-transparent border-info text-center'>
          {/* possible alerts */}
          <StatusAlert status={status} />

          {/* register reminder */}
          {renderReminder()}
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className='col-12 col-lg-6 pb-2 pb-lg-0 pe-lg-2'>
      <SelectCard
        img={
          'https://media.discordapp.net/attachments/493210597954158604/797507754143121440/20201231_022549.jpg'
        }
        alt={'Singleplayer'}
        content={content}
      />
    </div>
  );
}

const mapStateToProps = getUser;
export default connect(mapStateToProps)(SelectSolo);
