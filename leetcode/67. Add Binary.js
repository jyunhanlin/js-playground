/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  const binA = `0b${a}`;
  const binB = `0b${b}`;

  const sum = BigInt(binA) + BigInt(binB);

  return sum.toString(2);
};
