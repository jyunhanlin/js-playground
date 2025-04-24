/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
  let res;
  const track = [];
  const used = new Set();

  const backtrack = (code) => {
    if (res) return;

    if (track.length === 1 << n) {
      res = [...track];
      return;
    }

    if (used.has(code)) return;

    used.add(code);
    track.push(code);
    for (let i = 0; i < n; i++) {
      const next = code ^ (1 << i);
      backtrack(next);
    }
    used.delete(code);
    track.pop();
  };

  backtrack(0);

  return res;
};
