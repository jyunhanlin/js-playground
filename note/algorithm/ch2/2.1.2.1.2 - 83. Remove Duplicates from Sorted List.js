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
  if (!head) return null;

  let fast = head;
  let slow = head;

  while (fast) {
    if (slow.val !== fast.val) {
      slow.next = fast;
      slow = slow.next;
    }

    fast = fast.next;
  }

  slow.next = null;

  return head;
};
