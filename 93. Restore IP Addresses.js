const isValid = (str) => {
  if (+str > 255 || !str.length) return false;
  if (str.length >= 2 && str[0] === '0') return false;
  return true;
};

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const result = [];
  const findAllCombinations = (arr, str) => {
    if (arr.length === 3) {
      if (isValid(str)) result.push([...arr, str]);
      return;
    }

    for (let i = 1; i < 4; i += 1) {
      let subStr = str.slice(0, i);
      if (!isValid(subStr)) continue;
      findAllCombinations([...arr, subStr], str.slice(i));
    }
  };

  findAllCombinations([], s);
  return result.map((x) => x.join('.'));
};

// Input: s = "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

console.log(restoreIpAddresses('25525511135'));
