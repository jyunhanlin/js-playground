// used a generator to build a replenishable queue.


export function buildQueue(initial = []) {
  let queue = [...initial];
  let resolve = () => {};

  async function* go() {
    while (true) {
      const promise = new Promise((res) => (resolve = res));

      if (!queue.length) {
        await promise;
      }

      const next = queue.shift();
      if (next === undefined) continue;
      yield next;
    }
  }

  function push(items) {
    queue.push(...items);
    resolve();
  }

  return {
    go,
    push,
    get queue() {
      return queue;
    },
  };
}
