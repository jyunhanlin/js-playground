# Strategy Pattern

Encapsulate interchangeable algorithms as independent classes behind a common interface. The context delegates work to a strategy object and can swap it at runtime. Eliminates if-else/switch-case branches.

## Core Roles

| Role | Description |
|------|-------------|
| **Strategy Interface** | Defines the common behavior all strategies share |
| **Concrete Strategy** | Implements one specific algorithm |
| **Context** | Holds a strategy reference, delegates work to it |

## Example 1: Report Exporter

Export a report as Markdown, HTML, or plain text — each format is a strategy.

```js
class MarkdownExporter {
  export(title, content) {
    return `# ${title}\n\n${content}`;
  }
}

class HtmlExporter {
  export(title, content) {
    return `<h1>${title}</h1>\n<p>${content}</p>`;
  }
}

class PlainTextExporter {
  export(title, content) {
    return `${title.toUpperCase()}\n${'='.repeat(title.length)}\n${content}`;
  }
}

class ReportExporter {
  constructor(strategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  export(title, content) {
    return this.strategy.export(title, content);
  }
}
```

```js
const exporter = new ReportExporter(new MarkdownExporter());
console.log(exporter.export('Monthly Report', 'Sales grew 20%'));
// # Monthly Report
//
// Sales grew 20%

exporter.setStrategy(new HtmlExporter());
console.log(exporter.export('Monthly Report', 'Sales grew 20%'));
// <h1>Monthly Report</h1>
// <p>Sales grew 20%</p>
```

Adding LaTeX format = one new class. No changes to existing code.

## Example 2: Game NPC Behavior (Runtime Switching)

NPCs have different battle behaviors that can change mid-game.

```js
class AggressiveStrategy {
  decideAction(myHp, enemyHp) {
    return 'Full attack! Deal 30 damage';
  }
}

class DefensiveStrategy {
  decideAction(myHp, enemyHp) {
    return 'Raise shield, reduce 50% incoming damage';
  }
}

class CunningStrategy {
  decideAction(myHp, enemyHp) {
    if (enemyHp < 30) return 'Enemy is weak, go for the kill! Deal 40 damage';
    return 'Probe cautiously, deal 10 damage';
  }
}

class GameCharacter {
  constructor(name, hp, strategy) {
    this.name = name;
    this.hp = hp;
    this.strategy = strategy;
  }
  setStrategy(strategy) { this.strategy = strategy; }
  takeTurn(enemyHp) {
    console.log(`${this.name}: ${this.strategy.decideAction(this.hp, enemyHp)}`);
  }
}
```

```js
const guardian = new GameCharacter('Guardian', 120, new DefensiveStrategy());
guardian.takeTurn(80);
// Guardian: Raise shield, reduce 50% incoming damage

// Player used "Enrage" — switch strategy at runtime
guardian.setStrategy(new AggressiveStrategy());
guardian.takeTurn(80);
// Guardian: Full attack! Deal 30 damage
```

## Strategy vs Similar Patterns

### vs Bridge

| | Strategy | Bridge |
|---|---|---|
| **Dimensions** | One — different ways to do the same thing | Two+ — separate independent dimensions |
| **Example** | Export format (MD / HTML / text) | Message type × send channel |

### vs State

| | Strategy | State |
|---|---|---|
| **Who switches** | Client (external) picks a strategy | State object (internal) decides transition |
| **Mutual awareness** | Strategies don't know about each other | States know which state comes next |
| **Semantics** | "Choose an algorithm" | "Behavior changes with lifecycle phase" |

## Trade-offs

- **Pro**: Eliminates if-else branches — each algorithm in its own class
- **Pro**: Open/Closed Principle — add new strategies without modifying existing code
- **Pro**: Runtime swappable via `setStrategy()`
- **Con**: More classes — one per algorithm
- **Con**: Client must know which strategies exist to choose from

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/strategy/
