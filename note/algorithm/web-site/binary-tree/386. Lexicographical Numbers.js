/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
  const res = [];

  const traverse = (val) => {
    if (val > n) return;
    res.push(val);

    for (let j = val * 10; j < val * 10 + 10; j += 1) {
      traverse(j);
    }
  };

  for (let i = 1; i < 10; i += 1) {
    traverse(i);
  }

  return res;
};
