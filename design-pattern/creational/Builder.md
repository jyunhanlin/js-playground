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
3. A new field can only go at the end — anywhere else, it shifts the later arguments at every call site

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

console.log(tom.toString());
// Name: Tom
// Age: 23
// Education: BS
// Awards: Hackathon Winner
// Work Experience: N/A
// Company: N/A
```

Each method name documents what it sets, optional params can be skipped, no `null` placeholders.

## JS-Specific: Options Object

In JS, the most common alternative to Builder is a constructor that takes one options object. It needs a different constructor from the positional `Resume` above:

```js
class ResumeFromOptions {
  constructor({ name, age, education, awards, workExperience, companyName }) {
    if (!name || !age || !education) {
      throw new Error('name, age, and education are required');
    }
    Object.assign(this, { name, age, education, awards, workExperience, companyName });
  }
}

const tom2 = new ResumeFromOptions({
  name: 'Tom',
  age: 23,
  education: 'BS',
  awards: 'Hackathon Winner',
});
console.log(tom2.awards); // Hackathon Winner
```

Named fields, optional fields, validation, and new fields that don't break callers — one class with an options object covers all of these. Reach for Builder when you want:
- Staged construction — set parts at different times or places, then `build()` once
- Enforced step order (e.g. SQL builders that enforce `select → from → where`)
- One partly-configured builder reused to produce several products
- A fluent API for discoverability (IDE autocomplete walks you through methods)

## GoF Builder vs Fluent Builder

The builder above is the **fluent builder** made popular by *Effective Java* (Joshua Bloch). The original GoF Builder has one more role and a different goal:

| | Fluent builder (above) | GoF Builder |
|---|---|---|
| **Goal** | Readable construction of one class with many optional fields | Same construction steps, different representations |
| **Roles** | Builder, Product | Director, Builder interface, several Concrete Builders |
| **Who calls the steps** | The client, by chaining | The Director, in a fixed order |

```js
// Director: knows the steps and their order, not the output format
class ResumeDirector {
  construct(builder, data) {
    builder.addHeader(data.name);
    for (const job of data.jobs) builder.addJob(job);
    return builder.result();
  }
}

// Concrete Builders: same steps, different representation
class MarkdownResumeBuilder {
  #lines = [];
  addHeader(name) { this.#lines.push(`# ${name}`); }
  addJob(job) { this.#lines.push(`- ${job}`); }
  result() { return this.#lines.join('\n'); }
}

class HtmlResumeBuilder {
  #head = '';
  #items = '';
  addHeader(name) { this.#head = `<h1>${name}</h1>`; }
  addJob(job) { this.#items += `<li>${job}</li>`; }
  result() { return `${this.#head}<ul>${this.#items}</ul>`; }
}

const data = { name: 'Jack', jobs: ['Engineer @ Acme', 'Intern @ Initech'] };
const director = new ResumeDirector();

console.log(director.construct(new MarkdownResumeBuilder(), data));
// # Jack
// - Engineer @ Acme
// - Intern @ Initech

console.log(director.construct(new HtmlResumeBuilder(), data));
// <h1>Jack</h1><ul><li>Engineer @ Acme</li><li>Intern @ Initech</li></ul>
```

Here the builder object is the assembly process turned into an object: keep the director, swap the builder, get a different product.

## Real-World Examples

- **Query builders** — `db.select('*').from('users').where({ active: true }).orderBy('id')` (Knex, Kysely)
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
