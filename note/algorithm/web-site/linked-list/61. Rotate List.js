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
var rotateRight = function (head, k) {
  if (!head) return null;

  let n = 0;
  let p = head;

  while (p) {
    n += 1;
    p = p.next;
  }

  k = k % n;

  p = head;
  let i = 0;
  while (i < n - k - 1) {
    p = p.next;
    i += 1;
  }

  if (!p.next) return head;

  const newHead = p.next;
  p.next = null;

  p = newHead;
  i = 0;
  while (i < k - 1) {
    p = p.next;
    i += 1;
  }

  p.next = head;

  return newHead;
};
