/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let curA = headA,
    curB = headB;

  while (curA || curB) {
    if (curA === curB) return curA;

    curA = !curA ? headB : curA.next;
    curB = !curB ? headA : curB.next;
  }

  return null;

  // from discuss
  // let a = headA, b = headB
  // while (a !== b) {
  //     a = !a ? headB : a.next
  //     b = !b ? headA : b.next
  // }
  // return a
};
