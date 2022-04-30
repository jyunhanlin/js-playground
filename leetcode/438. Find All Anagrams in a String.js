/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const pLen = p.length;
  const pObj = {};
  const result = [];

  for (let i = 0; i < pLen; i += 1) {
    pObj[p.charAt(i)] = pObj[p.charAt(i)] ? pObj[p.charAt(i)] + 1 : 1;
  }

  for (let i = 0; i < s.length - pLen + 1; i += 1) {
    const subS = s.substring(i, i + pLen);

    if (isAnagram(subS, pObj)) result.push(i);
  }

  return result;
};

const isAnagram = (s, pObj) => {
  const pObjClone = Object.assign({}, pObj);

  for (let i = 0; i < s.length; i += 1) {
    if (pObjClone[s.charAt(i)]) {
      pObjClone[s.charAt(i)] -= 1;
    } else {
      return false;
    }
  }

  return Object.values(pObjClone).every((p) => p === 0);
};
