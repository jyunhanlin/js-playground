/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
  const charToIndexes = {};
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!charToIndexes[c]) {
      charToIndexes[c] = [];
    }
    charToIndexes[c].push(i);
  }

  let res = 0;
  for (let word of words) {
    let i = 0;
    let j = 0;
    while (i < word.length) {
      const c = word[i];
      if (!charToIndexes[c]) {
        break;
      }

      let left = 0;
      let right = charToIndexes[c].length;
      while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (j > charToIndexes[c][mid]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      if (left === charToIndexes[c].length) {
        break;
      }
      j = charToIndexes[c][left];
      j++;
      i++;
    }

    if (i === word.length) {
      res++;
    }
  }

  return res;
};
