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
  const dummy = new ListNode();
  dummy.next = head;

  let p1 = dummy;
  for (i = 0; i <= n; i += 1) {
    p1 = p1.next;
  }

  let p2 = dummy;

  while (p1) {
    p1 = p1.next;
    p2 = p2.next;
  }

  p2.next = p2.next.next;

  return dummy.next;
};

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
  const dummy = new ListNode();
  dummy.next = head;

  const x = findFromEnd(dummy, n + 1);
  x.next = x.next.next;

  return dummy.next;
};

const findFromEnd = (head, k) => {
  let p1 = head;
  for (i = 0; i < k; i += 1) {
    p1 = p1.next;
  }

  let p2 = head;

  while (p1) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p2;
};
