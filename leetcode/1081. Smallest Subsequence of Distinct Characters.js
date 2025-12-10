/**
 * @param {string} s
 * @return {string}
 */
var smallestSubsequence = function (s) {
  const n = s.length;
  const count = {};
  const inStack = {};
  const stack = [];

  for (let i = 0; i < n; i += 1) {
    count[s[i]] = (count[s[i]] || 0) + 1;
  }

  for (let i = 0; i < n; i += 1) {
    const c = s[i];

    count[c] -= 1;

    if (inStack[c]) continue;

    while (stack.length && c < stack[stack.length - 1]) {
      if (count[stack[stack.length - 1]] === 0) break;

      inStack[stack.pop()] = 0;
    }

    stack.push(c);
    inStack[c] = 1;
  }

  return stack.join('');
};

// time complexity: O(n)
// space complexity: O(n)
