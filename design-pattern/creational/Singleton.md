# Singleton Pattern

Guarantee a class has exactly one instance for the entire app lifecycle, with a global access point. Use sparingly — it's essentially a global variable in disguise.

## Core Roles

| Role | Description |
|------|-------------|
| **Singleton class** | Holds the unique instance, controls its creation |
| **Global accessor** | Static method that returns the instance, creating it if needed |

## Three Key Implementation Concerns

1. **Block external construction** — clients shouldn't be able to call `new`
2. **Global access point** — provide a static `getInstance()` method
3. **Thread/concurrency safety** — in multi-threaded languages, ensure two threads can't create two instances. JS is single-threaded, so this is only a concern when initialization is async (see Variant 2).

## Variant 1: Eager Initialization

Create the instance up front. Simple, no race conditions, but you pay the cost even if the instance is never used.

```js
class DatabaseManager {
  // Declare first, then create in a static block. A field initializer
  // (`static #instance = new DatabaseManager()`) would run the constructor
  // before #instance exists, and the guard below would throw a TypeError.
  static #instance;
  static {
    DatabaseManager.#instance = new DatabaseManager(); // created at class evaluation time
  }

  #connectionInfo;

  constructor() {
    if (DatabaseManager.#instance) {
      throw new Error('Use DatabaseManager.getInstance()');
    }
    this.#connectionInfo = 'mysql://localhost:3306/app';
    console.log(`Connection established: ${this.#connectionInfo}`);
  }

  static getInstance() {
    return DatabaseManager.#instance;
  }

  execute(sql) {
    console.log(`Executing: ${sql}`);
  }
}
```

```js
const db1 = DatabaseManager.getInstance();
const db2 = DatabaseManager.getInstance();
db1.execute('SELECT * FROM users');
console.log(db1 === db2); // true
// Connection established: mysql://localhost:3306/app   ← printed once, at class evaluation
// Executing: SELECT * FROM users
// true

new DatabaseManager(); // Error: Use DatabaseManager.getInstance()
```

## Variant 2: Lazy Initialization

Create the instance only on first use. Saves startup cost and memory if the singleton may never be needed.

```js
class DatabaseManager {
  static #instance = null;
  // JS has no private constructor. A private flag that only getInstance()
  // can set plays that role.
  static #creating = false;
  #connectionInfo;

  constructor() {
    if (!DatabaseManager.#creating) {
      throw new Error('Use DatabaseManager.getInstance()');
    }
    this.#connectionInfo = 'mysql://localhost:3306/app';
    console.log(`Connection established: ${this.#connectionInfo}`);
  }

  static getInstance() {
    if (!DatabaseManager.#instance) {
      DatabaseManager.#creating = true;
      try {
        DatabaseManager.#instance = new DatabaseManager();
      } finally {
        DatabaseManager.#creating = false;
      }
    }
    return DatabaseManager.#instance;
  }

  execute(sql) {
    console.log(`Executing: ${sql}`);
  }
}
```

```js
console.log('before first use');
const db = DatabaseManager.getInstance();
console.log(db === DatabaseManager.getInstance()); // true
// before first use
// Connection established: mysql://localhost:3306/app   ← printed on first use
// true

new DatabaseManager(); // Error: Use DatabaseManager.getInstance()
```

In Java/C++ you'd need double-checked locking to make this thread-safe. In JS, the event loop makes this safe — only one execution context runs at a time — **as long as `getInstance()` is synchronous**.

### Async initialization

If creating the instance needs `await` (e.g. opening a connection), two callers can both see "no instance yet" before either one finishes. The result is two instances. Cache the **promise** instead of the instance:

```js
class AsyncDatabaseManager {
  static #pending = null;

  static getInstance() {
    // the second caller gets the same promise, not a second connection
    AsyncDatabaseManager.#pending ??= AsyncDatabaseManager.#create();
    return AsyncDatabaseManager.#pending;
  }

  static async #create() {
    await new Promise((resolve) => setTimeout(resolve, 10)); // simulate connect()
    console.log('Connection established (async)');
    return new AsyncDatabaseManager();
  }
}

Promise.all([
  AsyncDatabaseManager.getInstance(),
  AsyncDatabaseManager.getInstance(),
]).then(([a, b]) => console.log(a === b));
// Connection established (async)   ← once
// true
```

If `connect()` can fail, reset `#pending` when the promise rejects, so the next call can retry.

## Variant 3: Module Singleton (most idiomatic in JS)

In Node.js / ES modules, every module is cached after its first `import`. Just export an instance — the module system enforces singleton-ness for free.

```js
// db-manager.js
class DatabaseManager {
  constructor() {
    this.connectionInfo = 'mysql://localhost:3306/app';
    console.log(`Connection established: ${this.connectionInfo}`);
  }
  execute(sql) {
    console.log(`Executing: ${sql}`);
  }
}

export default new DatabaseManager();
```

```js
// other-file.js
import db from './db-manager.js';
db.execute('SELECT 1');
// Both files importing this module get the same instance
```

This is what most JS libraries do (`fs`, `process`, custom config modules) — no class wrapping required.

## Common Use Cases

- **Database / connection pool** — expensive to create, shared across modules
- **Config manager** — load once at startup, read everywhere
- **Logger** — single point of write to avoid file/output conflicts
- **Cache / state store** — deduplicate state across the app

## Singleton vs Flyweight

Both involve "sharing", but they answer different questions:

| | Singleton | Flyweight |
|---|---|---|
| **Instance count** | Exactly one | One per type — many flyweights coexist |
| **Goal** | Coordinate global state | Save memory by sharing immutable data |

See [Flyweight.md](../structural/Flyweight.md#flyweight-vs-singleton) for the comparison.

## Trade-offs

- **Pro**: Guarantees uniqueness — no accidental duplicate connections, configs, etc.
- **Pro**: Lazy variant defers cost until needed
- **Con**: Acts as a hidden dependency — code that uses `Singleton.getInstance()` is hard to test (you can't substitute a mock)
- **Con**: Tight coupling — calling code depends on the concrete singleton, not an injected interface
- **Con**: Often overused — if all you need is "one shared instance", inject it via constructor instead

If you only want "don't create multiple instances", dependency injection is more flexible than a singleton.

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/singleton/
