/**
 * CSS 用法（推薦）：
 *
 * @font-face {
 *   font-family: 'MyFont';
 *   src: url('fonts/myfont.woff2') format('woff2'),
 *        url('fonts/myfont.woff') format('woff');
 *   font-weight: 400;
 *   font-style: normal;
 *   font-display: swap;  // 關鍵：立即顯示備用字體，加載後切換
 * }
 *
 * body {
 *   font-family: 'MyFont', sans-serif;
 * }
 *
 * font-display 選項：
 * - swap: 立即顯示備用字體（推薦，避免 FOIT）
 * - optional: 100ms 內加載完才用自訂字體，否則此次瀏覽不用
 * - fallback: 短暫隱藏文字（100ms），然後顯示備用字體，3 秒內加載完可切換
 * - block: 隱藏文字直到加載完（不推薦，會 FOIT）
 */

// 大部分情況用 CSS 就夠，不需要 JS。JS 的優勢是可以條件加載（例如：根據用戶語言決定加載哪個字體）。

// 方法 1: 加載已在 CSS 中定義的字體（需要 @font-face 規則）
function loadExistingFont(fontFamily, options = {}) {
  const { weight = '400', style = 'normal', size = '12px' } = options;
  return document.fonts.load(`${style} ${weight} ${size} "${fontFamily}"`).then(() => {
    document.body.style.fontFamily = `"${fontFamily}", ${window
      .getComputedStyle(document.body)
      .getPropertyValue('font-family')}`;
  });
}

// 方法 2: 動態加載新字體（完全 JS 控制）
function loadCustomFont(fontFamily, url, options = {}) {
  const { weight = '400', style = 'normal' } = options;
  const font = new FontFace(fontFamily, `url(${url})`, { weight, style });

  return font
    .load()
    .then((loadedFont) => {
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = `"${fontFamily}", ${window
        .getComputedStyle(document.body)
        .getPropertyValue('font-family')}`;
    })
    .catch((error) => {
      console.error('字體加載失敗:', error);
    });
}

// 使用示例：
// loadExistingFont('MyFont', { weight: 'bold' });
// loadCustomFont('MyFont', 'fonts/myfont.woff2', { weight: '700' });
