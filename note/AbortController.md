# AbortController

## Basic usage

```js
const controller = new AbortController();

controller.signal;
controller.abort();

controller.signal.addEventListener('abort', () => {
  // callback after abort
});
```

## Usage

### event listener

```js
const controller = new AbortController();

window.addEventListener('resize', () => {}, { signal: controller.signal });

controller.abort();
```

```js
useEffect(() => {
  const controller = new AbortController();

  window.addEventListener('resize', handleResize, {
    signal: controller.signal,
  });
  window.addEventListener('hashchange', handleHashChange, {
    signal: controller.signal,
  });
  window.addEventListener('storage', handleStorageChange, {
    signal: controller.signal,
  });

  return () => {
    // remove all related event listeners
    controller.abort();
  };
}, []);
```

### fetch request

```js
const controller = new AbortController();

const response = fetch('/upload', {
  method: 'POST',
  body: file,

  signal: controller.signal,
});

controller.abort();
```

```js
// node.js
const http = require('http');
const { AbortController } = require('abort-controller');

const controller = new AbortController();

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/',
  method: 'GET',

  signal: controller.signal,
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  if (e.name === 'AbortError') {
    // cancel request
  } else {
    // other issues
  }
});

req.end();

setTimeout(() => {
  controller.abort();
}, 2000);
```

## Static methods

### AbortSignal.timeout

```js
fetch(url, {
  // cancel request when 5s timeout
  signal: AbortSignal.timeout(5000),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('response error');
    }
    return response.json();
  })
  .then((data) => {
    // success data
  })
  .catch((error) => {
    if (error.name === 'AbortError') {
      // cancel request
    } else {
      // other issues
    }
  });
```

### AbortSignal.any

```js
const publicController = new AbortController();
const internalController = new AbortController();

const socket = new WebSocket('wss://xxx.com');

socket.addEventListener('open', () => {
  socket.send('Hello WebSocket!');
});

function handleMessage(event) {}

socket.addEventListener('message', handleMessage, {
  signal: AbortSignal.any([publicController.signal, internalController.signal]),
});

document.getElementById('stopButton').addEventListener('click', () => {
  publicController.abort();
});

setTimeout(() => {
  internalController.abort();
}, 5000);
```

### Stop any logic

```js
function cancelablePromise(promise, options) {
  return new Promise((resolve, reject) => {
    options.signal?.addEventListener('abort', () => {
      reject();
    });

    return promise;
  });
}
```

### Stop error handling

```js
const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener('abort', () => {
  console.log(signal.reason);
});

try {
  const response = await fetch('URL', { signal });
  const data = await response.json();
} catch (error) {
  if (error.name === 'AbortError') {
    // cancel request
  } else {
    // other issues
  }
}

document.getElementById('cancelButton').addEventListener('click', () => {
  controller.abort('cancel request');
});
```
