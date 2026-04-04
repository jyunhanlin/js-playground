# Visitor Pattern

Separate operations from the data structure they act on. The data structure (elements) stays stable; new operations are added as independent "visitor" classes without modifying existing elements.

## Core Roles

| Role | Description |
|------|-------------|
| **Element** | Data node that accepts a visitor via `accept(visitor)` |
| **Visitor** | Encapsulates an operation, with a `visit` method per element type |
| **Double Dispatch** | `element.accept(visitor)` → `visitor.visitXxx(element)` — dispatches on both element type and visitor type |

## When to Use

Both conditions must hold:

1. **Data structure is stable** — element types rarely change
2. **Operations change frequently** — new operations are added often

If the opposite is true (new element types added often), every visitor must be updated — just put methods on the elements instead.

## Example: File System Operations

A file system has two node types: `File` and `Directory`. Multiple operations (size calculation, file search, tree printing) are needed — instead of bloating the node classes, each operation becomes a visitor.

### Elements

```js
class File {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  accept(visitor) {
    visitor.visitFile(this);
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  add(node) {
    this.children.push(node);
    return this;
  }
  accept(visitor) {
    visitor.visitDirectory(this);
    for (const child of this.children) {
      child.accept(visitor);
    }
  }
}
```

`accept` is the double dispatch entry point: `File` calls `visitor.visitFile(this)`, `Directory` calls `visitor.visitDirectory(this)`.

### Visitors

```js
// Visitor 1: Calculate total size
class SizeCalculator {
  constructor() {
    this.totalSize = 0;
  }
  visitFile(file) {
    this.totalSize += file.size;
  }
  visitDirectory(dir) {
    // directories don't contribute size
  }
}

// Visitor 2: Search files by keyword
class FileSearcher {
  constructor(keyword) {
    this.keyword = keyword;
    this.results = [];
  }
  visitFile(file) {
    if (file.name.includes(this.keyword)) {
      this.results.push(file.name);
    }
  }
  visitDirectory(dir) {
    // only search files
  }
}

// Visitor 3: Print tree structure
class TreePrinter {
  constructor() {
    this.depth = 0;
  }
  visitFile(file) {
    console.log('  '.repeat(this.depth) + `[File] ${file.name} (${file.size}KB)`);
  }
  visitDirectory(dir) {
    console.log('  '.repeat(this.depth) + `[Dir] ${dir.name}`);
    this.depth++;
  }
}
```

### Usage

Three different operations on the same structure — zero changes to `File` or `Directory`:

```js
const root = new Directory('project');
const src = new Directory('src');
src.add(new File('Main.java', 15));
src.add(new File('Utils.java', 8));
const docs = new Directory('docs');
docs.add(new File('README.md', 3));
root.add(src);
root.add(docs);
root.add(new File('pom.xml', 2));

// Operation 1: total size
const calc = new SizeCalculator();
root.accept(calc);
console.log('Total size:', calc.totalSize + 'KB'); // 28KB

// Operation 2: search .java files
const searcher = new FileSearcher('.java');
root.accept(searcher);
console.log('Search results:', searcher.results); // ['Main.java', 'Utils.java']

// Operation 3: print tree
console.log('\nDirectory tree:');
const printer = new TreePrinter();
root.accept(printer);
// [Dir] project
//   [Dir] src
//     [File] Main.java (15KB)
//     [File] Utils.java (8KB)
//   [Dir] docs
//     [File] README.md (3KB)
//   [File] pom.xml (2KB)
```

Adding a new operation (e.g. "count file types") only requires a new visitor class — no existing code is modified.

## Trade-offs

- **Pro**: Open/Closed Principle for operations — add new operations without touching elements
- **Con**: Double dispatch is not intuitive, adds indirection
- **Con**: Adding a new element type forces changes to all existing visitors

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/visitor/
