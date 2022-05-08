/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  const result = [];
  const targetLen = digits.length;

  const backtracking = (cur, ds) => {
    if (cur.length === targetLen) {
      result.push(cur.join(''));
    } else {
      const dm = DMAP[ds.charAt(0)];

      for (let i = 0; i < dm.length; i += 1) {
        const newCur = [...cur, dm[i]];
        backtracking(newCur, ds.substr(1));
      }
    }
  };

  backtracking([], digits);

  return result;
};

const DMAP = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};
