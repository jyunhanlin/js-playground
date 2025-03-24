/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  const n = position.length;
  const cars = new Array(n).fill(0).map(() => new Array(2));
  for (let i = 0; i < n; i += 1) {
    cars[i][0] = position[i];
    cars[i][1] = speed[i];
  }
  cars.sort((a, b) => a[0] - b[0]);

  const time = new Array(n);
  for (let i = 0; i < n; i += 1) {
    const car = cars[i];
    time[i] = (target - car[0]) / car[1];
  }

  const stack = [];

  for (const t of time) {
    while (stack.length && stack[stack.length - 1] <= t) {
      stack.pop();
    }

    stack.push(t);
  }

  return stack.length;

  // let res = 0;
  // let maxTime = 0;
  // for (let i = n - 1; i >= 0; i--) {
  //   if (time[i] > maxTime) {
  //     maxTime = time[i];
  //     res++;
  //   }
  // }
  // return res;
};
