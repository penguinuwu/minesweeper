import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);

  async function requestLogin() {
    try {
      // do not request login if the user is already logged in
      if (localStorage.getItem('username'))
        return;

      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/login`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });

      // authorization success
      if (res.data === 'Success.')
        localStorage.setItem('username', username);
      setStatus(res.data);

    } catch (err) {
      if (err.response && err.response.status === 403) {
        // authorization fail
        setStatus(err.response.data);
      } else {
        // server error
        setStatus('Error: cannot authenticate user.');
      }
    }
  }

  // if user is not logged in
  // then return login from
  if (!localStorage.getItem('username')) {
    return (
      <div>
        <h1>Login:</h1>
        <div>
          <label for='username'>username:</label>
          <input
            type='text'
            id='username'
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label for='password'>password:</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <button onClick={requestLogin}>Login</button>
        <p>{status}</p>
      </div>
    );
  }

  // if the user just logged in,
  // the status, username, and localStorage cannot be null,
  // so display success message
  if (status) {
    return (
      <div>
        <p>Welcome {username}, you have successfully logged in!</p>
      </div>
    );
  }

  // otherwise, the user has already logged in
  return (
    <div>
      <p>you are already logged in!</p>
    </div>
  );
}

export default Login;
