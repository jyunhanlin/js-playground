/**
 * @param {number[]} energyDrinkA
 * @param {number[]} energyDrinkB
 * @return {number}
 */
var maxEnergyBoost = function (energyDrinkA, energyDrinkB) {
  const n = energyDrinkA.length;

  const dpA = new Array(n).fill(0);
  const dpB = new Array(n).fill(0);

  dpA[0] = energyDrinkA[0];
  dpA[1] = energyDrinkA[0] + energyDrinkA[1];

  dpB[0] = energyDrinkB[0];
  dpB[1] = energyDrinkB[0] + energyDrinkB[1];

  for (let i = 2; i < n; i += 1) {
    dpA[i] = Math.max(dpA[i - 1], dpB[i - 2]) + energyDrinkA[i];
    dpB[i] = Math.max(dpB[i - 1], dpA[i - 2]) + energyDrinkB[i];
  }

  return Math.max(dpA[n - 1], dpB[n - 1]);
};
