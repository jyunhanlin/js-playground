# Iterator Pattern

Provide a uniform traversal interface for a collection so the client doesn't need to know its internal structure. Most useful for complex data structures (trees, graphs) that support multiple traversal orders.

## Core Roles

| Role | Description |
|------|-------------|
| **Iterator** | Defines `hasNext()` and `next()` interface |
| **Concrete Iterator** | Implements a specific traversal strategy (BFS, DFS, etc.) |
| **Aggregate** | The collection/structure being traversed |

## Example: Org Chart Tree Traversal

A company org chart is a tree. HR needs to notify everyone, but different scenarios require different traversal orders:
- **BFS (by level)**: notify all VPs, then all managers, then all staff
- **DFS (by department)**: finish one department before moving to the next

### Data structure

```js
class Employee {
  constructor(name, title) {
    this.name = name;
    this.title = title;
    this.subordinates = [];
  }
  addSubordinate(e) {
    this.subordinates.push(e);
    return this;
  }
  toString() {
    return `${this.title}: ${this.name}`;
  }
}
```

### BFS iterator (queue)

```js
class BreadthFirstIterator {
  constructor(root) {
    this.queue = [root];
  }
  hasNext() {
    return this.queue.length > 0;
  }
  next() {
    const current = this.queue.shift();
    this.queue.push(...current.subordinates);
    return current;
  }
}
```

### DFS iterator (stack)

```js
class DepthFirstIterator {
  constructor(root) {
    this.stack = [root];
  }
  hasNext() {
    return this.stack.length > 0;
  }
  next() {
    const current = this.stack.pop();
    // push in reverse so left children are visited first
    for (let i = current.subordinates.length - 1; i >= 0; i--) {
      this.stack.push(current.subordinates[i]);
    }
    return current;
  }
}
```

### Usage

Same client code, different traversal order — just swap the iterator:

```js
const ceo = new Employee('Zhang', 'CEO');
const vpTech = new Employee('Li', 'Tech VP');
const vpSales = new Employee('Wang', 'Sales VP');
ceo.addSubordinate(vpTech).addSubordinate(vpSales);
vpTech.addSubordinate(new Employee('Zhao', 'Tech Manager'));
vpTech.addSubordinate(new Employee('Qian', 'Tech Manager'));
vpSales.addSubordinate(new Employee('Sun', 'Sales Manager'));

// BFS: by level
const bfs = new BreadthFirstIterator(ceo);
while (bfs.hasNext()) console.log(bfs.next().toString());
// CEO: Zhang → Tech VP: Li → Sales VP: Wang → Tech Manager: Zhao → Tech Manager: Qian → Sales Manager: Sun

// DFS: by department
const dfs = new DepthFirstIterator(ceo);
while (dfs.hasNext()) console.log(dfs.next().toString());
// CEO: Zhang → Tech VP: Li → Tech Manager: Zhao → Tech Manager: Qian → Sales VP: Wang → Sales Manager: Sun
```

## Why Not Just Use Recursion?

A recursive function works, but:

1. **Traversal and business logic are coupled** — a recursive `notifyAll()` can only do one thing; to change behavior you rewrite the whole function
2. **Locked to one traversal order** — recursion is inherently DFS; adding BFS means a completely different function

Iterator separates *how to traverse* from *what to do with each element*.

For simple arrays/lists, `for...of` is enough — Iterator pattern pays off on trees, graphs, and multi-strategy traversal.

## JS Native: Symbol.iterator

In JavaScript, any object with `[Symbol.iterator]()` works with `for...of` and spread syntax:

```js
class OrgChart {
  constructor(root) {
    this.root = root;
  }
  // default to BFS
  [Symbol.iterator]() {
    const queue = [this.root];
    return {
      next() {
        if (queue.length === 0) return { done: true };
        const current = queue.shift();
        queue.push(...current.subordinates);
        return { value: current, done: false };
      },
    };
  }
}

const org = new OrgChart(ceo);
for (const emp of org) {
  console.log(emp.toString());
}
```

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/iterator/
