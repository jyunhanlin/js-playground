/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const palindrome = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left -= 1;
      right += 1;
    }

    return s.substring(left + 1, right);
  };

  let res = '';
  for (let i = 0; i < s.length; i += 1) {
    const s1 = palindrome(i, i);
    const s2 = palindrome(i, i + 1);

    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }

  return res;
};
