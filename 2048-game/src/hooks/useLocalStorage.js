import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

function setLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function clearLocalStorage(key) {
  window.localStorage.removeItem(key);
}

function getLocalStorage(key) {
  let result;
  try {
    const item = window.localStorage.getItem(key);
    result = JSON.parse(item);
  } catch (error) {
    console.log(error);
  }
  return result;
}

export { useLocalStorage, getLocalStorage, setLocalStorage, clearLocalStorage };
