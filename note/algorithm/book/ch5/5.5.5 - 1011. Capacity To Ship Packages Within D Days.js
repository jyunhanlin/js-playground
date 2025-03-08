/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
var shipWithinDays = function (weights, days) {
  const getDays = (x) => {
    let days = 1;
    let currentWeight = 0;
    for (let i = 0; i < weights.length; i += 1) {
      currentWeight += weights[i];

      if (currentWeight > x) {
        currentWeight = weights[i];
        days += 1;
      }
    }

    return days;
  };

  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b) + 1;

  // [left, right)
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    // if (getDays(mid) === days) {
    //     right = mid;
    // } else if (getDays(mid) < days) {
    //     right = mid;
    // } else if (getDays(mid) > days) {
    //     left = mid + 1;
    // }

    if (getDays(mid) <= days) {
      right = mid;
    } else if (getDays(mid) > days) {
      left = mid + 1;
    }
  }
  return left;
};
