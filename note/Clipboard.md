# Clipboard

## Old fasion way (deprecated)

```js
document.execCommand('copy');
```

## The Clipboard API

**place plain text in the clipboard**

```js
await navigator.clipboard.writeText("That's some cool copied text");
```

**write different MIME types to the clipboard**

```js
await navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(["That's some cool plain text, isn't it?"], {
      type: 'text/plain',
    }),
  }),
]);
```

```js
navigator.clipboard.write([
  new ClipboardItem({
    'text/plain': new Blob(["That's some cool plain text, isn't it?"], {
      type: 'text/plain',
    }),
    'text/html': new Blob(
      ['<div style="/* some styles */">Oh yeah - text/html!</div>'],
      {
        type: 'text/html',
      }
    ),
  }),
]);
```

**inspect clipboard**

```js
try {
  const permission = await navigator.permissions.query({
    name: 'clipboard-read',
  });
  if (permission.state === 'denied') {
    throw new Error('Not allowed to read clipboard.');
  }
  const clipboardContents = await navigator.clipboard.read();
  for (const item of clipboardContents) {
    // do things with the clipboard entries
  }
} catch (error) {
  console.error(error.message);
}
```
