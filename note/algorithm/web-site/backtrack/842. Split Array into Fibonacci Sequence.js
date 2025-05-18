/**
 * @param {string} num
 * @return {number[]}
 */
var splitIntoFibonacci = function (num) {
  const res = [];
  const track = [];

  let found = false;

  const backtrack = (index, first, second) => {
    if (found) return;

    if (
      (first.startsWith('0') && first.length > 1) ||
      (second.startsWith('0') && second.length > 1)
    ) {
      return;
    }

    if (
      first.length > 10 ||
      parseInt(first) > 2147483647 ||
      second.length > 10 ||
      parseInt(second) > 2147483647
    ) {
      return;
    }

    const sumStr = `${+first + +second}`;
    const next = num.substring(index + first.length + second.length);

    if (!next.startsWith(sumStr)) return;
    if (sumStr.length > 10 || parseInt(sumStr) > 2147483647) return;

    if (next === sumStr) {
      res.push(...track);
      res.push(+sumStr);
      found = true;
      return;
    }

    track.push(+sumStr);
    backtrack(index + first.length, second, sumStr);
    track.pop();
  };

  const n = num.length;
  for (let i = 1; i <= n; i++) {
    const first = num.substring(0, i);
    for (let j = i + 1; j <= n; j++) {
      const second = num.substring(i, j);
      track.push(+first, +second);
      backtrack(0, first, second);
      track.pop();
      track.pop();
      if (found) break;
    }

    if (found) break;
  }

  return res;
};
