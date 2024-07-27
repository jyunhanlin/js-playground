/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let leftMin = 0;
  let leftMax = 0;

  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (c === '(') {
      leftMin++;
      leftMax++;
    } else if (c === ')') {
      leftMin--;
      leftMax--;
    } else {
      leftMin--;
      leftMax++;
    }
    if (leftMax < 0) return false;
    if (leftMin < 0) leftMin = 0;
  }

  return leftMin === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  const dp = new Map();

  const helper = (index, openCount) => {
    const key = `${index}-${openCount}`;
    if (dp.has(key)) return dp.get(key);

    if (index === s.length) {
      const reuslt = openCount === 0;
      dp.set(key, reuslt);
      return reuslt;
    }

    let result = false;
    if (s[index] === '(') result = helper(index + 1, openCount + 1);
    else if (s[index] === ')') {
      if (openCount > 0) result = helper(index + 1, openCount - 1);
    } else
      result =
        helper(index + 1, openCount + 1) ||
        (openCount > 0 && helper(index + 1, openCount - 1)) ||
        helper(index + 1, openCount);

    dp.set(key, result);
    return result;
  };

  return helper(0, 0);
};
