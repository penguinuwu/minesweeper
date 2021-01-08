import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Logout() {
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState(null);

  async function requestLogout() {
    try {
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/logout`,
        withCredentials: true
      });
      setStatus(res.data);
      // todo: handle success
      if (res.data === 'Success.') {
        setUser(null);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setStatus(err.response.data);
      } else {
        setStatus('Error: cannot logout user.');
      }
    }
  }

  // if user is not logged in
  // then return logout button
  if (user) {
    return (
      <div>
        <button onClick={requestLogout}>Logout</button>
        <p>{status}</p>
      </div>
    );
  }

  return (
    <div>
      <p>You are not logged in!</p>
    </div>
  );
}

export default Logout;
