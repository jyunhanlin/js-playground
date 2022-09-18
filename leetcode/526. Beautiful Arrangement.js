/**
 * @param {number} n
 * @return {number}
 */
var countArrangement = function (n) {
  let res = 0;
  const helper = (cur) => {
    if (cur.length === n) {
      res += 1;
      return;
    }

    for (let i = 1; i <= n; i += 1) {
      if (!cur.includes(i) && isBeautiful(cur.length, i)) {
        helper([...cur, i]);
      }
    }
  };

  helper([]);

  return res;
};

const isBeautiful = (index, value) => {
  return (index + 1) % value === 0 || value % (index + 1) === 0;
};
