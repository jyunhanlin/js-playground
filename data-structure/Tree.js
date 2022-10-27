class Node {
  constructor(data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {}

  insert(value) {
    const newNode = new Node(value);

    if (!this.root) this.root = newNode;
    else this.insertNode(this.root, newNode);
  }

  insertNode(root, newNode) {
    if (newNode.vale < root.value)
      !root.left ? (root.left = newNode) : this.insertNode(root.left, newNode);
    else !root.right ? (root.right = newNode) : this.insertNode(root.right, newNode);
  }

  removeNode(root, value) {
    if (!root) return null;

    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
      return root;
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
      return root;
    } else {
      if (!root.left && !root.right) {
        root = null;
        return root;
      }

      if (root.left && !root.right) {
        root = root.left;
        return root;
      }

      if (!root.left && root.right) {
        root = root.right;
        return root;
      }

      let minRight = this.findMinNode(root.right);

      root.value = minRight.value;
      root.right = this.removeNode(root.right, minRight.value);

      return root;
    }
  }

  remove(value) {
    if (this.root) this.removeNode(this.root, value);
  }

  findMinNode(root) {
    if (!root.left) return root;
    else return this.findMinNode(root.left);
  }

  searchNode(root, value) {
    if (!root) return null;

    if (value < root.value) return this.searchNode(root.left, value);
    else if (value > root.value) return this.searchNode(root.right, value);

    return root;
  }

  search(value) {
    if (!this.root) return false;
    else Boolean(this.searchNode(this.root, value));
  }

  preOrder(root, fn) {
    if (root) {
      fn(root.value);
      this.preOrder(root.left, fn);
      this.preOrder(root.right, fn);
    }
  }

  inOrder(root, fn) {
    if (root) {
      this.preOrder(root.left, fn);
      fn(root.value);
      this.preOrder(root.right, fn);
    }
  }

  postOrder(root, fn) {
    if (root) {
      this.preOrder(root.left, fn);
      this.preOrder(root.right, fn);
      fn(root.value);
    }
  }
}
