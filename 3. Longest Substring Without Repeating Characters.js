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
