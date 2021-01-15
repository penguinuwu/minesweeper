import React, { useContext } from 'react';
import UserContext from '../Contexts/UserContext';

function Home() {
  const { user } = useContext(UserContext);

  function getUsername() {
    if (user) return user;
    return localStorage.getItem('username');
  }

  function renderWelcome() {
    let username = getUsername();
    if (username) {
      return (
        <div className='card text-center text-light bg-dark'>
          <div className='card-body'>
            <p className='card-text display-3'>Welcome {username}!</p>
          </div>
        </div>
      );
    }
    return null;
  }

  function renderPlay() {
    const text = 'Play Minesweeper';
    return (
      <div className='card text-center text-dark gradient'>
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
      </div>
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
    if (getUsername()) {
      btns = (
        <a type='button' className='btn btn-info btn-lg mx-1' href='/logout'>
          Logout
        </a>
      );
    }
    return (
      <div className='card text-center text-light bg-dark'>
        <div className='card-body'>{btns}</div>
      </div>
    );
  }

  function renderDivRow(content) {
    if (!content) return null;
    return (
      <div className='row mx-auto mb-3'>
        {content}
      </div>
    );
  }

  return (
    <div className='col'>
      {renderDivRow(renderWelcome())}
      <a className='row mx-auto' href='/play'>
        {renderPlay()}
      </a>
      {renderDivRow(renderFunctions())}
    </div>
  );
}

export default Home;
