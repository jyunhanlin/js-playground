document.fonts.load('lazy load fonts').then(() => {
  const body = document.querySelector('body');
  body.style.fontFamily = `"lazy load fonts", ${window
    .getComputedStyle(body)
    .getPropertyValue('font-family')}`;
});
