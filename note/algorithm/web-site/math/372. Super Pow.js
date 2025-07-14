/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
var superPow = function (a, b) {
  const MOD = 1337;

  const myPow = (a, k) => {
    a %= MOD;

    let res = 1;

    for (let i = 0; i < k; i += 1) {
      res *= a;
      res %= MOD;
    }

    return res;
  };

  if (b.length === 0) return 1;

  const last = b.pop();

  const part1 = myPow(a, last);

  const part2 = myPow(superPow(a, b), 10);

  return (part1 * part2) % MOD;
};
