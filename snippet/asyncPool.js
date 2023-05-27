async function asyncPool({ poolLimit, array, iteratorFn }) {
  const ret = [];
  const executing = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

const timeout = (i) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i)
  );

asyncPool({
  poolLimit: 2,
  array: [1000, 5000, 3000, 2000],
  iteratorFn: timeout,
}).then((res) => {
  console.log(res);
});
