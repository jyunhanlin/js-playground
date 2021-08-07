/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let p = l1,
    q = l2;
  let carry = 0;
  let result = new ListNode(0);
  let cur = result;

  while (p != null || q != null) {
    let x = p != null ? p.val : 0;
    let y = q != null ? q.val : 0;
    let sum = x + y + carry;
    carry = Math.floor(sum / 10);
    cur.next = new ListNode(sum % 10);
    cur = cur.next;

    if (p != null) p = p.next;
    if (q != null) q = q.next;
  }
  if (carry > 0) {
    cur.next = new ListNode(carry);
  }

  return result.next;
};
