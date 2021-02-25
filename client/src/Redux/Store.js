import { createStore } from 'redux';
import Reducer from './Reducer';

// https://stackoverflow.com/a/37690899
const persistedState = localStorage.getItem('minesweeper')
  ? JSON.parse(localStorage.getItem('minesweeper'))
  : {};

const Store = createStore(
  Reducer,
  persistedState
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// subscribe to localstorage
Store.subscribe(() => {
  localStorage.setItem('minesweeper', JSON.stringify(Store.getState()));
});

export default Store;
