import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Register() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [status, setStatus] = useState(null);

  async function requestRegister() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/register`,
        data: {
          username: username,
          password: password
        },
        withCredentials: true
      });
      setStatus(res.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setStatus(err.response.data);
      } else {
        setStatus('Error: cannot register user.');
      }
    }
  }

  // if user is not logged in
  // then return registration from
  if (!user) {
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
