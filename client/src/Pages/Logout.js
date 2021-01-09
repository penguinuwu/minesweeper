import React, { useState } from 'react';
import axios from 'axios';

function Logout() {
  const [status, setStatus] = useState(null);

  async function requestLogout() {
    try {
      // do not request logout if the user is already logged out
      if (!localStorage.getItem('username'))
        return;

      // send post request
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/logout`,
        withCredentials: true
      });

      // success
      if (res.data === 'Success.')
        localStorage.removeItem('username');
      setStatus(res.data);

    } catch (err) {
      if (err.response && err.response.data) {
        // logout fail
        setStatus(err.response.data);
      } else {
        // server error
        setStatus('Error: cannot logout user.');
      }
    }
  }

  // if user is logged in
  // then return logout button
  if (localStorage.getItem('username')) {
    return (
      <div>
        <button onClick={requestLogout}>Logout</button>
        <p>{status}</p>
      </div>
    );
  }

  // if the user just logged out, the status cannot be null,
  // so display success message
  if (status) {
    return (
      <div>
        <p>You have successfully logged out - see you next time!</p>
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
