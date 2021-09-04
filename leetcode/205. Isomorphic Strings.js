/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const isoSPair = {};
  const isoTPair = {};

  for (let i = 0; i < s.length; i += 1) {
    const curS = s[i];
    const curT = t[i];

    if (!isoSPair[curS]) isoSPair[curS] = curT;
    if (!isoTPair[curT]) isoTPair[curT] = curS;
    if (isoSPair[curS] !== curT || isoTPair[curT] !== curS) return false;
  }

  return true;
};
