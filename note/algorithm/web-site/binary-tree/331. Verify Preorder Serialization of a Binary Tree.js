/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
  const nodes = preorder.split(',');
  let count = 1;

  for (const node of nodes) {
    count -= 1;
    if (count < 0) {
      return false;
    }

    if (node !== '#') {
      count += 2;
    }
  }

  return count === 0;
};
