# Command Pattern

Encapsulate a request as an object so it can be stored, passed around, queued, undone, and redone. The invoker doesn't know what the operation does or who executes it — it just calls `execute()`.

## Core Roles

| Role | Description |
|------|-------------|
| **Command** | Interface with `execute()` and optionally `undo()` |
| **Concrete Command** | Records all info needed to execute and reverse the operation |
| **Receiver** | The object that actually performs the work |
| **Invoker** | Manages commands — triggers execution, maintains history/queue |

## Example 1: Text Editor with Undo/Redo

Each edit is a command object that knows how to execute and reverse itself. The editor maintains a history stack and a redo stack.

### Receiver

```js
class Document {
  constructor() {
    this.content = '';
  }
  insert(pos, text) {
    this.content = this.content.slice(0, pos) + text + this.content.slice(pos);
  }
  delete(pos, length) {
    this.content = this.content.slice(0, pos) + this.content.slice(pos + length);
  }
}
```

### Commands

```js
class InsertCommand {
  constructor(doc, pos, text) {
    this.doc = doc;
    this.pos = pos;
    this.text = text;
  }
  execute() {
    this.doc.insert(this.pos, this.text);
  }
  undo() {
    this.doc.delete(this.pos, this.text.length);
  }
}

class DeleteCommand {
  constructor(doc, pos, length) {
    this.doc = doc;
    this.pos = pos;
    this.length = length;
    this.deletedText = '';
  }
  execute() {
    // save deleted text before deleting, so undo can restore it
    this.deletedText = this.doc.content.slice(this.pos, this.pos + this.length);
    this.doc.delete(this.pos, this.length);
  }
  undo() {
    this.doc.insert(this.pos, this.deletedText);
  }
}
```

### Invoker

```js
class TextEditor {
  constructor() {
    this.doc = new Document();
    this.history = [];
    this.redoStack = [];
  }
  run(cmd) {
    cmd.execute();
    this.history.push(cmd);
    this.redoStack.length = 0; // new action clears redo
  }
  undo() {
    const cmd = this.history.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
  }
  redo() {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.history.push(cmd);
  }
}
```

### Usage

```js
const editor = new TextEditor();
const doc = editor.doc;

editor.run(new InsertCommand(doc, 0, 'Hello '));
editor.run(new InsertCommand(doc, 6, 'World'));
console.log(doc.content); // "Hello World"

editor.run(new DeleteCommand(doc, 6, 5));
console.log(doc.content); // "Hello "

editor.undo();
console.log(doc.content); // "Hello World"

editor.redo();
console.log(doc.content); // "Hello "
```

## Example 2: Task Queue

Commands can be queued and executed later — the scheduler doesn't know what each task does.

```js
class SendEmailTask {
  constructor(to) { this.to = to; }
  execute() { console.log(`Send email to ${this.to}`); }
}

class GenerateReportTask {
  constructor(name) { this.name = name; }
  execute() { console.log(`Generate report: ${this.name}`); }
}

class CleanupTask {
  execute() { console.log('Clean up temp files'); }
}

class TaskScheduler {
  constructor() { this.queue = []; }
  add(task) { this.queue.push(task); }
  runAll() {
    while (this.queue.length) {
      this.queue.shift().execute();
    }
  }
}
```

```js
const scheduler = new TaskScheduler();
scheduler.add(new SendEmailTask('alice@example.com'));
scheduler.add(new GenerateReportTask('Monthly Sales'));
scheduler.add(new CleanupTask());
scheduler.runAll();
// Send email to alice@example.com
// Generate report: Monthly Sales
// Clean up temp files
```

## Command vs Strategy

| | Strategy | Command |
|---|---|---|
| **Encapsulates** | An algorithm / approach | A request / operation |
| **Lifecycle** | Pick one, use it, done | Store, queue, undo, redo |
| **Purpose** | Swap interchangeable behaviors | Make operations manageable as data |

Strategy = "choose a way to do it". Command = "turn an action into an object you can manage".

## Trade-offs

- **Pro**: Decouples invoker from receiver — invoker only knows `execute()`
- **Pro**: Operations become data — enables history, queue, undo/redo, logging
- **Con**: One class per operation — overhead for simple cases

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/command/
