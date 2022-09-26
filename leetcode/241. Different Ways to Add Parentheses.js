/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
  let res = [];
  for (let i = 0; i < expression.length; i++) {
    if (isNaN(expression[i])) {
      let left = diffWaysToCompute(expression.slice(0, i));
      let right = diffWaysToCompute(expression.slice(i + 1));
      for (let l of left) {
        for (let r of right) {
          l = Number(l);
          r = Number(r);

          res.push(OPS[expression[i]](l, r));
        }
      }
    }
  }

  if (res.length != 0) return res;
  return [expression];
};

const OPS = { '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b };
