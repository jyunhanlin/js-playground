/**
 * @param {number[]} baseCosts
 * @param {number[]} toppingCosts
 * @param {number} target
 * @return {number}
 */
var closestCost = function (baseCosts, toppingCosts, target) {
  let isHit;
  const dpP = {};
  const dpM = {};
  const helper = (remain, index) => {
    if (isHit) return;

    if (remain === 0) {
      isHit = true;
    } else if (index >= toppingCosts.length) {
      remain > 0 ? (dpP[remain] = 1) : (dpM[remain] = 1);
    } else if (remain < 0) {
      dpM[remain] = 1;
    } else {
      dpP[remain] = 1;
      const topping = toppingCosts[index];
      helper(remain, index + 1);
      helper(remain - topping, index + 1);
      helper(remain - topping * 2, index + 1);
    }
  };

  for (let i = 0; i < baseCosts.length; i += 1) {
    helper(target - baseCosts[i], 0);
  }

  if (isHit) return target;

  const pos =
    Object.keys(dpP)
      .map(Number)
      .sort((a, b) => a - b)[0] || Infinity;
  const minus =
    Object.keys(dpM)
      .map(Number)
      .sort((a, b) => b - a)[0] || Infinity;

  if (pos <= Math.abs(minus)) return target - pos;
  else return target - minus;
};
