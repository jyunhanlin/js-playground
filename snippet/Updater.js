export class Updater {
  constructor(options) {
    this.oldScript = [];
    this.newScript = [];
    this.dispatch = {};
    this.init();
    this.timing(options?.timer);
  }

  async init() {
    const html = await this.getHtml();
    this.oldScript = this.parserScript(html);
  }

  async getHtml() {
    const html = await fetch('/').then((res) => res.text());
    return html;
  }

  parserScript(html) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/gi);
    return html.match(reg);
  }

  on(key, fn) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn);
    return this;
  }

  compare(oldArr, newArr) {
    const base = oldArr.length;
    const arr = Array.from(new Set(oldArr.concat(newArr)));

    if (arr.length === base) {
      this.dispatch['no-update'].forEach((fn) => {
        fn();
      });
    } else {
      this.dispatch['update'].forEach((fn) => {
        fn();
      });
    }
  }

  timing(time = 10000) {
    setInterval(async () => {
      const newHtml = await this.getHtml();
      this.newScript = this.parserScript(newHtml);
      this.compare(this.oldScript, this.newScript);
    }, time);
  }
}

const up = new Updater({
  timer: 2000,
});

up.on('no-update', () => {
  console.log('no update');
});

up.on('update', () => {
  console.log('updated');
});
