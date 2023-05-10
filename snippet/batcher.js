let executeCount = 0;
const fn = (nums) => {
  executeCount++;
  return nums.map((x) => x * 2);
};

const batcher = (f) => {
  const nums = [];

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(f(nums));
    }, 0);
  });

  return (arr) => {
    const start = nums.length;
    const end = start + arr.length;

    nums.push(...arr);

    return promise.then((r) => r.slice(start, end));
  };
};

const batchedFn = batcher(fn);

const main = async () => {
  const [r1, r2, r3] = await Promise.all([
    batchedFn([1, 2, 3]),
    batchedFn([4, 5]),
    batchedFn([7, 8, 9]),
  ]);

  console.log({ r1, r2, r3, executeCount });
  // { r1: [ 2, 4, 6 ], r2: [ 8, 10 ], r3: [ 14, 16, 18 ], executeCount: 1 }
};

main();
