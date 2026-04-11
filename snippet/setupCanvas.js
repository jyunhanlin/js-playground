function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');

  const { width, height } = canvas.getBoundingClientRect();

  const dpr = window.devicePixelRatio;

  canvas.setAttribute('width', width * dpr);
  canvas.setAttribute('height', height * dpr);

  ctx.scale(dpr, dpr);

  return {
    ctx,
    canvasWidth: width,
    canvasHeight: height,
  };
}
