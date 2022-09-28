function promiseWithAbortController({ signal }) {
  return new Promise((resolve, reject) => {
    signal?.throwIfAborted();

    setTimeout(() => {
      Math.random() > 0.5 ? resolve('ok') : reject(new Error('not good'));
    }, 1000);

    signal?.addEventListener('abort', () => reject(signal?.reason));
  });
}

const ac = new AbortController();
const { signal } = ac;

promiseWithAbortController({ signal }).then(
  (res) => console.log(res),
  (err) => console.warn(err)
);
setTimeout(() => {
  ac.abort();
}, 100);
