import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Play from './Pages/Play';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
