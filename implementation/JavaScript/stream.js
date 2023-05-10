const { EventEmitter } = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();

    this.path = path;
    this.flags = options.flags ?? 'r';
    this.encoding = options.encoding ?? 'utf8';
    this.autoClose = options.autoClose ?? true;
    this.start = options.start ?? 0;
    this.end = options.end ?? undefined;
    this.highWaterMark = options.highWaterMark ?? 16 * 1024;
    this.offset = this.start;
    this.flowing = false;

    this.open();

    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this.fd = fd;
      this.emit('open');
    });
  }

  pause() {
    this.flowing = false;
  }

  resume() {
    if (!this.flowing) {
      this.flowing = true;
      this.read();
    }
  }

  read() {
    if (typeof this.fd !== 'number') {
      this.once('open', () => this.read());
      return;
    }

    const buf = Buffer.alloc(this.highWaterMark);
    fs.read(this.fd, buf, 0, buf.length, this.offset, (err, bytesRead) => {
      this.offset += bytesRead;
      if (bytesRead) {
        this.emit('data', buf.slice(0, bytesRead));
        this.flowing && this.read();
      } else {
        this.emit('end');
        this.autoClose && fs.close(this.fd, () => this.emit('close'));
      }
    });
  }
}

class WriteStream extends EventEmitter {
  constructor(path, options = {}) {
    super();

    this.path = path;
    this.flags = options.flags ?? 'w';
    this.encoding = options.encoding ?? 'utf8';
    this.autoClose = options.autoClose ?? true;
    this.highWaterMark = options.highWaterMark ?? 16 * 1024;

    this.offset = 0;
    this.cache = [];
    this.writtenLen = 0;
    this.writing = false;
    this.needDrain = false;

    this.open();
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this.fd = fd;
      this.emit('open');
    });
  }

  clearBuffer() {
    const data = this.cache.shift();
    if (data) {
      const { chunk, cb } = data;
      this._write(chunk, () => {
        cb();
        this.clearBuffer();
      });
      return;
    }

    this.needDrain && this.emit('drain');
    this.writing = false;
    this.needDrain = false;
  }

  write(chunk, encoding, cb = () => {}) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding);
    this.writtenLen += chunk.length;
    const hasLimit = this.writtenLen >= this.highWaterMark;
    this.needDrain = hasLimit;

    if (!this.writing) {
      this.writing = true;
      this._write(chunk, () => {
        cb();
        this.clearBuffer();
      });
    } else {
      this.cache.push({
        chunk: chunk,
        cb,
      });
    }

    return !hasLimit;
  }

  _write(chunk, cb) {
    if (typeof this.fd !== 'number') {
      this.once('open', () => this._write(chunk, cb));
      return;
    }

    fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, bytesWritten) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this.offset += bytesWritten;
      this.writtenLen -= bytesWritten;
      cb();
    });
  }
}
