import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Logout() {
  const [result, setResult] = useState(null);
  const { user, setUser } = useContext(UserContext);

  function renderLogoutSuccess() {
    return <Redirect to='/' />;
  }

  function renderLogoutFail(response) {
    if (!response) response = 'Error: cannot logout user.';
    return (
      <div className='d-flex my-2 align-items-center justify-content-center vertical-center gradient'>
        <div className='card p-4 text-light bg-dark rw-30'>
          <div className='class-body text-center fs-2 px-3'>
            {response}
            <a className='btn btn-info' href='/login'>
              Login <i class='fas fa-sign-in-alt fa-fw'></i>
            </a>
          </div>
        </div>
      </div>
    );
  }

  async function requestLogout() {
    try {
      // do not request logout if the user is already logged out
      if (!user && !localStorage.getItem('username'))
        return setResult(renderLogoutFail('You are not logged in!'));

      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/logout`,
        withCredentials: true
      });

      // success
      if (res.data === 'Success.') {
        localStorage.removeItem('username');
        setUser(false);
      }
      return setResult(renderLogoutSuccess());

    } catch (err) {
      // logout fail
      return setResult(renderLogoutFail(err.response.data));
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
