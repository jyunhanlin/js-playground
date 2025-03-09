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
  const s1 = [];
  while (l1) {
    s1.push(l1.val);
    l1 = l1.next;
  }

  const s2 = [];
  while (l2) {
    s2.push(l2.val);
    l2 = l2.next;
  }

  const dummy = new ListNode();
  let carry = 0;
  while (s1.length || s2.length || carry > 0) {
    let val1 = 0;
    if (s1.length) val1 = s1.pop();

    let val2 = 0;
    if (s2.length) val2 = s2.pop();

    const val = val1 + val2 + carry;

    carry = Math.floor(val / 10);

    const node = new ListNode(val % 10);

    node.next = dummy.next;
    dummy.next = node;
  }

  return dummy.next;
};
