/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const result = [];

  const strArr = s.split('');

  const backtracking = (cur, curIdx) => {
    if (cur.length === strArr.length) {
      result.push(cur.join(''));
      return;
    }

    if (/[0-9]/.test(strArr[curIdx])) {
      backtracking([...cur, strArr[curIdx]], curIdx + 1);
    } else {
      backtracking([...cur, strArr[curIdx].toLowerCase()], curIdx + 1);
      backtracking([...cur, strArr[curIdx].toUpperCase()], curIdx + 1);
    }
  };

  backtracking([], 0);

  return result;
};
