/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i += 1) {
    if (stack.length === 0 && !pairs[s[i]]) return false;

    if (pairs[s[i]]) stack.push(s[i]);
    else {
      const leftPair = stack.pop();

      if (pairs[leftPair] !== s[i]) return false;
    }
  }

  return stack.length === 0 ? true : false;
};

const pairs = {
  '(': ')',
  '[': ']',
  '{': '}',
};
