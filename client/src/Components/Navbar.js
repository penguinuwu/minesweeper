import React, { useContext } from 'react';
import UserContext from '../Contexts/UserContext';

function renderAuthenticate(user) {
  // render login and register if user not logged in
  if (!user)
    return (
      <React.Fragment>
        <div className='nav-item'>
          <a className='nav-link ps-lg-3' href='/register'>
            <i className='fas fa-user-plus fa-fw'></i> Register
          </a>
        </div>
        <div className='nav-item'>
          <a className='nav-link ps-lg-3' href='/login'>
            <i className='fas fa-sign-in-alt fa-fw'></i> Login
          </a>
        </div>
      </React.Fragment>
    );

  // render username and logout dropdown
  return (
    <div className='nav-item dropdown'>
      <div
        className='nav-link ps-lg-3 dropdown-toggle'
        id='userDropdown'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <i className='fas fa-user fa-fw'></i> {user}
      </div>
      <div
        className='dropdown-menu dropdown-menu-end dropdown-menu-dark'
        aria-labelledby='userDropdown'
      >
        <a className='dropdown-item' href='/logout'>
          <i className='fas fa-sign-out-alt fa-fw'></i> Logout
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
          <sup>
            <span className='badge bg-danger fs-6'>Beta</span>
          </sup>
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
            <div className='nav-item'>
              <a className='nav-link ps-lg-3' href='/play'>
                <i className='fas fa-flag fa-fw'></i> Play
              </a>
            </div>
            <div className='nav-item'>
              <a className='nav-link ps-lg-3' href='https://git.io/JtqBk'>
                <i className='fab fa-github fa-fw'></i> Code
              </a>
            </div>
            {renderAuthenticate(user)}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
