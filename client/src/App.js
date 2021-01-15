import React, { useState, useMemo } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import UserContext from './Contexts/UserContext';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Play from './Pages/Play';

function App() {
  const [user, setUser] = useState(false);
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      <Navbar />
      <div className='container-fluid p-3'>
        <BrowserRouter>
          <Switch>
            <Redirect exact from='/' to='/home' />
            <Route exact path='/home' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />
            <Route exact path='/play' component={Play} />
          </Switch>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
