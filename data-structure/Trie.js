class PrefixTreeNode {
  constructor(value) {
    this.children = {};
    this.isEnd = false;
    this.value = value;
  }
}

class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null);
  }

  addWord(str) {
    const addWordHelper = (node) => {
      if (!node.children[str[0]]) {
        node.children[str[0]] = new PrefixTreeNode(str[0]);
        if (str.length === 1) node.children[str[0]].isEnd = true;
        else if (str.length > 1) addWordHelper(node.children[str[0]], str.slice(1));
      }
    };

    addWordHelper(this);
  }

  predictWord(str) {
    const getRemainingTree = (node, remainingStr) => {
      let current = node;
      while (remainingStr) {
        current = current.children[str[0]];
        remainingStr = remainingStr.substr(1);
      }

      return current;
    };

    const allWords = [];

    const allWordsHelper = (node, currentStr) => {
      for (const k in node.children) {
        const child = node.children[k];
        const newStr = currentStr + child.value;
        if (child.isEnd) allWords.push(newStr);

        allWordsHelper(newStr, child);
      }
    };

    const remainingTree = getRemainingTree(this, str);

    if (remainingTree) allWordsHelper(this, str);

    return allWords;
  }
}
