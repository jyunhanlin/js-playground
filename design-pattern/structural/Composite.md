# Composite Pattern

Organize objects into a tree where leaves and containers share the same interface, so the client can treat them uniformly. A "group" of things is itself a "thing" — recursively.

## Core Roles

| Role | Description |
|------|-------------|
| **Component** | The interface shared by leaves and composites |
| **Leaf** | A primitive object with no children |
| **Composite** | A container that holds children (leaves or other composites) |

The composite delegates operations to its children and aggregates the results — that recursion is what makes the pattern work.

## Example 1: File System

A directory contains files and other directories. Both should support the same operations: name, count, size, render tree.

```js
// Component: shared shape
class FSNode {
  getName() { throw new Error('not implemented'); }
  count() { throw new Error('not implemented'); }
  size() { throw new Error('not implemented'); }
  tree(indent) { throw new Error('not implemented'); }
}

// Leaf
class File extends FSNode {
  constructor(name, size) {
    super();
    this.name = name;
    this._size = size;
  }
  getName() { return this.name; }
  count() { return 1; }
  size() { return this._size; }
  tree(indent) {
    return `${indent}${this.name} (${this._size} bytes)\n`;
  }
}

// Composite
class Folder extends FSNode {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }
  add(node) {
    this.children.push(node);
    return this;
  }
  remove(node) {
    this.children = this.children.filter(c => c !== node);
  }
  getName() { return this.name; }

  // Delegate to children, aggregate results
  count() {
    return this.children.reduce((sum, c) => sum + c.count(), 0);
  }
  size() {
    return this.children.reduce((sum, c) => sum + c.size(), 0);
  }
  tree(indent) {
    let out = `${indent}+ ${this.name}/\n`;
    for (const child of this.children) {
      out += child.tree(indent + '  ');
    }
    return out;
  }
}
```

### Usage

```js
const root = new Folder('root');
root.add(new File('README.md', 1024));
root.add(new File('LICENSE', 512));

const docs = new Folder('documents');
docs.add(new File('index.html', 2048));
docs.add(new File('config.txt', 1536));
root.add(docs);

console.log(root.tree(''));
// + root/
//   README.md (1024 bytes)
//   LICENSE (512 bytes)
//   + documents/
//     index.html (2048 bytes)
//     config.txt (1536 bytes)

console.log('Total files:', root.count()); // 4
console.log('Total size:', root.size());   // 5120
```

The client never writes `if (node instanceof File)` — it just calls methods on the interface and the tree handles itself.

## Example 2: Shape Group (Graphic Editor)

Basic shapes can be grouped, and groups can be grouped again — moving the outer group moves everything inside.

```js
class Shape {
  move(dx, dy) { throw new Error('not implemented'); }
  display(indent = '') { throw new Error('not implemented'); }
}

class Circle extends Shape {
  constructor(x, y, radius) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  display(indent = '') {
    console.log(`${indent}Circle at (${this.x}, ${this.y})`);
  }
}

class Square extends Shape {
  constructor(x, y, side) {
    super();
    this.x = x;
    this.y = y;
    this.side = side;
  }
  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  display(indent = '') {
    console.log(`${indent}Square at (${this.x}, ${this.y})`);
  }
}

class Group extends Shape {
  constructor() {
    super();
    this.children = [];
  }
  add(shape) {
    this.children.push(shape);
    return this;
  }
  move(dx, dy) {
    for (const child of this.children) child.move(dx, dy);
  }
  display(indent = '') {
    console.log(`${indent}Group {`);
    for (const child of this.children) child.display(indent + '  ');
    console.log(`${indent}}`);
  }
}
```

### Usage

```js
const canvas = new Group();

const subGroup = new Group();
subGroup.add(new Square(100, 110, 40));
subGroup.add(new Circle(200, 210, 25));

canvas.add(new Circle(10, 20, 15));
canvas.add(subGroup);

console.log('--- Initial ---');
canvas.display();
// Group {
//   Circle at (10, 20)
//   Group {
//     Square at (100, 110)
//     Circle at (200, 210)
//   }
// }

canvas.move(100, -50);
console.log('--- After moving ---');
canvas.display();
// Group {
//   Circle at (110, -30)
//   Group {
//     Square at (200, 60)
//     Circle at (300, 160)
//   }
// }
```

A single `canvas.move()` propagates through arbitrary nesting depth — the recursion is hidden inside `Group.move()`.

## Composite + Visitor

Composite provides the **structure**, Visitor provides the **operations**. They pair naturally: see `Visitor.md` (file system traversal example) — that file uses the same `Directory + File` shape as Example 1 here, but adds visitors to keep operations separate from the data.

| | Composite | Visitor |
|---|---|---|
| **Solves** | How to organize tree data | How to apply operations to a tree |
| **Adds new** | Element types easily | Operations easily |

When both axes change, you typically need both patterns.

## Where You See It

- **DOM tree** — every `Node` shares the same interface; an `Element` is itself a `Node` and contains other `Node`s
- **React component tree** — `<App>` contains `<Layout>` contains `<Button>`; all are `ReactElement`
- **AST** — language parsers produce trees of `Expression`/`Statement` nodes that can contain other nodes
- **Game scene graphs** — entities can be grouped into transformable hierarchies

## Trade-offs

- **Pro**: Client treats single objects and groups identically — no type checks
- **Pro**: Adding new leaf or composite types doesn't break existing code
- **Pro**: Recursive operations are expressed naturally
- **Con**: The shared interface can become awkward when leaves and composites need very different methods (e.g. `add`/`remove` only makes sense for composites)

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/composite/
