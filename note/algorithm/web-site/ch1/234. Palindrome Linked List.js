/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let left = head;
  let right = head;

  let res = true;
  const traverse = (curRight) => {
    if (!curRight) return;

    traverse(curRight.next);

    if (left.val !== curRight.val) {
      res = false;
    }

    left = left.next;
  };

  traverse(right);
  return res;
};
