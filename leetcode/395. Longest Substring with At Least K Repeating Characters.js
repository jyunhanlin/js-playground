/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
  let res = 0;

  const uniqueCount = new Set();

  for (let i = 0; i < s.length; i += 1) {
    uniqueCount.add(s[i]);
  }

  const charToNum = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0);

  const helper = (count) => {
    let len = 0;
    let left = 0;
    let right = 0;
    let windowCount = Array(26).fill(0);
    let windowUniqueCount = 0;
    let windowValidCount = 0;

    while (right < s.length) {
      const charNum = charToNum(s[right]);

      if (windowCount[charNum] === 0) windowUniqueCount += 1;
      windowCount[charNum] += 1;
      if (windowCount[charNum] === k) windowValidCount += 1;
      right += 1;

      while (windowUniqueCount > count) {
        const removedCharNum = charToNum(s[left]);
        if (windowCount[removedCharNum] === k) windowValidCount -= 1;
        windowCount[removedCharNum] -= 1;
        if (windowCount[removedCharNum] === 0) windowUniqueCount -= 1;
        left += 1;
      }

      if (windowValidCount === count) len = Math.max(len, right - left);
    }

    return len;
  };

  for (let i = 1; i <= uniqueCount.size; i += 1) {
    res = Math.max(res, helper(i));
  }

  return res;
};

// time complexity: O(26 * n)
// space complexity: O(26)
