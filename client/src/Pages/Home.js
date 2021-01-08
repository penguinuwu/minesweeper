import React, { useContext } from 'react';
import UserContext from '../Contexts/UserContext';

function Home(params) {
  const { user } = useContext(UserContext);

  function renderUser() {
    if (user)
      return user;
    return 'you are not logged in - please log in!';
  }

  return (
    <div>
      <div>user: {renderUser}</div>
      <div><a href='/register'>register</a></div>
      <div><a href='/login'>login</a></div>
      <div><a href='/logout'>logout</a></div>
    </div>
  );
}

export default Home;
