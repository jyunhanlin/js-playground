/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  const stack = [];

  for (const c of num) {
    while (stack.length && stack[stack.length - 1] > c && k > 0) {
      stack.pop();
      k -= 1;
    }

    if (!stack.length && c === '0') continue;

    stack.push(c);
  }

  while (stack.length && k > 0) {
    stack.pop();
    k -= 1;
  }

  return stack.join('') || '0';
};
