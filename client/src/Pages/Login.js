import React, { useState, useContext } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';
import StatusAlert from '../Components/StatusAlert';

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);
  const { user, setUser } = useContext(UserContext);

  async function requestLogin() {
    try {
      // do not request login if the user is already logged in
      if (user) return;

      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });

      // authorization success
      setStatus('Login successful.');
      setUser(res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        // authorization fail
        setStatus(err.response.data);
      } else {
        // server error
        setStatus('Error: cannot authenticate user.');
      }
    }
  }

  // // if user is not logged in
  // // then return login from
  // if (!user) {
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='card p-4 text-light bg-dark rw-30'>
        <h2 className='card-header'>Login</h2>
        <div className='card-body text-center px-3 my-1'>
          {/* username */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-user fa-fw'></i>
            </span>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            ></input>
          </div>

          {/* password */}
          <div className='input-group mb-1'>
            <span className='input-group-text btn-info'>
              <i className='fas fa-key fa-fw'></i>
            </span>
            <input
              type='password'
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            ></input>
          </div>

          {/* submit button */}
          <div className='float-end'>
            <button className='btn btn-info' onClick={requestLogin}>
              Enter <i className='fas fa-sign-in-alt fa-fw'></i>
            </button>
          </div>
        </div>
        <div className='card-footer text-center'>
          {/* possible alerts */}
          <StatusAlert status={status} />

          {/* register reminder */}
          <span className='m-0'>
            Don't have an account?{' '}
            <a className='text-info' href='/register'>
              Register here!
            </a>
          </span>

          {/*
            TODO: forget password button
            <span className='m-0'>
              Forgot your login details?{' '}
              <a className='text-info' href='/register'>
                Click here!
              </a>
            </span>
            */}
        </div>
      </div>
    </div>
  );
  // }

  // return <Redirect to='/' />;
}

export default Login;
