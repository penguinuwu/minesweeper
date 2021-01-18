import React, { useState, useContext, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Logout() {
  const [result, setResult] = useState(null);
  const { user, setUser } = useContext(UserContext);

  // function renderRedirect() {
  //   return <Redirect to='/' />;
  // }

  function renderLogoutMsg(response) {
    if (!response) response = 'Error: cannot logout user.';
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <div className='card p-4 text-light bg-dark rw-30'>
          <div className='card-body text-center fs-2 px-3'>{response}</div>
          <div className='card-footer text-center'>
            <a className='btn btn-info me-1' href='/home'>
              Home <i className='fas fa-home fa-fw'></i>
            </a>
            <a className='btn btn-info ms-1' href='/login'>
              Login <i className='fas fa-sign-in-alt fa-fw'></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  async function requestLogout() {
    setUser(false);
    localStorage.removeItem('username');
    try {
      // do not request logout if the user is already logged out
      if (!user && !localStorage.getItem('username'))
        return setResult(renderLogoutMsg('You are not logged in!'));

      // send post request
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/logout`,
        withCredentials: true
      });

      // success
      return setResult(renderLogoutMsg('Logout successful!'));
    } catch (err) {
      // logout fail
      if (err.response && err.response.data) {
        return setResult(renderLogoutMsg(err.response.data));
      } else {
        return setResult(renderLogoutMsg('Error: cannot logout.'));
      }
    }
  }

  function useMountEffect(func) {
    // this effect will only be used on mount
    // so its dependencies must be empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(func, []);
  }

  useMountEffect(requestLogout);

  return result;
}

export default Logout;
