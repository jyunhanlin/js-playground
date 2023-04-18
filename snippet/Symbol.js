/**
 * Symbol.iterator
 */
class Song {
  constructor(name, artist, duration) {
    this.name = name;
    this.artist = artist;
    this.duration = duration;
  }
}

class Playlist {
  constructor() {
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  [Symbol.iterator]() {
    let index = 0;
    const songs = this.songs;
    return {
      next: () => ({
        value: songs[index++],
        done: index > songs.length,
      }),
    };
  }
}

const playlist = new Playlist();

playlist.addSong(new Song('Song 1', 'Artist 1', '3:45'));
playlist.addSong(new Song('Song 2', 'Artist 2', '4:20'));
playlist.addSong(new Song('Song 3', 'Artist 3', '5:10'));

for (const song of playlist) {
  console.log(song.name);
}

/**
 * Symbol.toStringTag
 */
class People {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get [Symbol.toStringTag]() {
    return 'People';
  }
}

const people = new People('John', 18);

console.log(people.toString()); // [object People]

/**
 * Symbol.toPrimitive
 */
class MyDateTime {
  constructor(year, month, day, hour = 0, minute = 0, second = 0) {
    this._datetime = new Date(year, month - 1, day, hour, minute, second);
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return this._datetime.getTime();
      case 'string':
        return this._datetime.toLocaleString();
      default:
        return this._datetime.toString();
    }
  }
}

const myDate = new MyDateTime(2023, 4, 8, 15, 30, 0);

console.log(myDate); // MyDateTime { _datetime: 2023-04-08T07:30:00.000Z }
console.log(myDate + 10000); // Sat Apr 08 2023 15:30:00 GMT+0800 (Taipei Standard Time)10000
console.log(`${myDate}`); // 4/8/2023, 3:30:00 PM

/**
 * Symbol.asyncIterator
 */
class AsyncDataSource {
  constructor(data) {
    this._data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (const item of this._data) {
      const result = await this._processAsyncData(item);
      yield result;
    }
  }

  async _processAsyncData(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item.toUpperCase());
      }, Math.random() * 1000);
    });
  }
}

async function processData() {
  const dataSource = new AsyncDataSource(['a', 'b', 'c', 'd', 'e']);
  for await (const data of dataSource) {
    console.log(data);
  }
}

processData();

/**
 * Symbol.hasInstance
 */
class MyArray1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

const arr = [1, 2, 3];
console.log(arr instanceof MyArray1); // true

// Symbol.species
class MyArray2 extends Array {
  static get [Symbol.species]() {
    return Array;
  }

  test() {
    console.log('test');
  }
}

const myArray = new MyArray2(1, 2, 3);
const mappedArray = myArray.map((x) => x * 2);
myArray.test();

console.log(mappedArray instanceof MyArray2); // false
console.log(mappedArray instanceof Array); // true

/**
 * Symbol.match
 */
class CustomRegExp extends RegExp {
  [Symbol.match](str) {
    const matches = super[Symbol.match](str);
    if (matches) {
      return matches.map((match) => {
        return match;
      });
    }
    return matches;
  }
}

const regex = new CustomRegExp('hello', 'g');
console.log('hello world'.match(regex)); // hello

/**
 * Symbol.replace
 */
const vowels = ['a', 'e', 'i', 'o', 'u'];

const customReplace = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (vowels.includes(str[i])) {
      result += '*';
    } else {
      result += str[i];
    }
  }
  return result;
};

const customString = {
  [Symbol.replace]: customReplace,
};

console.log('hello world'.replace(customString, '')); // outputs "h*ll* w*rld"

/**
 * Symbol.split
 */
const customSplit = (str) => str.split(/[\s$¥€]+/);

const customRegExp = {
  [Symbol.split]: customSplit,
};

const string = '100$200¥300€400 500';

console.log(string.split(customRegExp)); // ['100', '200', '300', '400', '500']

/**
 * Symbol.unscopables
 */
const globalVars = {
  a: 10,
  b: 20,
  [Symbol.unscopables]: {
    b: true,
  },
};

with (globalVars) {
  console.log(a); // 10
  console.log(b); // ReferenceError
}
