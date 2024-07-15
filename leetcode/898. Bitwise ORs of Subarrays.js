/**
 * @param {number[]} arr
 * @return {number}
 */
var subarrayBitwiseORs = function (arr) {
  const dp = new Set();
  let curOr = 0;

  for (let i = 0; i < arr.length; i += 1) {
    curOr |= arr[i];
    let subOr = 0;

    for (let j = i; j >= 0; j -= 1) {
      subOr |= arr[j];
      dp.add(subOr);
      if (curOr === subOr) break;
    }
  }

  return dp.size;
};
