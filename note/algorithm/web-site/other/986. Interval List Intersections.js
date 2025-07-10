/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  let i = 0;
  let j = 0;
  const res = [];

  while (i < firstList.length && j < secondList.length) {
    const [a1, a2] = firstList[i];
    const [b1, b2] = secondList[j];

    if (b2 >= a1 && a2 >= b1) {
      res.push([Math.max(a1, b1), Math.min(a2, b2)]);
    }

    if (b2 < a2) j += 1;
    else i += 1;
  }

  return res;
};
