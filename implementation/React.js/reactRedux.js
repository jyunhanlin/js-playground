import { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

function myCreateStore(reducer, initState) {
  var state = initState;
  var listeners = [];
  function dispatch(action) {
    state = reducer(state, action);
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
    return action;
  }
  dispatch({
    type: '@@redux/INIT',
  });
  return {
    dispatch,
    subscribe(cb) {
      var i = listeners.length;
      listeners.push(cb);
      return function () {
        listeners.splice(i, 1);
      };
    },
    getState() {
      return state;
    },
  };
}

const store = myCreateStore(reducer, { name: 'test' });

function myConnect(mapToState) {
  return function (Component) {
    return function (props) {
      const [, setUpdateObject] = useState({});
      const state = store.getState();
      const effectState = mapToState(state);
      function checkForUpdates() {
        var newState = store.getState();
        if (newState != state) {
          var newEffectState = mapToState(newState);
          if (!shallowEqual(effectState, newEffectState)) {
            setUpdateObject({});
          }
        }
      }
      useLayoutEffect(() => {
        var unsubscribe = store.subscribe(checkForUpdates);
        return unsubscribe;
      }, [store]);
      return React.createElement(
        Component,
        Object.assign({}, props, effectState, { dispatch: store.dispatch })
      );
    };
  };
}

const Sub = myConnect((state) => state)((props) => {
  console.log('sub update...', props);
  // useLayoutEffect(() => {
  //  props.dispatch({ type: 123 })
  // }, [])
  return (
    <div
      onClick={() => {
        props.dispatch({ type: 123 });
      }}
    >
      hello, Sub! {props.age}
    </div>
  );
});

const Sub2 = myConnect((state) => ({ name: state.name }))((props) => {
  console.log('sub2 update...', props);
  return <div>hello, Sub2! {props.name}</div>;
});

function reducer(state, action) {
  return {
    ...state,
    age: 15 + Math.random(),
  };
}

const Body = (props, ref) => {
  return (
    <div>
      <Sub />
      <Sub2 />
    </div>
  );
};

ReactDOM.render(<Body />, document.getElementById('app'));

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true;
}
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
