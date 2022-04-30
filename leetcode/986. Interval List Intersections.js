/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  let fp = 0,
    sp = 0;
  const result = [];

  while (fp < firstList.length && sp < secondList.length) {
    const fl = firstList[fp];
    const sl = secondList[sp];

    let start, end;
    if (fl[0] > sl[0]) start = fl[0];
    else start = sl[0];
    if (fl[1] > sl[1]) end = sl[1];
    else end = fl[1];

    if (end >= start) result.push([start, end]);

    if (fl[1] > sl[1]) sp += 1;
    else fp += 1;
  }

  return result;
};
