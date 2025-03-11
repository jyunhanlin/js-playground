/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode();

  let p = head;
  let pUniq = dummy;
  let prevVal = 999;

  while (p) {
    if ((p.next && p.val !== p.next.val && prevVal !== p.val) || (!p.next && prevVal !== p.val)) {
      pUniq.next = p;
      pUniq = pUniq.next;
    }

    prevVal = p.val;

    p = p.next;
    pUniq.next = null;
  }

  return dummy.next;
};
