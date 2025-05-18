/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  a = a.split('').reverse().join('');
  b = b.split('').reverse().join('');

  const m = a.length;
  const n = b.length;

  const res = [];

  let i = 0;
  let carry = 0;

  while (i < Math.max(m, n) || carry > 0) {
    let val = carry;
    val += parseInt(a[i] || 0) + parseInt(b[i] || 0);
    res.push(val % 2);
    carry = Math.floor(val / 2);
    i += 1;
  }

  return res.reverse().join('');
};
