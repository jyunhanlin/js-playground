/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let group = {};

  for (let i = 0; i < strs.length; i += 1) {
    const str = strs[i];

    const key = str.split('').sort().join('');

    if (!group[key]) group[key] = [];

    group[key].push(str);
  }

  return Object.values(group);
};
