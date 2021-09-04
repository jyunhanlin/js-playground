/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  if (!head) return false;

  const llVals = [];
  let cur = head;

  while (cur) {
    llVals.push(cur.val);
    cur = cur.next;
  }

  let start = 0,
    end = llVals.length - 1;

  while (start <= end) {
    const startVal = llVals[start];
    const endVal = llVals[end];

    if (startVal === endVal) {
      start++;
      end--;
    } else return false;
  }

  return true;
};

// refer: https://leetcode.com/problems/palindrome-linked-list/discuss/1137027/JS-Python-Java-C%2B%2B-or-Easy-Floyd's-%2B-Reversal-Solution-w-Explanation
var isPalindrome = function (head) {
  let slow = head,
    fast = head,
    prev,
    temp;
  while (fast && fast.next) (slow = slow.next), (fast = fast.next.next);
  (prev = slow), (slow = slow.next), (prev.next = null);
  while (slow) (temp = slow.next), (slow.next = prev), (prev = slow), (slow = temp);
  (fast = head), (slow = prev);
  while (slow)
    if (fast.val !== slow.val) return false;
    else (fast = fast.next), (slow = slow.next);
  return true;
};
