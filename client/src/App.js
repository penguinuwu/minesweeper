import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Store from './Redux/Store';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Play from './Pages/Play';

function App() {
  return (
    <Provider store={Store}>
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
    </Provider>
  );
}

export default App;
