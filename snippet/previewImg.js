const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const reader = new FileReader();

fileInput.onchange = (e) => {
  reader.readAsDataURL(e.target.files[0]);
};

// fileInput.onchange = (e) => {
//   preview.src = URL.createObjectURL(e.target.files[0]);
//   console.log(preview.src);
// };

reader.onload = (e) => {
  preview.src = e.target.result;
  console.log(e.target.result);
};

const objUrl = URL.createObjectURL(new File([''], 'filename'));
console.log(objUrl);
URL.revokeObjectURL(objUrl);
