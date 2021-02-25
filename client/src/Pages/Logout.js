import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../Redux/Selectors';
import { logout } from '../Redux/Action';

function renderLogoutMsg(response) {
  if (!response) response = 'Error: cannot logout user.';
  return (
    <div className='d-flex align-items-center justify-content-center'>
      <div className='card p-4 text-light bg-dark rw-30'>
        <div className='card-body text-center fs-2 px-3'>{response}</div>
        <div className='card-footer text-center'>
          <a className='btn btn-info me-1' href='/home'>
            Home <i className='fas fa-home fa-fw'></i>
          </a>
          <a className='btn btn-info ms-1' href='/login'>
            Login <i className='fas fa-sign-in-alt fa-fw'></i>
          </a>
        </div>
      </div>
    </div>
  );
}

function Logout(props) {
  const [result, setResult] = useState(null);

  // useEffect as componentDidMount
  useEffect(() => {
    async function requestLogout() {
      try {
        // do not request logout if the user is already logged out
        if (!props.username) setResult('You are not logged in!');
        // send post request
        await axios({
          method: 'post',
          url: `${process.env.REACT_APP_API_URL}/logout`,
          withCredentials: true
        });
        // success
        setResult('Logout successful!');
      } catch (err) {
        // logout fail
        if (err.response && err.response.data) {
          setResult(err.response.data);
        } else {
          setResult('Error: cannot logout.');
        }
      }
    }
    props.logout();
    requestLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return renderLogoutMsg(result);
}

const mapStateToProps = getUser;
const mapDispatchToProps = { logout };
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
