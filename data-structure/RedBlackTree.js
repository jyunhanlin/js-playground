/**
 * ## Red-black tree can transform from 2-3-4 tree
 * 2-node -> a black node
 * 3-node -> a black node and a red node child
 * 4-node -> a black node and two red node children
 *
 * ## The features of red-black tree
 * 1. Node is red or black
 * 2. Root node is black node
 * 3. Each lead node is black node
 * 4. Each red node has two black node children
 * 5. From any node to some left node, the number of black nodes are equal for all paths
 *
 * ## Why uses red-black tree
 * 1. When there is unbalance of the tree, rotate at most 3 times to become balance (when insert or delete)
 * 2. more efficiency than the AVL tree
 */

const RED = 'RED';
const BLACK = 'BLACK';
class RedBlackNode {
  constructor(val, parent, left = null, right = null, color = RED) {
    this.val = val;
    this.parent = parent;
    this.left = left;
    this.right = right;
    this.color = color;
  }
}

class RedBlackTree {
  constructor(list) {
    this.root = null;
    if (Object.prototype.toString.call(list) === '[object Array]') {
      list.forEach((v) => {
        this.insert(v);
      });
    }
  }

  #setColor(node, color) {
    node.color = color;
  }

  #leftRotate(node) {
    if (!node) return;
    const r = node.right;
    node.right = r.left;
    if (r.left !== null) r.left.parent = node;
    r.parent = node.parent;
    if (node.parent === null) this.root = r;
    else if (node.parent.left === node) node.parent.left = r;
    else if (node.parent.right === node) node.parent.right = r;
    r.left = node;
    node.parent = r;
  }

  #rightRotate(node) {
    if (!node) return;
    const l = node.left;
    node.left = l.right;
    if (l.right !== null) l.right.parent = node;
    l.parent = node.parent;
    if (node.parent === null) this.root = l;
    else if (node.parent.left === node) node.parent.left = l;
    else if (node.parent.right === node) node.parent.left = r;
    l.right = node;
    node.parent = l;
  }

  insert(val) {
    let t = this.root;
    if (t === null) {
      this.root = new RedBlackNode(val, null, null, null, BLACK);
      return this.root;
    }

    let parent = t.parent;
    do {
      parent = t;
      let cmp = val - t.val;
      if (cmp > 0) t = t.right;
      else t = t.left;
    } while (t !== null);

    const newNode = new RedBlackNode(val, parent);
    if (newNode.val > parent.val) parent.right = newNode;
    else parent.left = newNode;

    this.#fixAfterInsertNode(newNode);
    return this.root;
  }

  #fixAfterInsertNode(node) {
    node.color = RED;

    while (node !== null && node !== this.root && node.parent.color === RED) {
      if (this.#getParent(node) === this.#getLeft(this.#getParent(this.#getParent(node)))) {
        let uncle = this.#getRight(this.#getParent(this.#getParent(node)));

        if (this.#getColor(uncle) === RED) {
          const grandpa = this.#getParent(this.#getParent(node));

          this.#setColor(this.#getParent(node), BLACK);
          this.#setColor(uncle, BLACK);
          this.#setColor(grandpa, RED);

          node = grandpa;
        } else {
          if (node === this.#getRight(this.#getParent(node))) {
            node = this.#getParent(node);

            this.#leftRotate(node);
          }

          const grandpa = this.#getParent(this.#getParent(node));
          this.#setColor(this.#getParent(node), BLACK);
          this.#setColor(grandpa, RED);

          this.#rightRotate(grandpa);
        }
      } else {
        let uncle = this.#getLeft(this.#getParent(this.#getParent(node)));

        if (this.#getColor(uncle) === RED) {
          const grandpa = this.#getParent(this.#getParent(node));

          this.#setColor(this.#getParent(node), BLACK);
          this.#setColor(uncle, BLACK);
          this.#setColor(grandpa, RED);

          node = grandpa;
        } else {
          if (node === this.#getLeft(this.#getParent(node))) {
            node = this.#getParent(node);

            this.#rightRotate(node);
          }

          const grandpa = this.#getParent(this.#getParent(node));
          this.#setColor(this.#getParent(node), BLACK);
          this.#setColor(grandpa, RED);

          this.#leftRotate(grandpa);
        }
      }
    }

    this.#setColor(this.root, BLACK);
  }

  #getParent(node) {
    return node !== null ? node.parent : null;
  }

  #getLeft(node) {
    return node !== null ? node.left : null;
  }

  #getRight(node) {
    return node !== null ? node.right : null;
  }

  #getColor(node) {
    return node === null ? BLACK : node.color;
  }

  findNode(val) {
    let p = this.root;
    while (p) {
      if (val < p.val) {
        p = p.left;
      } else if (val > p.val) {
        p = p.right;
      } else {
        break;
      }
    }
    return p;
  }

  predecessor(node) {
    if (!node) return null;
    else if (node.left) {
      let p = node.left;
      while (p.right) {
        p = p.right;
      }
      return p;
    } else {
      let p = node.parent;
      let c = node;
      while (p.left === c && p) {
        c = p;
        p = p.parent;
        return p;
      }
      return null;
    }
  }

  successor(node) {
    if (!node) return null;
    else if (node.right) {
      let p = node.right;
      while (p.left) {
        p = p.left;
      }
      return p;
    } else {
      let p = node.parent;
      let c = node;
      while (p.right === c && p) {
        c = p;
        p = p.parent;
        return p;
      }
      return null;
    }
  }

  remove(val) {
    const node = this.findNode(val);
    if (!node) return null;
    const oldVal = node.val;
    this.deleteNode(node);
    return oldVal;
  }

  deleteNode(node) {
    if (node.left && node.right) {
      const successor = this.successor(node);
      node.val = successor.val;
      node = successor;
    }

    if (node.parent === null) {
      this.root = null;
    }

    let replacement = node.left ? node.left : node.right;
    if (replacement) {
      replacement.parent = node.parent;

      if (node.parent.left === node) {
        node.parent.left = replacement;
      } else {
        node.parent.right = replacement;
      }

      node.left = null;
      node.right = null;
      node.parent = null;

      if (this.#getColor(node) === BLACK) {
        this.#fixAfterDeleteNode(replacement);
      }
    } else {
      if (this.#getColor(node) === BLACK) {
        this.#fixAfterDeleteNode(node);
      }

      if (node.parent.left === node) {
        node.parent.left = null;
      } else if (node.parent.right === node) {
        node.parent.right = null;
      }

      node.parent = null;
    }
  }
  /**
   * 删除时调整树结构
   * @author ywanzhou
   * @param {RedBlackNode} x
   */
  #fixAfterDeleteNode(x) {
    while (x !== this.root && this.#getColor(x) === BLACK) {
      if (x === this.#getLeft(this.#getParent(x))) {
        let rNode = this.#getRight(this.#getParent(x));

        if (this.#getColor(rNode) === RED) {
          this.#setColor(rNode, BLACK);
          this.#setColor(this.#getParent(rNode), RED);

          this.#leftRotate(this.#getParent(x));

          rNode = this.#getRight(this.#getParent(x));
        }

        if (this.#getLeft(rNode) !== null || this.#getRight(rNode) !== null) {
          if (this.#getRight(rNode) === null) {
            this.#setColor(this.#getLeft(rNode), BLACK);

            this.#setColor(rNode, RED);

            this.#rightRotate(rNode);

            rNode = this.#getRight(this.#getParent(x));
          }

          this.#setColor(rNode, this.#getColor(this.#getParent(x)));

          this.#setColor(this.#getParent(x), BLACK);

          this.#setColor(this.#getRight(rNode), BLACK);

          this.#leftRotate(this.#getParent(x));

          break;
        } else {
          this.#setColor(rNode, RED);

          x = this.#getParent(x);
        }
      } else {
        let lNode = this.#getLeft(this.#getParent(x));
        if (this.#getColor(lNode) === RED) {
          this.#setColor(lNode, BLACK);
          this.#setColor(this.#getParent(lNode), RED);
          this.#rightRotate(this.#getParent(x));
          lNode = this.#getLeft(this.#getParent(x));
        }
        if (this.#getLeft(lNode) !== null || this.#getRight(lNode) !== null) {
          if (this.#getLeft(lNode) === null) {
            this.#setColor(this.#getRight(lNode), BLACK);
            this.#setColor(lNode, RED);
            this.#leftRotate(lNode);
            lNode = this.#getLeft(this.#getParent(x));
          }
          this.#setColor(lNode, this.#getColor(this.#getParent(x)));
          this.#setColor(this.#getParent(x), BLACK);
          this.#setColor(this.#getLeft(lNode), BLACK);
          this.#rightRotate(this.#getParent(x));
          break;
        } else {
          this.#setColor(lNode, RED);
          x = this.#getParent(x);
        }
      }
    }

    this.#setColor(x, BLACK);
  }
}

function inorder(root, deep = 1) {
  if (!root) return;
  let tab = '';
  for (let i = 1; i < deep; i++) {
    tab += '\t';
  }
  root.left && inorder(root.left, deep + 1);
  console.log('%c' + tab + root.val, root.color[0] === 'R' ? 'color:red' : 'color:black');
  root.right && inorder(root.right, deep + 1);
}
let arr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 1];
const tree = new RedBlackTree(arr);

inorder(tree.root);
tree.remove(5);
inorder(tree.root);
tree.remove(6);
inorder(tree.root);
tree.remove(7);
inorder(tree.root);
tree.remove(8);
inorder(tree.root);
tree.remove(9);
inorder(tree.root);
