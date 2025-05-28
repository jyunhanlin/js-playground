/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const count = new Array(26).fill(0);

  for (const c of s) {
    count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
  }

  for (let i = 0; i < s.length; i += 1) {
    const code = s[i].charCodeAt(0) - 'a'.charCodeAt(0);

    if (count[code] === 1) return i;
  }

  return -1;
};
