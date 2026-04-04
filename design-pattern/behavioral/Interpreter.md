# Interpreter Pattern

Define grammar rules as classes, compose them into an expression tree, then interpret (evaluate) the tree.

## Core Roles

| Role | Description |
|------|-------------|
| **Abstract Expression** | Defines the `interpret()` interface |
| **Terminal Expression** | Leaf node — holds an atomic value, cannot be decomposed further |
| **Non-terminal Expression** | Branch node — combines child expressions via an operation |

## Example 1: Math Expression Evaluator

Terminal expressions (leaves) hold values, non-terminal expressions (branches) combine sub-expressions. The tree structure determines evaluation order.

```js
// --- Abstract Expression ---
class Expression {
  interpret() {
    throw new Error('interpret() must be implemented');
  }
}

// --- Terminal Expression ---
class NumberExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }
  interpret() {
    return this.value;
  }
}

// --- Non-terminal Expressions ---
class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret() {
    return this.left.interpret() + this.right.interpret();
  }
}

class MultiplyExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret() {
    return this.left.interpret() * this.right.interpret();
  }
}
```

`3 + 5 * 2` as a syntax tree — whoever is deeper gets evaluated first:

```
    +
   / \
  3   *
     / \
    5   2
```

```js
const expr1 = new AddExpression(
  new NumberExpression(3),
  new MultiplyExpression(new NumberExpression(5), new NumberExpression(2))
);
console.log('3 + 5 * 2 =', expr1.interpret()); // 13

const expr2 = new MultiplyExpression(
  new AddExpression(new NumberExpression(3), new NumberExpression(5)),
  new NumberExpression(2)
);
console.log('(3 + 5) * 2 =', expr2.interpret()); // 16
```

## Example 2: Query Filter / Rule Engine

Same pattern applied to boolean predicates. Terminal = single condition, Non-terminal = AND / OR combinator.

```js
class AgeCriteria {
  constructor(minAge) {
    this.minAge = minAge;
  }
  matches(user) {
    return user.age >= this.minAge;
  }
}

class CityCriteria {
  constructor(city) {
    this.city = city;
  }
  matches(user) {
    return user.city === this.city;
  }
}

class AndCriteria {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  matches(user) {
    return this.left.matches(user) && this.right.matches(user);
  }
}

class OrCriteria {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  matches(user) {
    return this.left.matches(user) || this.right.matches(user);
  }
}
```

Rule: `age >= 18 AND (city is Beijing OR Shanghai)`

```js
const users = [
  { name: 'Alice', age: 25, city: 'Beijing' },
  { name: 'Bob', age: 17, city: 'Shanghai' },
  { name: 'Charlie', age: 30, city: 'Guangzhou' },
  { name: 'Diana', age: 22, city: 'Shanghai' },
];

const rule = new AndCriteria(
  new AgeCriteria(18),
  new OrCriteria(new CityCriteria('Beijing'), new CityCriteria('Shanghai'))
);

users.filter((u) => rule.matches(u)).forEach((u) => {
  console.log(`${u.name} (age: ${u.age}, city: ${u.city})`);
});
// Alice (age: 25, city: Beijing)
// Diana (age: 22, city: Shanghai)
```

## Why Rarely Used in Practice

1. **Performance** — one class per rule + recursive tree traversal is expensive for complex grammars
2. **Complex grammars don't fit** — use proper parser tools (ANTLR, PEG.js) instead
3. **Existing alternatives** — regex, script engines, rule engines already solve most cases

The core idea — **decompose grammar into composable classes** — still appears everywhere: SQL WHERE builders, ESLint rule composition, React reconciliation, etc.

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/interpreter/
