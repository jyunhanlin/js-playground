/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function (price, special, needs) {
  let trackCost = 0;
  let minCost = Infinity;

  const newSpecial = [];

  for (const s of special) {
    let cost = 0;
    for (let i = 0; i < s.length - 1; i += 1) {
      cost += s[i] * price[i];
    }

    if (cost > s[s.length - 1]) {
      newSpecial.push(s);
    }
  }

  const canUseSpecial = (special, need) => {
    for (let i = 0; i < need.length; i++) {
      if (need[i] < special[i]) {
        return false;
      }
    }
    return true;
  };

  const backtrack = (index) => {
    if (trackCost >= minCost) return;

    let useSpecial = false;

    for (let i = index; i < newSpecial.length; i += 1) {
      const targetSpecial = newSpecial[i];
      if (!canUseSpecial(targetSpecial, needs)) continue;

      useSpecial = true;

      for (let j = 0; j < needs.length; j++) {
        needs[j] -= targetSpecial[j];
      }
      trackCost += targetSpecial[targetSpecial.length - 1];

      backtrack(i);

      for (let j = 0; j < needs.length; j++) {
        needs[j] += targetSpecial[j];
      }
      trackCost -= targetSpecial[targetSpecial.length - 1];
    }

    if (!useSpecial) {
      let sum = 0;
      for (let i = 0; i < needs.length; i++) {
        sum += needs[i] * price[i];
      }

      minCost = Math.min(minCost, sum + trackCost);
    }
  };

  backtrack(0);

  return minCost;
};
