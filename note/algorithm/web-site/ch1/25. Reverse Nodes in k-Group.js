/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (!head) return null;

  let a = head;
  let b = head;

  for (let i = 0; i < k; i++) {
    if (!b) return head;
    b = b.next;
  }

  const newHead = reverseN(a, k);

  a.next = reverseKGroup(b, k);

  return newHead;
};

const reverseN = (head, n) => {
  if (n === 1) {
    successor = head.next;
    return head;
  }

  const last = reverseN(head.next, n - 1);
  head.next.next = head;
  head.next = successor;

  return last;
};
