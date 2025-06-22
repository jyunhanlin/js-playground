/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  const rightIndex = new Map();
  const parenStack = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s[i] === '(') parenStack.push(i);
    else if (s[i] === ')') rightIndex.set(parenStack.pop(), i);
  }

  const calc = (start, end) => {
    const stack = [];
    let num = 0;
    let sign = '+';
    for (let i = start; i <= end; i += 1) {
      const c = s[i];

      if (c === '(') {
        num = calc(i + 1, rightIndex.get(i) - 1);
        i = rightIndex.get(i);
      }

      if (/\d/.test(c)) num = 10 * num + +c;

      if ('+-*/'.includes(c) || i === end) {
        let pre;
        switch (sign) {
          case '+':
            stack.push(num);
            break;
          case '-':
            stack.push(-num);
            break;
          case '*':
            pre = stack.pop();
            stack.push(pre * num);
            break;
          case '/':
            pre = stack.pop();
            stack.push(Math.trunc(pre / num));
            break;
        }

        sign = c;
        num = 0;
      }
    }

    return stack.reduce((a, b) => a + b, 0);
  };

  return calc(0, s.length - 1);
};
