/**
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
  const stack = [];

  const parts = input.split('\n');

  let max = 0;

  for (const part of parts) {
    const level = part.lastIndexOf('\t') + 1;
    while (level < stack.length) {
      stack.pop();
    }
    stack.push(part.substring(level));

    if (part.includes('.')) {
      const sum = stack.join('/').length;
      max = Math.max(max, sum);
    }
  }

  return max;
};
