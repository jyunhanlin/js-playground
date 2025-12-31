var minLexicographicalString = function (k, s) {
  const arr = s.split('');

  for (let i = 0; i < arr.length; i++) {
    if (k <= 0) break;

    if (arr[i] === '1') {
      arr[i] = '0';
      k--;
    }
  }

  // k must be used up (to be 0)
  // if the remaining times is odd, flip the last character
  if (k % 2 === 1) {
    arr[arr.length - 1] = arr[arr.length - 1] === '0' ? '1' : '0';
  }

  return arr.join('');
};

// time complexity: O(n)
// space complexity: O(n)
