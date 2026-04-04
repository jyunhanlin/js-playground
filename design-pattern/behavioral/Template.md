# Template Method Pattern

Parent class defines the algorithm's fixed flow. Subclasses implement the variable steps. Like a form template — structure is locked, you only fill in the blanks.

## Core Roles

| Role | Description |
|------|-------------|
| **Abstract Class** | Defines the template method (fixed flow) + abstract/hook steps |
| **Concrete Class** | Implements the variable steps, inherits the fixed ones |

## Three Kinds of Steps

| Step | Description |
|------|-------------|
| **Fixed** | Implemented in parent, subclass cannot override (private) |
| **Abstract** | No default — subclass must implement |
| **Hook** | Has default — subclass may override if needed |

## Example: Data Analysis Pipeline

Flow is always: read → clean → process → report. But "read" varies by source, "process" may vary, "clean" and "report" are always the same.

### Abstract class (template)

```js
class DataAnalyzer {
  // Template method — defines the fixed flow
  run() {
    const data = this.readData();
    const cleaned = this.cleanData(data);
    this.processData(cleaned);
    this.generateReport(cleaned);
  }

  // Abstract: subclass MUST implement
  readData() {
    throw new Error('readData() must be implemented');
  }

  // Fixed: same for all subclasses
  cleanData(data) {
    const cleaned = [...new Set(data.filter(Boolean))];
    console.log('After cleaning:', cleaned);
    return cleaned;
  }

  // Hook: has default, subclass CAN override
  processData(data) {
    console.log('Compute mean, sum and other stats');
  }

  // Fixed: same for all subclasses
  generateReport(data) {
    console.log('=== Analysis Report ===');
    console.log('Data count:', data.length);
    console.log('=======================');
  }
}
```

### Concrete classes

```js
class CsvAnalyzer extends DataAnalyzer {
  readData() {
    console.log('Read from CSV file');
    return ['Alice,90', 'Bob,85', '', 'Alice,90'];
  }
  // uses default cleanData, processData, generateReport
}

class DatabaseAnalyzer extends DataAnalyzer {
  readData() {
    console.log('Execute SQL query');
    return ['row1', 'row2', 'row3'];
  }
  // override hook: use SQL aggregation instead of default stats
  processData(data) {
    console.log('Run SQL aggregation for stats');
  }
}
```

### Usage

```js
new CsvAnalyzer().run();
// Read from CSV file
// After cleaning: ['Alice,90', 'Bob,85']
// Compute mean, sum and other stats
// === Analysis Report ===

new DatabaseAnalyzer().run();
// Execute SQL query
// After cleaning: ['row1', 'row2', 'row3']
// Run SQL aggregation for stats
// === Analysis Report ===
```

Adding an API data source = one new subclass implementing `readData()`. Everything else is reused.

## Toggle Hook

A boolean hook that lets subclasses enable/disable optional steps:

```js
class DataAnalyzer {
  run() {
    const data = this.readData();
    const cleaned = this.cleanData(data);
    this.processData(cleaned);
    this.generateReport(cleaned);
    if (this.shouldLog()) {
      console.log('Analysis complete');
    }
  }

  // toggle hook — default on, subclass can turn off
  shouldLog() { return true; }
}

class SilentAnalyzer extends DataAnalyzer {
  readData() { return ['data']; }
  shouldLog() { return false; } // no logging
}
```

## Template Method vs Strategy

| | Template Method | Strategy |
|---|---|---|
| **Mechanism** | Inheritance — subclass overrides steps | Composition — inject interchangeable algorithm |
| **What varies** | Individual steps within a fixed flow | The entire algorithm |
| **When to use** | Steps and order are fixed, only some steps differ | Algorithm can be entirely replaced |

## Trade-offs

- **Pro**: Eliminates duplicate code — shared steps written once in parent
- **Pro**: Hooks give subclasses optional customization points
- **Con**: Inheritance-based — deep hierarchies get hard to follow
- **Con**: Reading code requires jumping between parent and child

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/template-method/
