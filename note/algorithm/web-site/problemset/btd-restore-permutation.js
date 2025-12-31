var restorePermutation = function (n, a) {
  let result;

  for (let i = 1; i <= n; i += 1) {
    const temp = [i];
    const used = new Set(temp);
    let j = 0;
    while (j < a.length) {
      const remain = a[j] - temp[temp.length - 1];
      if (remain < 1 || remain > n) break;
      if (used.has(remain)) break;
      used.add(remain);
      temp.push(remain);
      j += 1;
    }

    if (temp.length === n) {
      result = temp;
      break;
    }
  }

  return result || [-1];
};

// time complexity: O(n^2)
// space complexity: O(n)
