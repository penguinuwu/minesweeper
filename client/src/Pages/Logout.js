import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';

function Logout() {
  const [status, setStatus] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function requestLogout() {
      try {
        // do not request logout if the user is already logged out
        if (!user && !localStorage.getItem('username')) {
          setStatus('You are not logged in!');
          return;
        }

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
        setStatus('You have successfully logged out - see you next time!');
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
    requestLogout();
  }, [])

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}

export default Logout;
