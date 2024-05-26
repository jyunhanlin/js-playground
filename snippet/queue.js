// Reference: https://2ality.com/2024/05/proposal-promise-with-resolvers.html

class OneElementQueue {
  #promise = null;
  #resolve = null;
  constructor() {
    const { promise, resolve } = Promise.withResolvers();
    this.#promise = promise;
    this.#resolve = resolve;
  }
  get() {
    return this.#promise;
  }
  put(value) {
    this.#resolve(value);
  }
}
{
  // Putting before getting
  const queue = new OneElementQueue();
  queue.put('one');
  assert.equal(await queue.get(), 'one');
}
{
  // Getting before putting
  const queue = new OneElementQueue();
  setTimeout(
    // Runs after `await` pauses the current execution context
    () => queue.put('two'),
    0
  );
  assert.equal(await queue.get(), 'two');
}

class PromiseQueue {
  #frontPromise;
  #backResolve;
  constructor() {
    const { promise, resolve } = Promise.withResolvers();
    this.#frontPromise = promise;
    this.#backResolve = resolve;
  }
  put(value) {
    const { resolve, promise } = Promise.withResolvers();
    // By resolving, we add another (pending) element
    // to the end of the queue
    this.#backResolve({ value, promise });
    this.#backResolve = resolve;
  }
  get() {
    return this.#frontPromise.then((next) => {
      this.#frontPromise = next.promise;
      return next.value;
    });
  }
}

{
  // Putting before getting
  const queue = new PromiseQueue();
  queue.put('one');
  queue.put('two');

  assert.equal(await queue.get(), 'one');
  assert.equal(await queue.get(), 'two');
}
{
  // Getting before putting
  const queue = new PromiseQueue();
  setTimeout(
    // Runs after `await` pauses the current execution context
    () => {
      queue.put('one');
      queue.put('two');
    },
    0
  );
  assert.equal(await queue.get(), 'one');
  assert.equal(await queue.get(), 'two');
}

class AsyncIterQueue {
  #frontPromise;
  #backResolve;
  constructor() {
    const { promise, resolve } = Promise.withResolvers();
    this.#frontPromise = promise;
    this.#backResolve = resolve;
  }
  put(value) {
    if (this.#backResolve === null) {
      throw new Error('Queue is closed');
    }
    const { resolve, promise } = Promise.withResolvers();
    this.#backResolve({ done: false, value, promise });
    this.#backResolve = resolve;
  }
  close() {
    this.#backResolve({ done: true, value: undefined, promise: null });
    this.#backResolve = null;
  }
  next() {
    if (this.#frontPromise === null) {
      return Promise.resolve({ done: true });
    }
    return this.#frontPromise.then((next) => {
      this.#frontPromise = next.promise;
      return { value: next.value, done: next.done };
    });
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}

{
  // Putting before async iteration
  const queue = new AsyncIterQueue();
  queue.put('one');
  queue.put('two');
  queue.close();
  assert.deepEqual(await Array.fromAsync(queue), ['one', 'two']);
}
{
  // Async iteration before putting
  const queue = new AsyncIterQueue();
  setTimeout(
    // Runs after `await` pauses the current execution context
    () => {
      queue.put('one');
      queue.put('two');
      queue.close();
    },
    0
  );
  assert.deepEqual(await Array.fromAsync(queue), ['one', 'two']);
}
