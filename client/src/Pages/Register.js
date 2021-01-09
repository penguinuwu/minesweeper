import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);

  async function requestRegister() {
    try {
      // do not request register if the user is already logged in
      if (localStorage.getItem('username'))
        return;

      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/register`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });

      // success
      setStatus(res.data);

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
  if (!localStorage.getItem('username')) {
    return (
      <div>
        <h1>Register:</h1>
        <div>
          <label for='username'>Username:</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label for='password'>Password:</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button onClick={requestRegister}>Register</button>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div>
      <p>You are already logged in!</p>
    </div>
  );
}

export default Register;
