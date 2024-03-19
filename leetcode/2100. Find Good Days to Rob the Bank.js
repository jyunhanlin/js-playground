/**
 * @param {number[]} security
 * @param {number} time
 * @return {number[]}
 */
var goodDaysToRobBank = function (security, time) {
  const pre = [];
  const suf = [];
  const size = security.length;
  let count = 0;

  pre[0] = 0;
  count = 0;
  for (let i = 1; i < size; i += 1) {
    if (security[i - 1] >= security[i]) count += 1;
    else count = 0;
    pre[i] = count;
  }

  suf[size - 1] = 0;
  count = 0;
  for (let i = size - 2; i >= 0; i -= 1) {
    if (security[i] <= security[i + 1]) count += 1;
    else count = 0;
    suf[i] = count;
  }

  const result = [];

  for (let i = 0; i < size; i += 1) {
    if (pre[i] >= time && suf[i] >= time) result.push(i);
  }

  return result;
};
