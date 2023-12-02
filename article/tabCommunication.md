# Tab communication

## Broadcast Channel

```js
let broadcastChannel;

function createBroadcastChannel() {
  broadcastChannel = new BroadcastChannel('broadcast');
  broadcastChannel.onmessage = handleMessage;
}

function sendMessage(data) {
  broadcastChannel.postMessage(data);
}

function handleMessage(event) {
  console.log('handle event', event);
}

function resizeEventBind() {
  window.addEventListener('resize', () => {
    const pos = getCurPos();
    sendMessage(pos);
  });
}

function getCurPos() {
  const barHeight = window.outerHeight - window.innerHeight;
  const element = document.getElementById('j-main');
  const rect = element.getBoundingClientRect();

  const x = rect.left + window.screenX;
  const y = rect.top + window.screenY + barHeight;

  return [x, y];
}

createBroadcastChannel();
resizeEventBind();
```

## SharedWorkerAPI

```js
let worker;

function initWorker() {
  worker = new SharedWorker('/shared-worker.js', 'tabWorker');

  worker.port.onmessage = function (event) {
    handleMessage(event);
  };
}

function handleMessage(data) {
  // TODO: 处理接收到信息后的逻辑
}

function sendMessage(data) {
  worker.port.postMessage(data);
}

function resizeEventBind() {
  window.addEventListener('resize', () => {
    const pos = getCurPos();
    sendMessage(pos);
  });
}

function getCurPos() {
  const barHeight = window.outerHeight - window.innerHeight;
  const element = document.getElementById('j-main');
  const rect = element.getBoundingClientRect();

  const x = rect.left + window.screenX;
  const y = rect.top + window.screenY + barHeight;

  return [x, y];
}

initWorker();
resizeEventBind();
```

```js
//shared-worker.js
const connections = [];

onconnect = function (event) {
  var port = event.ports[0];
  connections.push(port);

  port.onmessage = function (event) {
    connections.forEach(function (conn) {
      if (conn !== port) {
        conn.postMessage(event.data);
      }
    });
  };

  port.start();
};
```

## localStorage/sessionStorage

```js
function initLocalStorage() {
  let tabArray = JSON.parse(localStorage.getItem('tab_array'));
  if (!tabArray) {
    const tabIndex = 1;
    id = tabIndex;
    localStorage.setItem('tab_array', JSON.stringify([tabIndex]));
  } else {
    const tabIndex = tabArray[tabArray.length - 1] + 1;
    id = tabIndex;
    const newTabArray = [...tabArray, tabIndex];
    localStorage.setItem('tab_array', JSON.stringify(newTabArray));
  }
}

function setLocalStorage(data) {
  localStorage.setItem(`tab_index_${id}`, JSON.stringify(data));
}

function handleMessage(data) {
  const rArray = JSON.parse(data);
  remoteX.value = rArray[0];
  remoteY.value = rArray[1];
}

function resizeEventBind() {
  window.addEventListener('resize', () => {
    const pos = getCurPos();
    setLocalStorage(pos);
  });

  window.addEventListener('storage', (event) => {
    console.log(event);
    handleMessage(event.newValue);
  });
}

function getCurPos() {
  const barHeight = window.outerHeight - window.innerHeight;
  const element = document.getElementById('j-main');
  const rect = element.getBoundingClientRect();

  const x = rect.left + window.screenX;
  const y = rect.top + window.screenY + barHeight;

  return [x, y];
}

initLocalStorage();
resizeEventBind();
```
