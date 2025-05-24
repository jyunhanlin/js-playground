/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const encode = (s) => {
    let count = new Array(26).fill(0);
    for (let c of s) {
      let delta = c.charCodeAt(0) - 'a'.charCodeAt(0);
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
