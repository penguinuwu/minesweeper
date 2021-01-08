import React from 'react';

function Home(params) {
  function renderUser() {
    let user = localStorage.getItem('username');
    if (user) return `hello ${user}!`;
    return 'you are not logged in - please log in!';
  }

  return (
    <div>
      <div>{renderUser()}</div>
      <div><a href='/register'>register</a></div>
      <div><a href='/login'>login</a></div>
      <div><a href='/logout'>logout</a></div>
    </div>
  );
}

export default Home;
