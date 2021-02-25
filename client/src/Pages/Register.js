import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../Redux/Selectors';
import StatusAlert from '../Components/StatusAlert';

function Register(props) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);
  const user = props.username;

  async function requestRegister() {
    try {
      // do not request register if the user is already logged in
      if (user) return;

      // send post request
      await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/register`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });

      // success
      setStatus('Registration successful!');
    } catch (err) {
      if (err.response && err.response.data) {
        // registration fail
        setStatus(err.response.data);
      } else {
        // server error
        setStatus('Error: cannot register user.');
      }
    }
  }

  // if user is not logged in
  // then return registration from
  if (!user) {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <div className='card p-4 text-light bg-dark rw-30'>
          <h2 className='card-header'>Register</h2>
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
              <button className='btn btn-info' onClick={requestRegister}>
                Enter <i className='fas fa-sign-in-alt fa-fw'></i>
              </button>
            </div>
          </div>
          <div className='card-footer text-center'>
            {/* possible alerts */}
            <StatusAlert status={status} />

            {/* login reminder */}
            <span className='m-0'>
              Have an account?{' '}
              <a className='text-info' href='/login'>
                Login here!
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <Redirect to='/' />;
}

const mapStateToProps = getUser;
export default connect(mapStateToProps)(Register);
