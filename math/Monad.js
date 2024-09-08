function Container(x) {
  this.map = (fn) => fn(x);
  this.toString = () => `${this.constructor.name}(${x})`;
  this.valueOf = () => x;
}

const plus1 = (x) => x + 1;
const c = new Container(22);
c.map(plus1); // 23
c.valueOf(); // 22
c.toString(); // Container(22)

function Functor(x) {
  Container.call(this, x);
  this.map = (fn) => new this.constructor(fn(x));
}

const f = new Functor(22);
const f2 = f.map(plus1).map(plus1);
f2.map(plus1).valueOf(); // 25
f2.toString(); // Functor(24)

function Monad(x) {
  Functor.call(this, x);
  const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (v) => v.map(x);
}

const m = new Monad(22);
const add = (x) => (y) => x + y;
const fun = m.map(add);

const m2 = new Monad(9);
const ppp = m2.map((x) => fun.map((f) => f(x)));

fun.ap(m2); // 31

// Dealing with missing values: the MAYBE monad
function Maybe(x) {
  isEmpty(x) ? Nothing.call(this) : Just.call(this, x);
}

function Just(x) {
  Monad.call(this, x);
  this.isNothing = () => false;
  this.map = (fn) => new Maybe(fn(x));
  this.chain = (fn) => new Maybe(unwrap(fn(x)));
  this.orElse = () => this;
}

function Nothing() {
  Monad.call(this);
  this.isNothing = () => true;
  this.map = this.chain = () => this;
  this.toString = () => 'Nothing()';
  this.orElse = (x) => new Maybe(x);
}

const times2 = (x) => 2 * x;
new Maybe(100).map(plus1).map(times2).toString(); //  Just(202)
new Maybe(null).map(plus1).map(times2).toString(); //  Nothing()
new Maybe(1900).orElse(50).map(plus1).toString(); // Just(1901)
new Maybe(null).orElse(50).map(plus1).toString(); // Just(51)
new Maybe(null).map(plus1).orElse(50).toString(); // Just(50)

// Dealing with errors: the EITHER monad

function Either(l, r) {
  !isEmpty(l) ? Left.call(this, l) : Right.call(this, r);

  this.toString = () => `Either(${l},${r})`;
}

function Left(x) {
  Monad.call(this, x);
  this.isLeft = () => true;
  this.map = this.chain = () => this;

  this.recover = (fn) => {
    // evaluate fn() and store it in v
    // if it produces an error e,
    // return new Left(e)
    // otherwise return new Right(v)

    try {
      return new Right(fn());
    } catch (e) {
      return new Left(e);
    }
  };
}

function Right(x) {
  Monad.call(this, x);
  this.isLeft = () => false;
  this.map = (fn) => {
    // call fn(x) and store it in v
    // if fn(x) produced an error e,
    // return new Left(e)
    // otherwise return new Right(v)
    try {
      return new Right(fn(x));
    } catch (e) {
      return new Left(e);
    }
  };
  this.chain = (fn) => {
    // similar to .map() but unwrap v
    // when creating the new Right
    try {
      return new Right(unwrap(fn(x)));
    } catch (e) {
      return new Left(e);
    }
  };
  this.recover = () => this;
}

// Dealing with exceptions: the TRY monad
function Try(fn) {
  try {
    Right.call(this, fn());
  } catch (e) {
    Left.call(this, e.message);
  }
}

// Or, equivalently:

function Try(fn) {
  try {
    Either.call(this, null, fn());
  } catch (e) {
    Either.call(this, e.message, null);
  }
}
