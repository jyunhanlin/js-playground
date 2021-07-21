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
  // collect all val into Object
  // transfer Object to list

  let cur = head;
  const myMap = new Map();
  let result = null,
    resultCur;

  while (cur) {
    const val = myMap.get(cur.val);
    if (val) myMap.set(cur.val, val + 1);
    else myMap.set(cur.val, 1);

    cur = cur.next;
  }

  myMap.forEach((value, key) => {
    if (value === 1) {
      const newNode = new ListNode(key);
      if (!result) {
        result = newNode;
        resultCur = result;
      } else {
        resultCur.next = newNode;
        resultCur = resultCur.next;
      }
    }
  });

  return result;
};
