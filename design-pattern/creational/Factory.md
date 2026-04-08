# Factory Method Pattern

Define a method for creating an object, but let subclasses decide which concrete class to instantiate. The parent class describes the workflow that uses the product; the subclass plugs in *which* product.

## Core Roles

| Role | Description |
|------|-------------|
| **Product** | Interface for objects the factory creates |
| **Concrete Product** | Specific implementations of Product |
| **Creator** | Declares the abstract factory method, may use Product in shared logic |
| **Concrete Creator** | Subclass that overrides the factory method to return a specific Product |

## Example: Logger by Environment

An app needs different logging strategies depending on environment: console for dev, file for test, remote server for prod. The business logic stays identical — only the logger changes.

### Product

```js
class ILogger {
  log(message) { throw new Error('not implemented'); }
}

class ConsoleLogger extends ILogger {
  log(message) {
    console.log(`CONSOLE: ${message}`);
  }
}

class FileLogger extends ILogger {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }
  log(message) {
    console.log(`WRITE TO ${this.filePath}: ${message}`);
  }
}

class RemoteLogger extends ILogger {
  constructor(server) {
    super();
    this.server = server;
  }
  log(message) {
    const payload = JSON.stringify({ message, ts: Date.now() });
    console.log(`SEND TO ${this.server}: ${payload}`);
  }
}
```

### Creator (with abstract factory method)

```js
class Application {
  constructor() {
    this.logger = this.createLogger(); // Template Method calls factory method
  }

  // Subclass decides which Logger to create
  createLogger() {
    throw new Error('Subclass must implement createLogger()');
  }

  // Business logic is shared and Logger-agnostic
  doSomething() {
    this.logger.log('Start doing something...');
  }
}
```

### Concrete Creators

```js
class DevelopmentApp extends Application {
  createLogger() {
    return new ConsoleLogger();
  }
}

class TestingApp extends Application {
  createLogger() {
    return new FileLogger('application.log');
  }
}

class ProductionApp extends Application {
  createLogger() {
    return new RemoteLogger('https://logs.example.com');
  }
}
```

### Usage

```js
const env = process.env.NODE_ENV || 'development';
let app;
if (env === 'development') app = new DevelopmentApp();
else if (env === 'test') app = new TestingApp();
else app = new ProductionApp();

app.doSomething();
// CONSOLE: Start doing something...
```

`Application` only depends on the `ILogger` interface. Adding a 4th logger type means a new `ILogger` subclass + a new `Application` subclass — existing code stays untouched.

## Connection to Template Method

Notice `Application.constructor` calls `this.createLogger()` — the parent defines a workflow, the subclass plugs in one piece. **Factory Method is essentially Template Method specialized for object creation.** See `Template.md`.

## When to Use vs When Not To

**Good fit:**
- UI frameworks where subclasses customize *what* to render but the rendering pipeline is fixed
- Libraries that expose extension points via subclassing

**Not so good in JS:**
- For simple cases, JS supports first-class functions and "composition over inheritance" — you can inject a logger directly into the constructor instead of subclassing. That approach is closer to **Abstract Factory** (or Strategy).
- Most logging libraries (winston, pino) handle this via configuration, not subclassing.

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|---|---|
| **Creates** | One product | A *family* of related products |
| **Mechanism** | Subclass overrides creation method | Inject a factory object |
| **Example** | One logger per app subclass | One UI theme creates buttons + checkboxes + text together |

See `AbstractFactory.md` for the comparison.

## Trade-offs

- **Pro**: Decouples client from concrete product classes
- **Pro**: Adding a new product = new subclass, no changes to existing code (Open/Closed)
- **Con**: Class count grows quickly — each new variant needs both a Product subclass and a Creator subclass
- **Con**: Inheritance-based — modern JS prefers composition

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/factory-method/
