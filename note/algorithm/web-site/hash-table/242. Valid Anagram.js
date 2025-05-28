/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const encode = (s) => {
    const count = new Array(26).fill(0);
    for (const c of s) {
      const delta = c.charCodeAt(0) - 'a'.charCodeAt(0);
      count[delta]++;
    }
    return count;
  };

  const count1 = encode(s);
  const count2 = encode(t);
  for (let i = 0; i < count1.length; i++) {
    if (count1[i] !== count2[i]) {
      return false;
    }
  }
  return true;
};
