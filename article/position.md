# Position

**檔案可視區域寬**

```js
document.documentElement.clientWidth;
```

**檔案可視區域高**

```js
document.documentElement.clientHeight;
```

**網頁可見區域寬**

```js
document.body.clientWidth;
```

**網頁可見區域高**

```js
document.body.clientHeight;
```

**網頁可見區域寬(包括邊線的寬)**

```js
document.body.offsetWidth;
```

**網頁可見區域高(包括邊線的高)**

```js
document.body.offsetHeight;
```

**網頁正文全文寬**

```js
document.body.scrollWidth;
```

**網頁正文全文高**

```js
document.body.scrollHeight;
```

**網頁被捲去的高**

```js
document.body.scrollTop;
```

**網頁被捲去的左**

```js
document.body.scrollLeft;
```

**網頁正文部分上**

```js
window.screenTop;
```

**網頁正文部分左**

```js
window.screenLeft;
```

**螢幕分辨率的高**

```js
window.screen.height;
```

**螢幕分辨率的寬**

```js
window.screen.width;
```

**螢幕可用工作區高度**

```js
window.screen.availHeight;
```

**螢幕可用工作區寬度**

```js
window.screen.availWidth;
```

---

**螢幕寬度的物理像素值**

```js
window.screen.width * window.devicePixelRatio;
```

**scrollWidth, scrollLeft, 和 clientWidth 三者的關係**

```js
scrollWidth = scrollLeft + clientWidth;

scrollHeight = scrollTop + clientHeight;
```

**offsetWidth 和 clientWidth 的關係**

```js
offsetWidth = 自身寬度 + padding + border;
clientWidth = 自身寬度 + padding;
```

**event.clientX，event.clientY, event.offsetX 和 event.offsetY 的關係**

```js
// 相對於 srcElement的 x, y 座標
event.offsetX, event.offsetY;

// 相對於 viewport 的 x, y 座標，viewport 不包含工具欄與scrollLeft(scrollTop)
event.clientX, event.clientY;

// 相對於 document 的 x, y 座標，document ＝ viewport ＋ scrollLeft(scrollTop)
event.pageX, event.pageY;

// 相對於螢幕左上角的 x, y 座標
event.screenX, event.screenY;
```

**pageX 和 clientX 的關係**

```js
ele.pageX = ele.clientX + ele.scrollLeft;
```

**getBoundingClientRect 的 top, bottom, left, right**

都是相對於 viewport

**movementX 和 movementY**

```js
curEvent.movementX = curEvent.screenX - prevEvent.screenX;
curEvent.movementY = curEvent.screenY - prevEvent.screenY;
```
