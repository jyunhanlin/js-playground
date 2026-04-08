# Abstract Factory Pattern

A factory that creates a *family* of related objects together — guaranteeing that all the products produced by one factory belong to the same "set" and are mutually compatible.

## Core Roles

| Role | Description |
|------|-------------|
| **Abstract Product** | Interface for one kind of product (e.g. Button) |
| **Concrete Product** | Specific variant (e.g. DarkButton, LightButton) |
| **Abstract Factory** | Interface declaring creators for each product kind |
| **Concrete Factory** | Implements all creators for one cohesive product family |

## Factory Method vs Abstract Factory

| | Factory Method | Abstract Factory |
|---|---|---|
| **Scope** | Creates one product | Creates a whole family of related products |
| **Mechanism** | Subclass overrides a method | Pass a factory *object* to the client |
| **Goal** | Defer choice of one type | Guarantee a coherent set of types |

Factory Method uses inheritance, Abstract Factory uses composition.

## Example: Themed UI Components

A UI app needs `Button`, `Checkbox`, and `Text` components. Two themes — Light and Dark. Within one theme, components must visually match — you can't have a Light button next to a Dark checkbox.

### Abstract products

```js
class Button {
  render() { throw new Error('not implemented'); }
}

class Checkbox {
  render() { throw new Error('not implemented'); }
}

class Text {
  render() { throw new Error('not implemented'); }
}
```

### Concrete products — Light family

```js
class LightButton extends Button {
  render() { console.log('Render Light Button'); }
}

class LightCheckbox extends Checkbox {
  render() { console.log('Render Light Checkbox'); }
}

class LightText extends Text {
  render() { console.log('Render Light Text'); }
}
```

### Concrete products — Dark family

```js
class DarkButton extends Button {
  render() { console.log('Render Dark Button'); }
}

class DarkCheckbox extends Checkbox {
  render() { console.log('Render Dark Checkbox'); }
}

class DarkText extends Text {
  render() { console.log('Render Dark Text'); }
}
```

### Abstract factory + concrete factories

```js
class ThemeFactory {
  createButton() { throw new Error('not implemented'); }
  createCheckbox() { throw new Error('not implemented'); }
  createText() { throw new Error('not implemented'); }
}

class LightThemeFactory extends ThemeFactory {
  createButton() { return new LightButton(); }
  createCheckbox() { return new LightCheckbox(); }
  createText() { return new LightText(); }
}

class DarkThemeFactory extends ThemeFactory {
  createButton() { return new DarkButton(); }
  createCheckbox() { return new DarkCheckbox(); }
  createText() { return new DarkText(); }
}
```

### Client

```js
class Application {
  constructor(themeFactory) {
    this.button = themeFactory.createButton();
    this.checkbox = themeFactory.createCheckbox();
    this.text = themeFactory.createText();
  }
  start() {
    this.button.render();
    this.checkbox.render();
    this.text.render();
  }
}
```

```js
new Application(new DarkThemeFactory()).start();
// Render Dark Button
// Render Dark Checkbox
// Render Dark Text

new Application(new LightThemeFactory()).start();
// Render Light Button
// Render Light Checkbox
// Render Light Text
```

`Application` depends only on `ThemeFactory` and the abstract product interfaces. Adding a "High Contrast" theme = one new factory + three new product classes; the client doesn't change.

## Real-World Examples

- **UI theming systems** — light/dark/high-contrast component sets
- **Cross-platform UI libraries** — `MacButton + MacWindow` vs `WindowsButton + WindowsWindow`
- **Database drivers** — a `MySQLDriver` provides matching `Connection`, `Statement`, `ResultSet`; same for `PostgresDriver`
- **Serializers** — a `JsonFormat` creates compatible `Encoder`, `Decoder`, `Validator`

The defining trait: products from the same factory must work together.

## Trade-offs

- **Pro**: Guarantees product family consistency — impossible to mix incompatible variants
- **Pro**: Switching the entire family requires changing only one line (the factory)
- **Pro**: Composition-based — more flexible than Factory Method's inheritance
- **Con**: Class explosion — N products × M families = N × M classes plus M factories
- **Con**: Adding a new product type (e.g. `Slider`) requires updating *every* existing factory
- **Con**: Heavy ceremony for simple cases — overkill if you only have one product type

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/abstract-factory/
