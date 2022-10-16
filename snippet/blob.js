// 1. ArrayBuffer -> blob
const blob = new Blob([new Uint8Array(arrayBuffer, byteOffset, length)]);

// 2. ArrayBuffer -> base64
const base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));

// 3. base64 -> blob
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

// 4. blob -> ArrayBuffer
const blobToArrayBuffer = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });

// 5. blob -> base64
const blobToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });

// 6. blob -> Object URL
const objectUrl = URL.createObjectURL(blob);
