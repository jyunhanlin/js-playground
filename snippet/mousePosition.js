function mousePosition(event) {
  if (event.pageX || event.pageY) {
    return { x: event.pageX, y: event.pageY };
  }
  return {
    x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: event.clientY + document.body.scrollTop - document.body.clientTop,
  };
}

// 檔案可視區域寬： document.documentElement.clientWidth
// 檔案可視區域高： document.documentElement.clientHeight

// 網頁可見區域寬： document.body.clientWidth
// 網頁可見區域高： document.body.clientHeight
// 網頁可見區域寬： document.body.offsetWidth (包括邊線的寬)
// 網頁可見區域高： document.body.offsetHeight (包括邊線的高)
// 網頁正文全文寬： document.body.scrollWidth
// 網頁正文全文高： document.body.scrollHeight
// 網頁被捲去的高： document.body.scrollTop
// 網頁被捲去的左： document.body.scrollLeft
// 網頁正文部分上： window.screenTop
// 網頁正文部分左： window.screenLeft
// 螢幕分辨率的高： window.screen.height
// 螢幕分辨率的寬： window.screen.width
// 螢幕可用工作區高度： window.screen.availHeight
// 螢幕可用工作區寬度： window.screen.availWidth

// get the current scroll position
let scrollOffset = window.scrollY || document.documentElement.scrollTop;
