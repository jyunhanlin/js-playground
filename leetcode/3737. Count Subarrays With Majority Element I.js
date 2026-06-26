/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    let result = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        let cnt = 0;
        for (let j = i; j < n; j++) {
            if (nums[j] === target) cnt++;
            const len = j - i + 1;
            if (2 * cnt > len) result++;
        }
    }
    return result;
};

// Time Complexity:  O(n^2) - fix left endpoint i, extend right endpoint j;
// each (i, j) subarray is checked in O(1), so total work is ~n^2/2.
// Space Complexity: O(1) - only a few integer counters are used.

