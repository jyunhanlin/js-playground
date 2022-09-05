/**
 * @param {string} s
 * @return {number}
 */
var numSplits = function (s) {
  let set = new Set();
  const dp1 = new Array(s.length);
  const dp2 = new Array(s.length);

  for (let i = 0; i < s.length; i++) {
    set.add(s[i]);
    dp1[i] = set.size;
  }

  set = new Set();
  for (let i = s.length - 1; i >= 0; i--) {
    set.add(s[i]);
    dp2[i] = set.size;
  }

  let res = 0;
  for (let i = 1; i < s.length; i++) {
    if (dp1[i - 1] == dp2[i]) res++;
  }
  return res;
};
