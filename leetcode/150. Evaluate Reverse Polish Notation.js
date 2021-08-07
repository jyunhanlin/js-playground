/**
 * @param {string[]} a
 * @param {string[]} b
 * @return {number}
 */

const calc = (a, b, op) => {
  switch (op) {
    case '+':
      return Number(a) + Number(b);
    case '-':
      return Number(a) - Number(b);
    case '*':
      return Number(a) * Number(b);
    case '/':
      const divide = a / b;

      if (divide >= 0) return Math.floor(divide);
      else return Math.ceil(divide);
  }
};
const ops = ['+', '-', '*', '/'];

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const tokenArray = tokens.slice(2);
  const temp = [tokens[0], tokens[1]];

  while (tokenArray.length) {
    const token = tokenArray[0];

    if (ops.includes(token)) {
      const b = temp.pop();
      const a = temp.pop();

      // console.log(a, b, token);
      const calcResult = calc(a, b, token);

      console.log(a, b, token, calcResult);

      temp.push(calcResult);
    } else {
      temp.push(token);
    }

    tokenArray.splice(0, 1);
  }

  return temp[0];
};

// ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// 22

evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']);

evalRPN(['4', '13', '5', '/', '+']);
