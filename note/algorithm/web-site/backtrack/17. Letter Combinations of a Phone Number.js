/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];

  const mapping = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];

  const res = [];
  let sb = '';

  const n = digits.length;

  const backtrack = (index) => {
    if (index === n) {
      res.push(sb);
      return;
    }

    const digit = digits.charCodeAt(index) - '0'.charCodeAt(0);
    for (let c of mapping[digit].split('')) {
      sb += c;
      backtrack(index + 1);
      sb = sb.slice(0, -1);
    }
  };

  backtrack(0);

  return res;
};
