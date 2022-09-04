// dedupe the same function
const jobQueue = new Set();
const p = Promise.resolve();

let isFlushing = false;

function flushJobWithDedupe() {
  if (isFlushing) return;
  isFlushing = true;

  p.then(() => {
    jobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
  });
}
