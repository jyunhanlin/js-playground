// Uses setTimeout with Promise to create an arbitrary delay time
// In these examples, a 0 millisecond delay is
// an instantly resolving promise that we can jude status against
async function delay(milliseconds = 0, returnValue) {
  return new Promise((done) => setTimeout(() => done(returnValue), milliseconds));
}

// Promise.race in all of these functions uses delay of 0 to
// instantly resolve.  If the promise is resolved or rejected,
// returning that value will beat the setTimeout in the race

async function isResolved(promise) {
  return await Promise.race([
    delay(0, false),
    promise.then(
      () => true,
      () => false
    ),
  ]);
}

async function isRejected(promise) {
  return await Promise.race([
    delay(0, false),
    promise.then(
      () => false,
      () => true
    ),
  ]);
}

async function isFinished(promise) {
  return await Promise.race([
    delay(0, false),
    promise.then(
      () => true,
      () => true
    ),
  ]);
}

// Testing isResolved
await isResolved(new Promise((resolve) => resolve())); // true
await isResolved(new Promise((_, reject) => reject())); // false

// Testing isRejected
await isRejected(new Promise((_, reject) => reject())); // true

// We done yet?
await isFinished(new Promise((resolve) => resolve())); // true
await isFinished(new Promise((_, reject) => reject())); // true
