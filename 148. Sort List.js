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
var sortList = function (head) {
  if (!head) return null;

  let cur = head;
  const tempSortList = [];

  let result;

  while (cur) {
    tempSortList.push(cur.val);

    cur = cur.next;
  }

  tempSortList.sort((a, b) => a - b);

  for (let i = 0; i < tempSortList.length; i += 1) {
    if (i === 0) {
      result = new ListNode(tempSortList[i]);

      cur = result;
    } else {
      const tempCur = new ListNode(tempSortList[i]);
      cur.next = tempCur;
      cur = cur.next;
    }
  }

  return result;
};
