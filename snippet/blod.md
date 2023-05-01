# blob

## ArrayBuffer -> blob

```js
const blob = new Blob([new Uint8Array(arrayBuffer, byteOffset, length)]);
```

## ArrayBuffer -> base64

```js
const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
```

```js
const toDataURL = async (url) => {
  const response = await fetch(url);
  const contentType = response.headers.get('content-type');
  const buffer = await response.arrayBuffer();
  return `data:${contentType};base64,${Buffer.from(buffer).toString('base64')}`;
};
```

## base64 -> blob

```js
const base64ToBlob = (base64Data, contentType, sliceSize) => {
  const byteChars = atob(base64Data);
  const byteArray = [];

  for (let i = 0; i < byteChars.length; i += sliceSize) {
    const slice = byteChars.slice(i, i + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let j = 0; j < slice.length; j += 1) {
      byteNumbers[j] = slice.charCodeAt(j);
    }

    byteArray.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArray, { type: contentType });
};
```

## blob -> ArrayBuffer

```js
const blobToArrayBuffer = (blob) =>
  new Promise((resolve, reject) => {
    if (blob.arrayBuffer) {
      resolve(blob.arrayBuffer());
    } else {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    }
  });
```

## blob -> base64

```js
const blobToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
```

## blob -> Object URL

```js
const objectUrl = URL.createObjectURL(blob);
```
