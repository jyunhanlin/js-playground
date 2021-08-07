/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  if (!head) return null;

  let cur = head;
  let less, lessCur;
  let ge, geCur;

  while (cur) {
    const newNode = new ListNode(cur.val);
    if (cur.val >= x) {
      if (!ge) {
        ge = newNode;
        geCur = ge;
      } else {
        geCur.next = newNode;
        geCur = geCur.next;
      }
    } else {
      if (!less) {
        less = newNode;
        lessCur = less;
      } else {
        lessCur.next = newNode;
        lessCur = lessCur.next;
      }
    }
    cur = cur.next;
  }

  if (lessCur && ge) lessCur.next = ge;

  return less ? less : ge;
};
