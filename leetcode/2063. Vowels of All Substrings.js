/**
 * @param {string} word
 * @return {number}
 */
var countVowels = function (word) {
  let res = 0,
    n = word.length;
  for (let i = 0; i < n; i += 1) if ('aeiou'.indexOf(word[i]) !== -1) res += (i + 1) * (n - i);
  return res;
};
