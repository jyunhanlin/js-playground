# Builder Pattern

When a class has many constructor parameters (especially mixed required + optional), Builder lets you construct the object step by step via a fluent API. The final `build()` call produces the complete object.

## The Problem It Solves

A class with 6 parameters where 3 are optional ends up being called like:

```js
new Resume('Tom', 23, 'BS', null, null, null);
new Resume('Jack', 30, 'MS', null, 'Engineer', 'Acme Corp');
```

Three issues:

1. Long parameter lists are unreadable
2. Optional params force `null` placeholders
3. Adding a new field breaks every existing call site

## Core Roles

| Role | Description |
|------|-------------|
| **Product** | The complex object being constructed |
| **Builder** | Holds intermediate state, exposes setters that return `this`, has a `build()` method |

## Example: Resume Builder

```js
class Resume {
  constructor(name, age, education, awards, workExperience, companyName) {
    this.name = name;
    this.age = age;
    this.education = education;
    this.awards = awards;
    this.workExperience = workExperience;
    this.companyName = companyName;
  }

  toString() {
    return [
      `Name: ${this.name}`,
      `Age: ${this.age}`,
      `Education: ${this.education}`,
      `Awards: ${this.awards ?? 'N/A'}`,
      `Work Experience: ${this.workExperience ?? 'N/A'}`,
      `Company: ${this.companyName ?? 'N/A'}`,
    ].join('\n');
  }
}

class ResumeBuilder {
  setBasicInfo(name, age, education) {
    this.name = name;
    this.age = age;
    this.education = education;
    return this; // enables chaining
  }
  setAwards(awards) {
    this.awards = awards;
    return this;
  }
  setWorkExperience(work) {
    this.workExperience = work;
    return this;
  }
  setCompanyName(company) {
    this.companyName = company;
    return this;
  }
  build() {
    if (!this.name || !this.age || !this.education) {
      throw new Error('name, age, and education are required');
    }
    return new Resume(
      this.name, this.age, this.education,
      this.awards, this.workExperience, this.companyName
    );
  }
}
```

### Usage — fluent API

```js
const tom = new ResumeBuilder()
  .setBasicInfo('Tom', 23, 'BS')
  .setAwards('Hackathon Winner')
  .build();

const jack = new ResumeBuilder()
  .setBasicInfo('Jack', 30, 'MS')
  .setWorkExperience('Engineer')
  .setCompanyName('Acme Corp')
  .build();
```

Each method name documents what it sets, optional params can be skipped, no `null` placeholders.

## JS-Specific: Options Object

In JS, the most common alternative to Builder is just passing an options object — fewer ceremonies, but no chained API and no validation:

```js
new Resume({
  name: 'Tom',
  age: 23,
  education: 'BS',
  awards: 'Hackathon Winner',
});
```

Reach for Builder when you want:
- Validation in `build()`
- A fluent API for discoverability (IDE autocomplete walks you through methods)
- Step ordering or staged construction (e.g. SQL builders that enforce `select → from → where`)

## Real-World Examples

- **Query builders** — `db.select('*').from('users').where({ active: true }).orderBy('id')` (Knex, Kysely, Prisma)
- **HTTP request builders** — `new Request.Builder().url(...).header(...).post(body).build()` (OkHttp)
- **Test fixtures** — `UserBuilder().withRole('admin').withEmail('a@b.c').build()`
- **Immutable config** — `RouterConfig.builder().enableHttps().port(8080).build()`

## Trade-offs

- **Pro**: Self-documenting construction — method names beat positional arguments
- **Pro**: Flexible — set only what you need
- **Pro**: Validation happens once in `build()`, not on every setter
- **Con**: Extra Builder class with fields that mirror the Product
- **Con**: For simple objects, options object or constructor is shorter

Rule of thumb: **4+ constructor parameters or many optional fields → consider Builder.**

## Reference

- https://www.dofactory.com/javascript/design-patterns
- https://labuladong.online/zh/algo/design-pattern/builder/
