/**
 * @param {number} label
 * @return {number[]}
 */
var pathInZigZagTree = function (label) {
  let level = 1;
  let num = 1;
  /* record how many nodes of each level */
  let levelCount = 1;
  /* find last level */
  while (num < label) {
    levelCount *= 2;
    num += levelCount;
    level += 1;
  }
  /* insert ans in reverse order */
  const ans = [label];
  while (--level) {
    /* because of zigzag, each pair for each level */
    /* we find the 'other' number */
    let levelEnd = 2 ** level - 1;
    let levelStart = 2 ** (level - 1);
    let target = Math.floor(label / 2);
    target = levelEnd + levelStart - target;
    label = target;
    ans.push(target);
  }

  return ans.reverse();
};
