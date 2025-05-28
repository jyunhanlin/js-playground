/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const encode = (s) => {
    const count = new Array(26).fill(0);
    for (const c of s) {
      const delta = c.charCodeAt(0) - 'a'.charCodeAt(0);
      count[delta]++;
    }
    return count.join('#');
  };

  const codeToGroup = new Map();
  for (const s of strs) {
    const code = encode(s);
    if (!codeToGroup.has(code)) {
      codeToGroup.set(code, []);
    }
    codeToGroup.get(code).push(s);
  }

  return [...codeToGroup.values()];
};
