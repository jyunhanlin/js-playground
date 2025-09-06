/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {number}
 */
var findClosest = function (x, y, z) {
  const xz = Math.abs(x - z);
  const yz = Math.abs(y - z);

  if (xz === yz) return 0;

  return xz > yz ? 2 : 1;
};
