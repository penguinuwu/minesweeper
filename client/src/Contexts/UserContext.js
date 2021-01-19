// https://stackoverflow.com/a/62505656
import React, { useState, useEffect, useMemo } from 'react';

function getLocalStorage(key, initialValue) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

function setLocalStorage(key, value) {
  try {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  } catch (e) {
    // todo:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

const UserContext = React.createContext(false);

function UserProvider(props) {
  const [user, setUser] = useState(() => getLocalStorage('username', false));
  // useMemo to look cool
  const value = useMemo(() => ({ user, setUser }), [user]);

  // update localStorage on user change
  useEffect(() => {
    setLocalStorage('username', user);
  }, [user]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export { UserProvider };

export default UserContext;
