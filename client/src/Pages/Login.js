import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Login() {
  const context = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);

  async function requestLogin() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/login`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });
      setStatus(res.data);
      // todo: handle success
      if (res.data === 'Success.') context.setUser(username);
    } catch (err) {
      setStatus('Error: cannot authenticate user.');
    }
  }

  // if user is not logged in
  // then return login from
  if (!context.user) {
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

  return (
    <div>
      <p>you are already logged in!</p>
    </div>
  );
}

export default Login;
