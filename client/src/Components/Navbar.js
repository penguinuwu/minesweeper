import React, { useContext } from 'react';
import UserContext from '../Contexts/UserContext';

function renderAuthenticate(user) {
  let username = localStorage.getItem('username');
  if (!username && user) username = user;

  // render login and register if user not logged in
  if (!username)
    return (
      <React.Fragment>
        <div className='nav-item'>
          <a className='nav-link' href='/register'>
            Register
          </a>
        </div>
        <div className='nav-item'>
          <a className='nav-link' href='/login'>
            Login
          </a>
        </div>
      </React.Fragment>
    );

  // render username and logout dropdown
  return (
    <div className='nav-item dropdown'>
      <div
        className='nav-link dropdown-toggle'
        id='userDropdown'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {username}
      </div>
      <div className='dropdown-menu dropdown-menu-right dropdown-menu-dark' aria-labelledby='userDropdown'>
        <a className='dropdown-item' href='/logout'>
          Logout <i className="fas fa-sign-out-alt fa-fw"></i>
        </a>
      </div>
    </div>
  );
}

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        {/* logo */}
        <a className='navbar-brand fs-2' href='/home'>
          Minesweeper
        </a>

        {/* expand navbar button */}
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* navbar items */}
        <div className='collapse navbar-collapse fs-4' id='navbarCollapse'>
          <div className='navbar-nav ms-auto'>
            <a className='nav-link' href='/play'>
              Play
            </a>
            {renderAuthenticate(user)}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
