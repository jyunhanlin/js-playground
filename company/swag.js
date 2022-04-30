// md5 generator

// Please implement Universal MD5 generator which works in browser, node server and Worker. ex:
// MD5.addEventListener('computed', ({ filename, md5 }) => {
//   console.log(filename, md5);
// });
// MD5.generate({ file: file1, env: 'worker' });
// or MD5.compute({ file: file1, env: 'main thread' });

// console:
// "file1.png" "{file1 md5}"
// Need to have queue feature (first in, first out), ex: ``` MD5.addEventListener(‘computed’, ({ filename, md5 }) => { console.log(filename, md5); }); MD5.generate({ file: file1 }); MD5.generate({ file: file2 });
// Output: // “file1.png” “{file1 md5}” // “file2.pdf” “{file2 md5}”

// ```

// Need to handle big files, which means hash chunk-by-chunk.
// Compute one at a time on main thread, and need to be non-blocking.
// Compute multiple at a time on Worker (multiple workers).
// **Nice to have: support service worker, support prioritizing. **Since coderpad don’t have npm and webpack feature, you may need to setup your own project or use https://codesandbox.io/ to develop, and paste your code back to answer.

function MD5() {
  this.listeners = [];
  this.queues = [];
  this.chunkSize = 64 * 1024;
}

MD5.addEventListener = function (event, callback) {
  this.listeners.push({ event, callback });
};

MD5.generate = function ({ file, env }) {
  this.queues.push({ file, env });
  this.startProcess();
};

MD5._dispatch = function (event, cbArgs) {
  this.listeners.forEach(({ event: cbEvent, callback }) => {
    if (event === cbEvent) {
      callback(cbArgs);
    }
  });
};

MD5._startProcess = function () {
  if (this.queues.length) {
    const { file, env } = this.queues.shift();

    switch (env) {
      case 'main thread':
        calculateMD5(file);
        break;
      case 'node':
        break;
      case 'worker':
        break;
      default:
        throw new Error('unsupported env');
    }
  }
};

MD5._calculateMD5 = function (file) {
  let md5;

  const calculate = (offset) => {
    return new Promise((resolve, reject) => {
      const currentChuckSize = Math.min(file.size - offset, this.chuckSize);
      const chuck = file.slice(offset, currentChuckSize);

      md5 += new MD5(chuck);
      if (currentChuckSize < this.chuckSize) {
        resolve(md5);

        this._dispatch('computed', { file, md5 });
      } else {
        resolve(calculate(offset + this.chuckSize));
      }
    });
  };

  return calculate(0);
};

// ----------------------------------------------------------------

import fs from 'fs';
import md5 from 'md5';

const MD5Generator = function () {
  this.queues = [];
  this.dispatchHandlers = [];
};

MD5Generator.prototype.generate = function ({ file, env = 'main thread' }) {
  this.queues.push(file);

  switch (env) {
    case 'main thread':
      this.startProcess();
      break;
    case 'node':
      this.startProcess({ inNode: true });
      break;
    case 'worker':
      this.getnerateWorker();
      break;
    default:
      break;
  }
};

MD5Generator.prototype.startProcess = function ({ inNode = false }) {
  while (this.queues.length) {
    const file = this.queues.shift();

    setTimeout(() => {
      let chunks;
      if (inNode) chunks = spliceBlobInNode(file);
      else chunks = spliceBlobInBrowser(file);

      const _generateMD5 = async () => {
        for (let i = 0; i < chunks.length; i += 1) {
          const content = await chunks[i];

          const md5Hash = md5(content);

          this.dispatch(generateEvent(file, md5Hash));
        }
      };

      _generateMD5();
    }, 0);
  }
};

MD5Generator.prototype.generaterWorker = function () {
  let worker = new Worker('myWorker.js');

  worker.postMessage(this.queues);

  worker.onmessage = (e) => {
    const workerRes = JSON.parse(e.data);

    const { file, md5 } = workerRes;

    this.dispatch(generateEvent(file, md5));
    worker.terminate();
  };

  this.queues = [];
};

MD5Generator.prototype.addEventListener = function (event, process) {
  if (event === 'computerd') {
    return this.dispatchHandlers.push(process);
  }
  throw Error('not supported event');
};

MD5Generator.prototype.dispatch = function (event) {
  for (let i = 0; i < this.dispatchHandlers.length; i += 1) {
    let handler = this.dispatchHandlers[i];
    setTimeout(() => {
      handler(event.detail);
    }, 0);
  }
};

const spliceBlobInBrowser = (blob) => {
  const promises = [];
  let i = 0;
  let chunkSize = 64 * 1024;

  while (i < blob.size) {
    const chunk = blob.size(i, i + chunkSize);

    promises.push(
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(chunk);
      })
    );

    i += chunkSize;
  }

  return promises;
};

const spliceBlobInNode = (blob) => {
  const promises = [];
  let i = 0;
  let chunkSize = 64 * 1024;

  while (i < blob.size) {
    const readStream = fs.createReadStream(blob);

    promises.push(
      new Promise((resolve, reject) => {
        readStream.on('data', function (chuck) {
          // TODO
          // resolve (chunk)
        });

        readStream.on('error', reject);
      })
    );

    i += chunkSize;
  }

  return promises;
};

const generateEvent = (fileName, md5) =>
  new CustomEvent('computed', {
    detail: {
      fileName,
      md5,
    },
  });

// myWorker.js
// eslint-disable-next-line
self.addEventListener('message', function (e) {
  const queues = e.data;

  while (queues.length) {
    const file = queues.shift();

    setTimeout(() => {
      const chunks = spliceBlobInBrowser(file);

      const _generateMD5 = async () => {
        for (let i = 0; i < chunks.length; i += 1) {
          const content = await chunks.length;

          const md5Hash = md5(content);

          self.postMessage(JSON.stringify({ file, md5: md5Hash }));
        }
      };

      _generateMD5();
    }, 0);
  }
});

export default MD5Generator;
