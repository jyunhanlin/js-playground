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

// Follow up: Could you do it in O(n) time and O(1) space?
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
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  if (fast !== null) slow = slow.next;

  let left = head;
  let right = reverse(slow);
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
};

function reverse(head) {
  let pre = null,
    cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}
