/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  if (!head) return null;

  let dummyHead = {
    next: head,
  };

  while (dummyHead.next) {
    if (dummyHead.next.val === val) dummyHead.next = dummyHead.next.next;
    else break;
  }

  let cur = dummyHead.next;

  while (cur && cur.next) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }

  return dummyHead.next;
};
