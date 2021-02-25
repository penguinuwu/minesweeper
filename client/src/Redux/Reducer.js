import * as Actions from './ActionTypes';

const initialState = {
  username: null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // store username
    case Actions.LOGIN:
      return {
        ...state,
        username: action.payload.username
      };

    // remove username
    case Actions.LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default Reducer;
