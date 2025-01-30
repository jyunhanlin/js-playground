// recursive

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
var reverseList = function (head) {
  if (head === null || head.next === null) return head;
  const last = reverseList(head.next);
  head.next.next = head;
  head.next = null;

  return last;
};

// 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
// 1 -> reverseList(2 -> 3 -> 4 -> 5 -> 6 -> null) ==> 1 -> 2 <- 3 <- 4 <- 5 <- 6
// 1 <- 2 <- 3 <- 4 <- 5 <- 6
