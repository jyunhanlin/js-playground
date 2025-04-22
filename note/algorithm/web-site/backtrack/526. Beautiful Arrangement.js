/**
 * @param {number} n
 * @return {number}
 */
var countArrangement = function (n) {
  let res = 0;

  const used = new Array(n + 1).fill(false);

  const backtrack = (index) => {
    if (index > n) {
      res += 1;
      return;
    }

    for (let i = 1; i <= n; i += 1) {
      if (used[i]) continue;
      if (!(index % i === 0 || i % index === 0)) continue;

      used[i] = true;
      backtrack(index + 1);
      used[i] = false;
    }
  };

  backtrack(1);

  return res;
};
