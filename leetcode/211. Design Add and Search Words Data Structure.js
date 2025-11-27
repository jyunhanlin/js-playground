class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

var WordDictionary = function () {
  this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;
  for (let char of word) {
    if (!node.children[char]) node.children[char] = new TrieNode();
    node = node.children[char];
  }
  node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const dfs = (node, i) => {
    if (i === word.length) return node.isEnd;
    const char = word[i];
    if (char === '.') {
      for (let child of Object.values(node.children)) {
        if (dfs(child, i + 1)) return true;
      }
      return false;
    } else {
      if (!node.children[char]) return false;
      return dfs(node.children[char], i + 1);
    }
  };
  return dfs(this.root, 0);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
