# Bridge Pattern

When a class needs to vary along two independent dimensions, inheritance creates an `M × N` class explosion. Bridge separates the dimensions into two independent class hierarchies and links them by composition — reducing the count to `M + N`.

## The Problem: Class Explosion

A notification system needs to support multiple message types (normal, urgent, scheduled) and multiple send channels (email, SMS, push, in-app message). With pure inheritance:

```
Message
├── NormalEmailMessage
├── NormalSmsMessage
├── NormalPushMessage
├── UrgentEmailMessage
├── UrgentSmsMessage
└── UrgentPushMessage
```

2 types × 3 channels = 6 classes. Add a "scheduled" type and a "WeChat" channel → 12 classes. Each new dimension multiplies, not adds. Worse: every email subclass duplicates the email-sending logic, every urgent subclass duplicates the prefix logic.

## The Bridge Solution

Identify the two independent dimensions and split them:

```
Abstraction (message type)        Implementor (send channel)
Message ──────────────────→ MessageSender (interface)
├── NormalMessage                 ├── EmailSender
├── UrgentMessage                 ├── SmsSender
└── ScheduledMessage              ├── PushSender
                                  └── InAppSender
```

The abstraction holds a reference to an implementor — that reference **is** the bridge. Now 3 + 4 = 7 classes cover all 12 combinations.

## Core Roles

| Role | Description |
|------|-------------|
| **Abstraction** | The high-level interface, holds an implementor reference |
| **Refined Abstraction** | Specific variants (NormalMessage, UrgentMessage) |
| **Implementor** | Low-level operation interface (MessageSender) |
| **Concrete Implementor** | Channel-specific implementations (EmailSender, SmsSender) |

## Example: Notification System

### Implementor side (channels)

```ts
interface MessageSender {
  send(content: string): void;
}

class EmailSender implements MessageSender {
  send(content: string) {
    console.log(`Send Email: ${content}`);
  }
}

class SmsSender implements MessageSender {
  send(content: string) {
    console.log(`Send SMS: ${content}`);
  }
}

class PushSender implements MessageSender {
  send(content: string) {
    console.log(`Send Push: ${content}`);
  }
}
```

### Abstraction side (message types)

```ts
abstract class Message {
  // The bridge: composition over inheritance
  protected sender: MessageSender;

  constructor(sender: MessageSender) {
    this.sender = sender;
  }

  abstract send(content: string): void;
}

class NormalMessage extends Message {
  send(content: string) {
    this.sender.send(content);
  }
}

class UrgentMessage extends Message {
  send(content: string) {
    this.sender.send(`[URGENT] ${content}`);
  }
}
```

### Free composition

```ts
new NormalMessage(new EmailSender()).send('Your order shipped');
// Send Email: Your order shipped

new UrgentMessage(new SmsSender()).send('Server is down!');
// Send SMS: [URGENT] Server is down!

new UrgentMessage(new PushSender()).send('Suspicious login detected');
// Send Push: [URGENT] Suspicious login detected
```

## Adding a New Dimension Value

### New message type (abstraction side)

```ts
class ScheduledMessage extends Message {
  constructor(sender: MessageSender, private scheduledTime: string) {
    super(sender);
  }
  send(content: string) {
    this.sender.send(`[Scheduled ${this.scheduledTime}] ${content}`);
  }
}
```

### New channel (implementor side)

```ts
class InAppSender implements MessageSender {
  send(content: string) {
    console.log(`Send In-App: ${content}`);
  }
}
```

### Free combination — no existing code touched

```ts
new ScheduledMessage(new InAppSender(), '2024-01-01 10:00')
  .send('Happy New Year!');
// Send In-App: [Scheduled 2024-01-01 10:00] Happy New Year!
```

Adding 1 type + 1 channel = 2 new classes, but unlocks 4 new combinations (`3 × 4 - 2 × 3 = 6` original cells become `3 × 4 = 12`, gaining 6 combinations from 2 classes).

## Bridge vs Other Wrapping Patterns

| | Bridge | Adapter | Decorator |
|---|---|---|---|
| **Purpose** | Separate independent dimensions | Convert incompatible interfaces | Add behavior dynamically |
| **When designed** | Up-front, before implementation | After the fact, fix mismatch | Anytime |
| **Mnemonic** | "Separate dimensions" | "Convert interface" | "Enhance functionality" |

Bridge is **preventive** — applied at design time when you anticipate two dimensions will vary. Adapter and Decorator are **reactive** — applied when integrating or extending existing code.

## Bridge vs Strategy

Bridge and Strategy look identical: an abstract class holds an interface reference. The difference is **scope**:

- **Strategy** swaps one algorithm — single dimension of variation
- **Bridge** separates entire class hierarchies along two dimensions — both sides have their own type tree

Strategy = "pick an algorithm". Bridge = "pick from two orthogonal type trees".

## Trade-offs

- **Pro**: Avoids class explosion — `M + N` instead of `M × N`
- **Pro**: Each dimension evolves independently
- **Pro**: Embodies "composition over inheritance"
- **Con**: Requires upfront design — must identify the dimensions correctly
- **Con**: Overkill if there's only one varying dimension

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/bridge/
