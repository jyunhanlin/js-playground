// the same as 1723. Find Minimum Time to Finish All Jobs
/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
  const children = new Array(k).fill(0);

  let res = Infinity;

  const backtrack = (index) => {
    if (index === cookies.length) {
      res = Math.min(res, Math.max(...children));
      return;
    }

    const chosen = new Set();

    for (let i = 0; i < children.length; i += 1) {
      if (children[i] + cookies[index] > res) continue;

      if (chosen.has(children[i])) continue;

      chosen.add(children[i]);
      children[i] += cookies[index];
      backtrack(index + 1);
      children[i] -= cookies[index];
    }
  };

  backtrack(0);

  return res;
};
