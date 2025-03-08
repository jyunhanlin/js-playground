/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  const getHours = (x) => {
    let hours = 0;
    for (let i = 0; i < piles.length; i += 1) {
      hours += Math.floor(piles[i] / x);
      if (piles[i] % x > 0) hours += 1;
    }
    return hours;
  };

  let left = 1;
  let right = 1e9 + 1;
  // [left, right)
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (getHours(mid) === h) {
      right = mid;
    } else if (getHours(mid) < h) {
      right = mid;
    } else if (getHours(mid) > h) {
      left = mid + 1;
    }
  }
  return left;
};
