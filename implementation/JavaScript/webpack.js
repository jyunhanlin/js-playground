// webpack({
//   entry: './index.js',
//   output: {
//       path: path.resolve(__dirname, "dist"),
//       filename: "[name].js",
//   },
//   module: {
//       rules: []
//   }
// })
class Compiler {
  constructor(options) {
    this.options = options || {};

    this.modules = new Set();
  }

  run(callback) {
    const entryModule = this.build(path.join(process.cwd(), this.options.entry));
    const entryChunk = this.buildChunk('entry', entryModule);
    this.generateFile(entryChunk);
  }

  build(modulePath) {
    let originCode = fs.readFileSync(modulePath);
    originCode = this.dealWidthLoader(modulePath, originCode.toString());
    return this.dealDependencies(originCode, modulePath);
  }

  dealWidthLoader(modulePath, originCode) {
    [...this.options.module.rules].reverse().forEach((item) => {
      if (item.test(modulePath)) {
        const loaders = [...item.use].reverse();
        loaders.forEach((loader) => (originCode = loader(originCode)));
      }
    });
    return originCode;
  }

  dealDependencies(code, modulePath) {
    const fullPath = path.relative(process.cwd(), modulePath);

    const module = {
      id: fullPath,
      dependencies: [],
    };

    const ast = parser.parse(code, {
      sourceType: 'module',
      ast: true,
    });

    traverse(ast, {
      CallExpression: (nodePath) => {
        const node = nodePath.node;
        if (node.callee.name === 'require') {
          const requirePath = node.arguments[0].value;

          const moduleDirName = path.dirname(modulePath);
          const fullPath = path.relative(path.join(moduleDirName, requirePath), requirePath);

          node.callee = t.identifier('__webpack_require__');

          node.arguments = [t.stringLiteral(fullPath)];

          const existModule = [...this.modules].find((item) => item.id === fullPath);

          if (!existModule) {
            module.dependencies.push(fullPath);
          }
        }
      },
    });

    const { code: compilerCode } = generator(ast);

    module._source = compilerCode;

    module.dependencies.forEach((dependency) => {
      const depModule = this.build(dependency);

      this.modules.add(depModule);
    });
    return module;
  }

  buildChunk(entryName, entryModule) {
    return {
      name: entryName,
      entryModule: entryModule,
      modules: this.modules,
    };
  }

  generateFile(entryChunk) {
    const code = this.getCode(entryChunk);
    if (!fs.existsSync(this.options.output.path)) {
      fs.mkdirSync(this.options.output.path);
    }

    fs.writeFileSync(
      path.join(
        this.options.output.path,
        this.options.output.filename.replace('[name]', entryChunk.name)
      ),
      code
    );
  }

  getCode(entryChunk) {
    return `
      (() => {
      // webpackBootstrap
      var __webpack_modules__ = {
        ${entryChunk.modules
          .map(
            (module) => `
            "${module.id}": (module, __unused_webpack_exports, __webpack_require__) => {
            ${module._source}
          }
        `
          )
          .join(',')}
      };

      var __webpack_module_cache__ = {};

      function __webpack_require__(moduleId) {
        // Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
          return cachedModule.exports;
        }
        // Create a new module (and put it into the cache)
        var module = (__webpack_module_cache__[moduleId] = {
          exports: {},
        });

        // Execute the module function
        __webpack_modules__[moduleId](
          module,
          module.exports,
          __webpack_require__
        );

        // Return the exports of the module
        return module.exports;
      }

      var __webpack_exports__ = {};
      // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
      (() => {
        ${entryChunk.entryModule._source};
      })();
    })()
    `;
  }
}

module.exports = Compiler;
