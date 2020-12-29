import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Play from './Pages/Play';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/play" component={Play} />
      </Switch>
    </Router>
  );
}

export default App;
