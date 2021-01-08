import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Login() {
  const { user, setUser } = useContext(UserContext);
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
      if (res.data === 'Success.')
        setUser(username);
      setStatus(res.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setStatus(err.response.data);
      } else {
        setStatus('Error: cannot authenticate user.');
      }
    }
  }

  // if user is not logged in
  // then return login from
  if (!user) {
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

  // if user just logged in
  // then display success message
  if (status === 'Success.') {
    return (
      <div>
        <p>{user} you have successfully logged in!</p>
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
