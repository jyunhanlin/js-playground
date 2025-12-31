var countDaysWithTwoThings = function (n, a, b, c) {
  let res = 0;

  for (let i = 1; i <= n; i += 1) {
    let count = 0;
    if (i % a === 0) count += 1;
    if (i % b === 0) count += 1;
    if (i % c === 0) count += 1;

    if (count >= 2) res += 1;
  }

  return res;
};
