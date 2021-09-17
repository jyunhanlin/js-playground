/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  let left = 0,
    right = s.length - 1;

  let sArr = s.split('');

  while (left < right) {
    const lChar = sArr[left];
    const rChar = sArr[right];

    if (vowels.includes(lChar) && vowels.includes(rChar)) {
      [sArr[left], sArr[right]] = [sArr[right], sArr[left]];
      left++;
      right--;
    } else if (vowels.includes(lChar)) {
      right--;
    } else if (vowels.includes(rChar)) {
      left++;
    } else {
      left++;
      right--;
    }
  }

  return sArr.join('');
};

const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

var reverseVowels = function (s) {
  const vowels = s.split('').filter((a) => /[aeiou]/i.test(a));
  return s.split(/[aeiou]/i).reduce((res, a) => res + a + (vowels.pop() || ''), '');
};
