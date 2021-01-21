import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import CatBackground from '../Images/CatBackground.png';
import PlayMinesweeper1 from '../Images/PlayMinesweeper1.png';

function verifySession(setUser) {
  // send post request
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/verify`,
    withCredentials: true
  })
    .then((res) => setUser(res.data))
    .catch((e) => setUser(false));
}

function Home() {
  const { user, setUser } = useContext(UserContext);

  verifySession(setUser);

  function renderWelcome() {
    if (user) {
      return (
        <div className='card text-center text-light bg-dark mb-3'>
          <div className='card-body'>
            <p className='card-text display-3'>Welcome {user}!</p>
          </div>
        </div>
      );
    }
    return null;
  }

  function renderPlay() {
    return (
      <a className='card text-center text-dark border-0 mb-3 overflow-hidden' href='/play'>
        <img
          className='card-img-top img-fluid'
          src={CatBackground}
          alt='Play Minesweeper'
        />
        <img
          className='card-img-top img-fluid position-absolute top-0 start-0 drop-in'
          src={PlayMinesweeper1}
          alt=''
        />
      </a>
    );
  }

  function renderFunctions() {
    let btns = (
      <React.Fragment>
        <a type='button' className='btn btn-info btn-lg mx-1' href='/register'>
          Register
        </a>
        <a type='button' className='btn btn-info btn-lg mx-1' href='/login'>
          Login
        </a>
      </React.Fragment>
    );
    if (user) {
      btns = (
        <a type='button' className='btn btn-info btn-lg mx-1' href='/logout'>
          Logout
        </a>
      );
    }
    return (
      <div className='card text-center text-light bg-dark mb-3'>
        <div className='card-body'>{btns}</div>
      </div>
    );
  }

  return (
    <div className='row'>
      <div className='col'>
        {renderWelcome()}
        {renderPlay()}
        {renderFunctions()}
      </div>
    </div>
  );
}

export default Home;
