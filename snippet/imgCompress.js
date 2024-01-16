const ACCEPT = ['image/jpg', 'image/png', 'image/jpeg'];
const MAX_SIZE = 3 * 1024 * 1024;
const MAX_SIZE_STR = '3MB';
const upload = document.getElementById('upload');
upload.addEventListener('change', (e) => {
  const [file] = e.target.files;
  if (!file) return;
  const { type: fileType, size: fileSize } = file;

  if (!ACCEPT.includes(fileType)) {
    upload.value = '';
    return;
  }

  if (fileSize > MAX_SIZE) {
    upload.value = '';
    return;
  }

  covertImageToBase64(file, (base64Image) => compress(base64Image, uploadServer));
});

function covertImageToBase64(file, callback) {
  let reader = new FileReader();
  reader.readAsDataURL(file); // to base64Image

  reader.addEventListener('load', function (e) {
    const base64Image = reader.result;
    callback && callback(base64Image);
    reader = null;
  });
}

function compress(base64Image, callback) {
  let maxW = 800;
  let maxH = 800;
  const image = new Image();
  image.src = base64Image;
  document.body.appendChild(image);
  image.addEventListener('load', function (e) {
    let ratio;
    let needCompress = false;

    if (image.naturalWidth > maxW) {
      needCompress = true;
      ratio = image.naturalWidth / maxW;
      maxH = image.naturalHeight / ratio;
    }
    if (maxH < image.naturalHeight) {
      needCompress = true;
      ratio = image.naturalHeight / maxH;
      maxW = image.naturalWidth / ratio;
    }
    if (!needCompress) {
      maxH = image.naturalHeight;
      maxW = image.naturalWidth;
    }
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', '__compress__');
    canvas.width = maxW;
    canvas.height = maxH;
    canvas.style.visibility = 'hidden';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, maxW, maxH);
    ctx.drawImage(image, 0, 0, maxW, maxH);
    const compressImage = canvas.toDataURL('image/png', 0.9);
    callback && callback(compressImage);

    canvas.remove();
  });
}
