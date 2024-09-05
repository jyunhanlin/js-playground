function Container(x) {
  this.map = (fn) => fn(x);
  this.toString = () => `${this.constructor.name}(${x})`;
  this.valueOf = () => x;
}

function Functor(x) {
  Container.call(this, x);
  this.map = (fn) => new this.constructor(fn(x));
}

function Monad(x) {
  Functor.call(this, x);
  const unwrap = (z) => (z.chain ? unwrap(z.valueOf()) : z);
  this.chain = (fn) => new this.constructor(unwrap(fn(x)));
  this.ap = (v) => v.map(x);
}
