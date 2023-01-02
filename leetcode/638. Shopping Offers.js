/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function (price, special, needs) {
  let min = Infinity;
  let curCost = 0;
  const helper = (remaining, curCost) => {
    if (remaining.every((re) => re === 0)) {
      min = Math.min(min, curCost);
    } else {
      for (let i = 0; i < price.length; i += 1) {
        if (remaining[i] - 1 > -1) {
          const newRe = [...remaining];
          newRe[i] -= 1;
          helper(newRe, curCost + price[i]);
        }
      }

      for (let i = 0; i < special.length; i += 1) {
        const newRe = [];

        for (let j = 0; j < special[i].length - 1; j += 1) {
          if (remaining[j] - special[i][j] > -1) {
            newRe.push(remaining[j] - special[i][j]);
          } else {
            break;
          }
        }

        if (newRe.length === remaining.length) {
          helper(newRe, curCost + special[i][special[i].length - 1]);
        }
      }
    }
  };

  helper(needs, curCost);

  return min;
};

/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function (price, special, needs) {
  let min = Infinity;
  let curCost = 0;
  const dp = {};

  const finalKey = new Array(needs.length).fill(0).toString();

  const helper = (remaining, curCost) => {
    const key = remaining.toString();
    if (key === finalKey) return 0;
    if (dp[key]) return dp[key];

    let p1 = Infinity;
    for (let i = 0; i < price.length; i += 1) {
      if (remaining[i] - 1 > -1) {
        const newRe = [...remaining];
        newRe[i] -= 1;
        p1 = Math.min(p1, helper(newRe) + price[i]);
      }
    }

    let p2 = Infinity;
    for (let i = 0; i < special.length; i += 1) {
      const newRe = [];

      for (let j = 0; j < special[i].length - 1; j += 1) {
        if (remaining[j] - special[i][j] > -1) {
          newRe.push(remaining[j] - special[i][j]);
        } else {
          break;
        }
      }

      if (newRe.length === remaining.length) {
        p2 = Math.min(p2, helper(newRe) + special[i][special[i].length - 1]);
      }
    }

    dp[key] = Math.min(p1, p2);
    return dp[key];
  };

  helper(needs, curCost);

  return dp[needs.toString()] || 0;
};
