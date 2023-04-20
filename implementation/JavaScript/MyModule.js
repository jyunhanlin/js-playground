const path = require('path');
const vm = require('vm');
const fs = require('fs');

function MyModule(id = '') {
  this.id = id;
  this.exports = {};
  this.loaded = false;
}

MyModule._cache = {};
MyModule._extensions = {};

MyModule.wrapper = [
  '(function (myExports, myRequire, myModule, __filename, __dirname) { ',
  '\n});',
];

MyModule.wrap = function (script) {
  return MyModule.wrapper[0] + script + MyModule.wrapper[1];
};

MyModule.prototype.require = function (id) {
  return MyModule._load(id);
};

MyModule._load = function (request) {
  const filename = MyModule._resolveFilename(request);

  const cachedModule = MyModule._cache[filename];
  if (cachedModule) return cachedModule.exports;

  const module = new MyModule(filename);

  MyModule._cache[filename] = module;

  module.load(filename);

  return module.exports;
};

MyModule._resolveFilename = function (request) {
  return path.resolve(request);
};

MyModule.prototype.load = function (filename) {
  const extname = path.extname(filename);

  MyModule._extensions[extname](this, filename);

  this.loaded = true;
};

MyModule._extensions['.js'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(content, filename);
};

MyModule.prototype._compile = function (content, filename) {
  var self = this;
  const wrapper = MyModule.wrap(content);

  const compiledWrapper = vm.runInThisContext(wrapper, {
    filename,
  });
  const dirname = path.dirname(filename);

  const args = [self.exports, self.require, self, filename, dirname];
  return compiledWrapper.apply(self.exports, args);
};

const myModuleInstance = new MyModule();
const MyRequire = (id) => {
  return myModuleInstance.require(id);
};

module.exports = {
  MyModule,
  MyRequire,
};
