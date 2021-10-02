/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  if (x === y) return 0;

  let s, l;

  if (x > y) {
    s = Number(y).toString(2);
    l = Number(x).toString(2);
  } else {
    s = Number(x).toString(2);
    l = Number(y).toString(2);
  }

  let distance = 0;
  for (let i = 0; i < s.length; i += 1) {
    const sIdx = s.length - i - 1;
    const lIdx = l.length - i - 1;

    if (s[sIdx] !== l[lIdx]) distance++;
  }

  const remainLen = l.length - s.length;

  for (let i = 0; i < remainLen; i += 1) {
    if (l[i] === '1') distance++;
  }

  return distance;
};

let hammingDistance = (x, y) => (x ^ y).toString(2).replace(/0/g, '').length;
