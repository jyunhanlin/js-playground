type List = Node[];
type Flag = 'Placement' | 'Deletion';

interface Node {
  key: string;
  flag?: Flag;
  index?: number;
}

function diff(before: List, after: List): List {
  let lastPlacedIndex = 0;
  const result: List = [];

  const beforeMap = new Map<string, Node>();

  before.forEach((node, i) => {
    node.index = i;
    beforeMap.set(node.key, node);
  });

  for (let i = 0; i < after.length; i += 1) {
    const afterNode = after[i];
    afterNode.index = i;
    const beforeNode = beforeMap.get(afterNode.key);

    if (beforeNode) {
      beforeMap.delete(beforeNode.key);

      const oldIndex = beforeNode.index as number;
      if (oldIndex < lastPlacedIndex) {
        afterNode.flag = 'Placement';
        result.push(afterNode);
        continue;
      } else {
        lastPlacedIndex = oldIndex;
      }
    } else {
      afterNode.flag = 'Placement';
      result.push(afterNode);
    }
  }

  beforeMap.forEach((node) => {
    node.flag = 'Deletion';
    result.push(node);
  });

  return result;
}
