function setupCanvas(canvas, { responsive = true } = {}) {
  const ctx = canvas.getContext('2d');

  const canvasDimensions = {};

  function update() {
    const dpr = window.devicePixelRatio;
    const { width, height } = canvas.getBoundingClientRect();

    canvas.setAttribute('width', width * dpr);
    canvas.setAttribute('height', height * dpr);

    ctx.scale(dpr, dpr);

    canvasDimensions.width = width;
    canvasDimensions.height = height;
  }

  // Call `update` whenever the window is resized:
  if (responsive) window.addEventListener('resize', update);

  // Also call it immediately, to do the initial
  // calculations and setup work:
  update();

  return { ctx, canvasDimensions };
}
