/**
 * @param {number[]} arr
 * @return {number[]}
 */
var pancakeSort = function (arr) {
  const res = [];

  const sort = (n) => {
    if (n === 1) return;

    let maxCake = 0;
    let maxCakeIndex = 0;

    for (let i = 0; i < n; i += 1) {
      if (arr[i] > maxCake) {
        maxCake = arr[i];
        maxCakeIndex = i;
      }
    }

    reverse(0, maxCakeIndex);
    res.push(maxCakeIndex + 1);
    reverse(0, n - 1);
    res.push(n);

    sort(n - 1);
  };

  const reverse = (i, j) => {
    while (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  };

  sort(arr.length);

  return res;
};
