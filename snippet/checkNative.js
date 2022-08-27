!((global) => {
  const MSG = 'Watch out! something changed';
  const inBrowser = typeof window !== 'undefined';

  const {
    JSON: { parse, stringify },
    setTimeout,
    setInterval,
  } = global;

  // store original to _snapshot
  let _snapshots = {
    JSON: {
      parse,
      stringify,
    },
    setTimeout,
    setInterval,
  };
  if (inBrowser) {
    let {
      localStorage: { getItem, setItem },
      fetch,
    } = global;
    _snapshots.localStorage = { getItem, setItem };
    _snapshots.fetch = fetch;
  }

  // store original to _prototypes
  let _prototypes = {};
  const names = ['Promise', 'Array', 'Date', 'Object', 'Number', 'String'];
  names.forEach((name) => {
    let fns = Object.getOwnPropertyNames(global[name].prototype);
    fns.forEach((fn) => {
      _prototypes[`${name}.${fn}`] = global[name].prototype[fn];
    });
  });

  global.checkNative = function ({ reset = false }) {
    for (const prop in _snapshots) {
      if (_snapshots.hasOwnProperty(prop) && prop !== 'length') {
        let obj = _snapshots[prop];
        if (typeof obj === 'function') {
          const isEqual = _snapshots[prop] === global[prop];
          if (!isEqual) {
            console.log(`${prop}${MSG}`);
            if (reset) {
              global[prop] = _snapshots[prop];
            }
          }
        } else {
          for (const key in obj) {
            const isEqual = _snapshots[prop][key] === global[prop][key];
            if (!isEqual) {
              console.log(`${prop}.${key}${MSG}`);
              if (reset) {
                global[prop][key] = _snapshots[prop][key];
              }
            }
          }
        }
      }
    }

    names.forEach((name) => {
      let fns = Object.getOwnPropertyNames(global[name].prototype);
      fns.forEach((fn) => {
        const isEqual = global[name].prototype[fn] === _prototypes[`${name}.${fn}`];
        if (!isEqual) {
          console.log(`${name}.prototype.${fn}${MSG}`);
          if (reset) {
            global[name].prototype[fn] = _prototypes[`${name}.${fn}`];
          }
        }
      });
    });
  };
})((0, eval)('this'));

// (0, eval)(code)
// https://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript/9107367#9107367
//
// the Ecma spec considers a reference to eval to be a "direct eval call",
// but an expression that merely yields eval to be an indirect one
// -- and indirect eval calls are guaranteed to execute in global scope.
