/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  const path = [];

  while (label > 0) {
    path.push(label);
    label = Math.floor(label / 2);

    const depth = Math.floor(Math.log(label) / Math.log(2));

    const start = Math.pow(2, depth);
    const end = 2 * start - 1;

    label = end - (label - start);
  }

  return path.reverse();
};
