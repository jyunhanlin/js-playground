/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let len = 0;
  let cur = head;

  while (cur) {
    cur = cur.next;
    len += 1;
  }

  let target = len - n;
  let count = 0;

  if (target === count) return head.next;

  cur = head;
  let newHead = cur;

  while (cur && cur.next) {
    if (count + 1 === target) {
      cur.next = cur.next.next;
      break;
    } else {
      count++;
      cur = cur.next;
    }
  }

  return newHead;
};

// optimized
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let dummyHead = { next: head };
  let slow = dummyHead;
  let fast = dummyHead;

  for (let i = 1; i <= n; i += 1) {
    fast = fast.next;
  }

  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next;
  return dummyHead.next;
};
