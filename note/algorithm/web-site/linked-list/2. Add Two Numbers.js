/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode();

  let p = dummy;
  let p1 = l1;
  let p2 = l2;

  let prev = 0;
  while (p1 || p2 || prev) {
    let val = prev;
    if (p1) val += p1.val;
    if (p2) val += p2.val;

    if (val > 9) prev = 1;
    else prev = 0;

    p.next = new ListNode(val % 10);
    p = p.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }

  return dummy.next;
};
