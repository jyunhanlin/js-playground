/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
  let res = Infinity;

  const helper = (remaining, dist) => {
    if (remaining.length === 0) {
      const max = Math.max(...dist);
      res = Math.min(res, max);
    } else {
      for (let i = 0; i < remaining.length; i += 1) {
        for (let j = 0; j < k; j += 1) {
          const newDist = [...dist];
          newDist[j] += remaining[i];
          const newRemaining = [...remaining];
          newRemaining.splice(i, 1);
          helper(newRemaining, newDist);
        }
      }
    }
  };

  helper(cookies, new Array(k).fill(0));

  return res;
};

/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
  let res = Infinity;

  const helper = (dist, curIdx) => {
    if (curIdx === cookies.length) {
      const max = Math.max(...dist);
      res = Math.min(res, max);
    } else {
      for (let i = 0; i < k; i += 1) {
        const newDist = [...dist];
        newDist[i] += cookies[curIdx];
        helper(newDist, curIdx + 1);
        newDist[i] += cookies[curIdx];
      }
    }
  };

  helper(new Array(k).fill(0), 0);

  return res;
};
