/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let strArr = s.split('');
  let maxString = [],
    maxLength = 0;

  for (i = 0; i < strArr.length; i++) {
    let k = 0;
    maxString = [];
    maxString[k] = strArr[i];
    maxLength = maxLength > maxString.length ? maxLength : maxString.length;

    for (j = i + 1; j < strArr.length; j++) {
      if (maxString.indexOf(strArr[j]) === -1) {
        k += 1;
        maxString[k] = strArr[j];
        maxLength = maxLength > maxString.length ? maxLength : maxString.length;
      } else {
        maxLength = maxLength > maxString.length ? maxLength : maxString.length;

        break;
      }
    }
  }
  //return maxString
  return maxLength;
};

// optimized
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring2 = function (s) {
  if (s.length === 1) return 1;

  let left = 0,
    longest = 0;

  const seen = {};

  for (let right = 0; right < s.length; right += 1) {
    const curChar = s[right];
    const preSeen = seen[curChar];

    if (preSeen >= left) {
      left = preSeen + 1;
    }

    seen[curChar] = right;

    longest = Math.max(longest, right - left + 1);
  }

  return longest;
};
