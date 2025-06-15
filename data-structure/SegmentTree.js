class SegmentTree {
  // Segment tree node
  static SegmentNode = class {
    constructor(l, r, mergeValue) {
      this.l = l;
      this.r = r;
      this.mergeValue = mergeValue;
      this.lazyAdd = 0;
      this.lazyAssign = 0;
      this.hasLazyAssign = false;
      this.left = null;
      this.right = null;
    }
  };

  constructor(start, end, defaultValue, type) {
    if (type !== 'sum' && type !== 'max' && type !== 'min') {
      throw new Error('Invalid type, must be sum, max, or min');
    }
    this.type = type;
    this.defaultValue = defaultValue;
    let rootMergeValue = this.computeRangeValue(start, end, defaultValue);
    this.root = new SegmentTree.SegmentNode(start, end, rootMergeValue);
  }

  // Calculate mergeValue for range [l, r] when assigned value val
  computeRangeValue(l, r, val) {
    if (this.type === 'sum') {
      return (r - l + 1) * val;
    } else {
      return val;
    }
  }

  // Update mergeValue based on range length, add delta
  applyAddToValue(node, delta) {
    if (this.type === 'sum') {
      return node.mergeValue + (node.r - node.l + 1) * delta;
    } else {
      return node.mergeValue + delta;
    }
  }

  // Merge values from left and right child nodes based on type
  merge(leftVal, rightVal) {
    if (this.type === 'sum') {
      return leftVal + rightVal;
    } else if (this.type === 'max') {
      return Math.max(leftVal, rightVal);
    } else if (this.type === 'min') {
      return Math.min(leftVal, rightVal);
    }
    throw new Error('Invalid type');
  }

  // Dynamically create segment tree nodes
  initChildrenIfNeeded(node) {
    if (node.l === node.r) return;
    const mid = node.l + Math.floor((node.r - node.l) / 2);
    if (!node.left) {
      const leftMergeValue = this.computeRangeValue(node.l, mid, this.defaultValue);
      node.left = new SegmentTree.SegmentNode(node.l, mid, leftMergeValue);
    }
    if (!node.right) {
      const rightMergeValue = this.computeRangeValue(mid + 1, node.r, this.defaultValue);
      node.right = new SegmentTree.SegmentNode(mid + 1, node.r, rightMergeValue);
    }
  }

  // Push down lazy tags to ensure child nodes' data is correct
  pushDown(node) {
    if (node.hasLazyAssign) {
      this.applyAssign(node.left, node.lazyAssign);
      this.applyAssign(node.right, node.lazyAssign);
      node.hasLazyAssign = false;
      node.lazyAssign = 0;
    }
    if (node.lazyAdd !== 0) {
      this.applyAdd(node.left, node.lazyAdd);
      this.applyAdd(node.right, node.lazyAdd);
      node.lazyAdd = 0;
    }
  }

  // Push assignment lazy tag to child nodes
  applyAssign(child, val) {
    child.hasLazyAssign = true;
    child.lazyAssign = val;
    child.lazyAdd = 0;
    child.mergeValue = this.computeRangeValue(child.l, child.r, val);
  }

  // Push addition lazy tag to child nodes
  applyAdd(child, delta) {
    if (child.hasLazyAssign) {
      child.lazyAssign += delta;
      child.mergeValue = this.computeRangeValue(child.l, child.r, child.lazyAssign);
    } else {
      child.lazyAdd += delta;
      child.mergeValue = this.applyAddToValue(child, delta);
    }
  }

  // Single point assignment: assign value val to index
  update(index, val) {
    this.rangeUpdate(index, index, val);
  }

  // Range assignment: assign value val to closed interval [qL, qR]
  rangeUpdate(qL, qR, val) {
    this._rangeUpdate(this.root, qL, qR, val);
  }

  _rangeUpdate(node, qL, qR, val) {
    if (node.r < qL || node.l > qR) {
      throw new Error('Invalid update range');
    }
    if (qL <= node.l && node.r <= qR) {
      node.hasLazyAssign = true;
      node.lazyAssign = val;
      node.lazyAdd = 0;
      node.mergeValue = this.computeRangeValue(node.l, node.r, val);
      return;
    }

    this.initChildrenIfNeeded(node);
    this.pushDown(node);

    const mid = node.l + Math.floor((node.r - node.l) / 2);
    if (qR <= mid) {
      this._rangeUpdate(node.left, qL, qR, val);
    } else if (qL > mid) {
      this._rangeUpdate(node.right, qL, qR, val);
    } else {
      this._rangeUpdate(node.left, qL, mid, val);
      this._rangeUpdate(node.right, mid + 1, qR, val);
    }
    node.mergeValue = this.merge(node.left.mergeValue, node.right.mergeValue);
  }

  // Single point addition: add delta (can be negative) to index
  add(index, delta) {
    this.rangeAdd(index, index, delta);
  }

  // Range addition: add delta (can be negative) to closed interval [qL, qR]
  rangeAdd(qL, qR, delta) {
    this._rangeAdd(this.root, qL, qR, delta);
  }

  _rangeAdd(node, qL, qR, delta) {
    if (node.r < qL || node.l > qR) {
      throw new Error('Invalid update range');
    }
    if (qL <= node.l && node.r <= qR) {
      if (node.hasLazyAssign) {
        node.lazyAssign += delta;
        node.mergeValue = this.computeRangeValue(node.l, node.r, node.lazyAssign);
      } else {
        node.lazyAdd += delta;
        node.mergeValue = this.applyAddToValue(node, delta);
      }
      return;
    }
    this.initChildrenIfNeeded(node);
    this.pushDown(node);

    const mid = node.l + Math.floor((node.r - node.l) / 2);
    if (qL <= mid) {
      this._rangeAdd(node.left, qL, qR, delta);
    }
    if (qR > mid) {
      this._rangeAdd(node.right, qL, qR, delta);
    }
    node.mergeValue = this.merge(node.left.mergeValue, node.right.mergeValue);
  }

  // Query aggregate value for closed interval [qL, qR]
  query(qL, qR) {
    return this._query(this.root, qL, qR);
  }

  _query(node, qL, qR) {
    if (node.r < qL || node.l > qR) {
      throw new Error('Invalid query range');
    }
    if (qL <= node.l && node.r <= qR) {
      return node.mergeValue;
    }

    this.initChildrenIfNeeded(node);
    this.pushDown(node);

    const mid = node.l + Math.floor((node.r - node.l) / 2);
    if (qR <= mid) {
      return this._query(node.left, qL, qR);
    } else if (qL > mid) {
      return this._query(node.right, qL, qR);
    } else {
      let leftResult = this._query(node.left, qL, mid);
      let rightResult = this._query(node.right, mid + 1, qR);
      return this.merge(leftResult, rightResult);
    }
  }
}
