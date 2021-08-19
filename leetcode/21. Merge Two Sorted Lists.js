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
var mergeTwoLists = function (l1, l2) {
  if (!l1 && !l2) return null;
  if (!l1) return l2;
  if (!l2) return l1;

  let head;

  let cur1 = l1;
  let cur2 = l2;
  if (l1.val > l2.val) {
    head = l2;
    cur2 = l2.next;
  } else {
    head = l1;
    cur1 = l1.next;
  }

  let cur = head;

  while (cur1 || cur2) {
    if (cur1 && cur2) {
      if (cur1.val > cur2.val) {
        cur.next = cur2;
        cur2 = cur2.next;
      } else {
        cur.next = cur1;
        cur1 = cur1.next;
      }

      cur = cur.next;
    } else if (!cur1) {
      cur.next = cur2;
      break;
    } else if (!cur2) {
      cur.next = cur1;
      break;
    }
  }

  return head;
};

// udemy
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
var mergeTwoLists = function (l1, l2) {
  const dummyHead = { next: null };
  let tail = dummyHead;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1;
      tail = tail.next;
      l1 = l1.next;
    } else {
      tail.next = l2;
      tail = tail.next;
      l2 = l2.next;
    }
  }

  tail.next = l1 || l2;
  return dummyHead.next;
};
