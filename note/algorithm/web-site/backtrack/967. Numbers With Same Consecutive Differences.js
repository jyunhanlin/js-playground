/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
var numsSameConsecDiff = function (n, k) {
  const res = [];
  let track = 0;

  const backtrack = (pos) => {
    if (pos === n) {
      res.push(track);
      return;
    }

    for (let i = 0; i < 10; i += 1) {
      if (pos === 0 && i === 0) continue;
      if (pos > 0 && Math.abs(i - (track % 10)) !== k) continue;
      track = 10 * track + i;
      backtrack(pos + 1);
      track = Math.floor(track / 10);
    }
  };

  backtrack(0);

  return res;
};
