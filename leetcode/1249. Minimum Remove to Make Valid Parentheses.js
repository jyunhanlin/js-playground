/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  const sArr = s.split('');

  const parenthesesArr = [];

  for (let i = 0; i < sArr.length; i += 1) {
    const curChar = sArr[i];

    if (curChar === '(') {
      parenthesesArr.push(i);
    } else if (curChar === ')' && parenthesesArr.length) {
      parenthesesArr.pop();
    } else if (curChar === ')') {
      sArr[i] = '';
    }
  }

  while (parenthesesArr.length) {
    const curIdx = parenthesesArr.pop();

    sArr[curIdx] = '';
  }

  return sArr.join('');
};
