# Adapter Pattern

You have an existing class with the wrong interface (third-party library, legacy code, etc.) and you can't modify it. Wrap it in an adapter that exposes the interface you actually need. The adapter translates between the two.

## Core Roles

| Role | Description |
|------|-------------|
| **Target** | The interface the client expects |
| **Adaptee** | The existing object with an incompatible interface |
| **Adapter** | Implements Target, holds an Adaptee, translates calls between them |
| **Client** | Talks only to the Target interface — unaware of the Adaptee |

## Two Variants

| Variant | Mechanism |
|---------|-----------|
| **Object Adapter** | Adapter holds an Adaptee instance via composition (preferred) |
| **Class Adapter** | Adapter inherits from Adaptee (requires multiple inheritance) |

JS doesn't have multiple class inheritance, and "composition over inheritance" is the modern norm — so object adapter is the standard form here.

## Example 1: Simple Translator

A class that only speaks Chinese, but the system expects an English speaker.

```js
// Adaptee — has the data, wrong interface
class Chinese {
  speakChinese() {
    console.log('你好世界！');
    return '你好世界！';
  }
}

// Target — what the client wants
class EnglishSpeaker {
  speakEnglish() {
    throw new Error('not implemented');
  }
}

// Adapter — implements Target, wraps Adaptee
class TranslatorAdapter extends EnglishSpeaker {
  constructor(chinese) {
    super();
    this.chinese = chinese;
  }
  speakEnglish() {
    const original = this.chinese.speakChinese();
    const translated = 'Hello World!';
    console.log(`Translated: ${translated}`);
    return translated;
  }
}
```

```js
const speaker = new TranslatorAdapter(new Chinese());
speaker.speakEnglish();
// 你好世界！
// Translated: Hello World!
```

The client only depends on `EnglishSpeaker`. If the underlying source switches from `Chinese` to `Japanese`, only the adapter changes.

## Example 2: Legacy Logger Adapter

A more realistic case: your codebase expects a modern logger interface, but you have to integrate a legacy logger from a third-party library.

```js
// Adaptee — legacy library you can't modify
class LegacyLogger {
  writeMessage(level, msg) {
    console.log(`[LEGACY ${level.toUpperCase()}] ${msg}`);
  }
}

// Target — modern interface used everywhere in your app
class Logger {
  info(msg) { throw new Error('not implemented'); }
  warn(msg) { throw new Error('not implemented'); }
  error(msg) { throw new Error('not implemented'); }
}

// Adapter — translates modern API into legacy calls
class LegacyLoggerAdapter extends Logger {
  constructor(legacyLogger) {
    super();
    this.legacy = legacyLogger;
  }
  info(msg) { this.legacy.writeMessage('info', msg); }
  warn(msg) { this.legacy.writeMessage('warn', msg); }
  error(msg) { this.legacy.writeMessage('error', msg); }
}
```

```js
const logger = new LegacyLoggerAdapter(new LegacyLogger());
logger.info('Server started');
// [LEGACY INFO] Server started

logger.error('Connection failed');
// [LEGACY ERROR] Connection failed
```

Application code only knows `Logger`. Swap the adapter for a different backend (Winston, Pino, console) and nothing else changes.

## Adapter in the JS Ecosystem

You probably use adapters daily without naming them:

- **`fetch` wrappers** that expose an axios-like API on top of `fetch`
- **`axios`** itself adapts XHR / Node `http` / `fetch` behind one consistent API
- **ORMs** (Prisma, Sequelize) adapt SQL/NoSQL drivers behind a unified query interface
- **Test runners** adapt different assertion libraries to a common test format
- **Webpack loaders** adapt non-JS resources (CSS, images) into modules

Anywhere you see "wrapper around X to make it look like Y" — that's adapter.

## Adapter vs Other Wrapping Patterns

| | Adapter | Decorator | Facade | Proxy |
|---|---|---|---|---|
| **Purpose** | Convert interface | Add behavior | Simplify subsystem | Control access |
| **Same interface as inner?** | No (the whole point) | Yes | No (smaller surface) | Yes |
| **Mnemonic** | "Convert" | "Enhance" | "Simplify" | "Control" |

The defining trait: **adapter changes the interface**. Decorator and Proxy keep the same interface; Facade exposes a new (simpler) one for an entire subsystem.

## Trade-offs

- **Pro**: Lets you reuse existing code without modifying it
- **Pro**: Conversion logic is centralized in one place, not scattered
- **Pro**: Client stays decoupled from third-party / legacy details
- **Con**: Extra layer of indirection
- **Con**: If you control both sides, just changing the original interface is simpler

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/adapter/
