function mousePosition(event) {
  if (event.pageX || event.pageY) {
    return { x: event.pageX, y: event.pageY };
  }
  return {
    x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: event.clientY + document.body.scrollTop - document.body.clientTop,
  };
}

// get the current scroll position
let scrollOffset = window.scrollY || document.documentElement.scrollTop;
