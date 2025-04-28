// from the viewpoint of the string length
/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  const used = new Set();
  let res = 1;

  const backtrack = (index) => {
    if (index === s.length) {
      res = Math.max(res, used.size);
      return;
    }

    for (let i = index; i < s.length; i += 1) {
      const str = s.substring(index, i + 1);

      if (used.has(str)) continue;

      used.add(str);

      backtrack(i + 1);

      used.delete(str);
    }
  };

  backtrack(0);

  return res;
};

// from the viewpoint of the split
/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  const set = new Set();
  let res = 0;

  var backtrack = function (s, index) {
    if (index === s.length) {
      res = Math.max(res, set.size);
      return;
    }

    // no split
    backtrack(s, index + 1);

    let sub = s.substring(0, index + 1);
    if (!set.has(sub)) {
      set.add(sub);

      // split
      backtrack(s.substring(index + 1), 0);

      set.delete(sub);
    }
  };

  backtrack(s, 0);
  return res;
};
