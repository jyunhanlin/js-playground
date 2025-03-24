/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function (head) {
  const nums = [];
  let p = head;
  while (p) {
    nums.push(p.val);
    p = p.next;
  }

  const res = [];
  const stack = [];

  for (let i = nums.length - 1; i >= 0; i -= 1) {
    while (stack.length && stack[stack.length - 1] <= nums[i]) {
      stack.pop();
    }

    res[i] = stack.length ? stack[stack.length - 1] : 0;
    stack.push(nums[i]);
  }

  return res;
};
