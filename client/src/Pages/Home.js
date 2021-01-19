import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function verifySession(setUser) {
  // send post request
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/login`,
    data: {
      username: '',
      password: ''
    },
    withCredentials: true
  })
    .then((res) => setUser(res.data))
    .catch((e) => setUser(false));
};

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
    const text = 'Play Minesweeper';
    return (
      <a className='card text-center text-dark gradient mb-3' href='/play'>
        <div className='card-body py-5'>
          <div className='card-text py-5'>
            {/* hide on sm and bigger screens */}
            <p className='d-sm-none display-5'>{text}</p>

            {/* visible only on sm */}
            <p className='d-none d-sm-block d-md-none display-4'>{text}</p>

            {/* visible only on md */}
            <p className='d-none d-md-block d-lg-none display-3'>{text}</p>

            {/* visible only on lg */}
            <p className='d-none d-lg-block d-xl-none display-2'>{text}</p>

            {/* hide on screens smaller than lg */}
            <p className='d-none d-xl-block display-1'>{text}</p>
          </div>
        </div>
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
