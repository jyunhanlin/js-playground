/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function(s) {
    let l = 0;
    let r = 0;

    const obj = { a: 0, b:0, c: 0};
    const getValidObj = () =>  obj.a > 0 && obj.b > 0 && obj.c > 0;;

    let result = 0;

    while (l <= r && r < s.length) {
        obj[s[r++]] += 1;
        while (getValidObj()) {
            result += s.length - r + 1;
            obj[s[l++]] -= 1;
        }

    }

    return result;
};

// time complexity: o(n)
// space complexity: o(1)
