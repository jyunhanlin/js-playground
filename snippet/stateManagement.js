// refer to: https://judehunter.dev/blog/how-to-write-your-own-state-management-library
// import { useState, useEffect } from 'react';

const createStore = (initialState, actions) => {
  let state = initialState;

  const subscribers = [];

  const subscribe = (subscriber) => {
    subscribers.push(subscriber);

    return () => subscribers.splice(subscribers.indexOf(subscriber), 1);
  };

  const notify = (newState) => {
    for (const subscriber of subscribers) {
      subscriber(newState);
    }

    state = newState;
  };

  const actualActions = actions((setStateAction) => {
    const newVal = typeof setStateAction === 'function' ? setStateAction(state) : setStateAction;

    notify({ ...state, ...newVal });
  });

  return { state, subscribe, ...actualActions };
};

const useSelector = (store, selector) => {
  const [selectedValue, setSelectedValue] = useState(selector(store.state));

  useEffect(() => {
    return store.subscribe((newState) => {
      setSelectedValue(selector(newState));
    });
  }, []);

  return selectedValue;
};
