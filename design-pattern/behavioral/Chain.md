# Chain of Responsibility Pattern

Link multiple handlers into a chain. A request travels along the chain until a handler processes it (or every handler gets a chance). The sender doesn't know which handler will act.

## Core Roles

| Role | Description |
|------|-------------|
| **Handler** | Defines the handling interface and holds a reference to the next handler |
| **Concrete Handler** | Decides whether to handle the request or pass it along |

## Two Variants

1. **Short-circuit chain** — request stops at the first handler that can process it (e.g. approval chain)
2. **Pipeline chain** — every handler processes the request and passes it on (e.g. logging, middleware)

## Example 1: Expense Approval Chain (Short-Circuit)

Different approval levels: TeamLead <= $500, Manager <= $5000, Director <= $50000, CEO handles the rest.

```js
class Approver {
  constructor(title) {
    this.title = title;
    this.next = null;
  }
  setNext(next) {
    this.next = next;
    return next; // enable chaining: a.setNext(b).setNext(c)
  }
}

class TeamLead extends Approver {
  constructor() { super('TeamLead'); }
  approve(amount, desc) {
    if (amount <= 500) {
      console.log(`${this.title} approved: ${desc} $${amount}`);
    } else if (this.next) {
      console.log(`${this.title} cannot approve, pass to superior`);
      this.next.approve(amount, desc);
    }
  }
}

class Manager extends Approver {
  constructor() { super('Manager'); }
  approve(amount, desc) {
    if (amount <= 5000) {
      console.log(`${this.title} approved: ${desc} $${amount}`);
    } else if (this.next) {
      console.log(`${this.title} cannot approve, pass to superior`);
      this.next.approve(amount, desc);
    }
  }
}

class Director extends Approver {
  constructor() { super('Director'); }
  approve(amount, desc) {
    if (amount <= 50000) {
      console.log(`${this.title} approved: ${desc} $${amount}`);
    } else if (this.next) {
      console.log(`${this.title} cannot approve, pass to superior`);
      this.next.approve(amount, desc);
    }
  }
}

class CEO extends Approver {
  constructor() { super('CEO'); }
  approve(amount, desc) {
    console.log(`${this.title} approved: ${desc} $${amount}`);
  }
}
```

```js
const lead = new TeamLead();
lead.setNext(new Manager()).setNext(new Director()).setNext(new CEO());

lead.approve(200, 'Team dinner');
// TeamLead approved: Team dinner $200

lead.approve(3000, 'Flight ticket');
// TeamLead cannot approve, pass to superior
// Manager approved: Flight ticket $3000

lead.approve(100000, 'Equipment');
// TeamLead → Manager → Director → CEO approved: Equipment $100000
```

Adding a new level (e.g. "Senior Manager") only requires a new class inserted into the chain — no changes to existing handlers.

## Example 2: Log Level Filter (Pipeline)

Every handler processes the request if its level qualifies, then always passes it on. An ERROR log triggers all three: console + file + alert.

```js
const LEVEL = { INFO: 1, WARNING: 2, ERROR: 3 };

class Logger {
  constructor(level) {
    this.level = level;
    this.next = null;
  }
  setNext(next) {
    this.next = next;
    return next;
  }
  log(level, message) {
    if (level >= this.level) {
      this.write(message);
    }
    // always pass to next — pipeline, not short-circuit
    if (this.next) this.next.log(level, message);
  }
}

class ConsoleLogger extends Logger {
  constructor() { super(LEVEL.INFO); }
  write(msg) { console.log(`[Console] ${msg}`); }
}

class FileLogger extends Logger {
  constructor() { super(LEVEL.WARNING); }
  write(msg) { console.log(`[File] ${msg}`); }
}

class AlertLogger extends Logger {
  constructor() { super(LEVEL.ERROR); }
  write(msg) { console.log(`[Alert] ${msg}`); }
}
```

```js
const logger = new ConsoleLogger();
logger.setNext(new FileLogger()).setNext(new AlertLogger());

logger.log(LEVEL.INFO, 'User logged in');
// [Console] User logged in

logger.log(LEVEL.WARNING, 'Disk space low');
// [Console] Disk space low
// [File] Disk space low

logger.log(LEVEL.ERROR, 'DB connection failed');
// [Console] DB connection failed
// [File] DB connection failed
// [Alert] DB connection failed
```

## Chain of Responsibility vs Decorator

Both are linked chains, but:

| | Chain of Responsibility | Decorator |
|---|---|---|
| **Handling** | Each node may handle OR skip | Every node always processes |
| **Termination** | Can stop early (short-circuit variant) | Always traverses the full chain |
| **Purpose** | Route to the right handler | Layer additional behavior |

## Trade-offs

- **Pro**: Sender is decoupled from handlers — doesn't know who processes the request
- **Pro**: Easy to add/remove/reorder handlers
- **Con**: Request may traverse many nodes before being handled
- **Con**: If chain is misconfigured, request may fall through unhandled

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/chain-of-responsibility/
