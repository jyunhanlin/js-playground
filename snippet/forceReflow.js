// reference: https://gist.github.com/paulirish/5d52fb081b3570c81e3a

/**
 * 強制瀏覽器立即執行 reflow (重新計算布局)
 *
 * 原理：
 * - 瀏覽器通常會延遲計算布局以優化性能
 * - 當讀取幾何屬性（offsetHeight）時，瀏覽器必須立即計算才能返回正確值
 *
 * 使用場景：
 * - 需要在兩次 DOM 修改之間觸發獨立的 CSS transition
 * - 確保樣式改變在下一次操作前完成
 *
 * 範例：
 *   element.style.transform = 'translateX(100px)';
 *   document.body.offsetHeight;  // 強制 reflow
 *   element.style.transform = 'translateX(0px)';  // 觸發新的 transition
 *
 * 其他可用屬性：offsetWidth, clientHeight, scrollTop, getBoundingClientRect() 等
 *
 * 注意：reflow 代價高，只在必要時使用
 */
document.body.offsetHeight;
