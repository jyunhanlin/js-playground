// in css
// :root {
//   --app-height: 100vh;
// }
//
// .my-element {
//   height: 100vh; /* Fallback for browsers that do not support Custom Properties */
//   height: var(--app-height);
// }

// We listen to the resize event
window.addEventListener('resize', () => {
  // document.querySelector(.my-element).style.height = `${window.innerHeight}px`;
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
});
