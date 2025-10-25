/**
 * 測試第三方 cookie 是否啟用
 *
 * 注意：現代瀏覽器（Safari/Firefox/Chrome）預設都會阻擋第三方 cookie，
 * 所以這個工具在 2025 年基本上只能確認「第三方 cookie 不可用」。
 *
 * @param {string} iframeUrl - 要測試的第三方域名 iframe URL
 * @param {function} onComplete - 測試完成後的回調，參數為 boolean (是否啟用 cookie)
 */
const testThirdPartyCookie = (iframeUrl, onComplete) => {
  // 步驟 1: 建立隱藏的 iframe
  const iframe = createHiddenIframe(iframeUrl);

  // 步驟 2: 監聽 iframe 回傳的測試結果
  const handleMessage = (event) => {
    try {
      const { isCookieEnabled } = JSON.parse(event.data);

      // 步驟 4: 回傳結果並清理
      onComplete(isCookieEnabled);
      cleanup();
    } catch (error) {
      console.error('解析 iframe 訊息失敗:', error);
    }
  };

  const cleanup = () => {
    window.removeEventListener('message', handleMessage);
    document.body.removeChild(iframe);
  };

  window.addEventListener('message', handleMessage);

  // 步驟 3: iframe 載入完成後，發送測試請求
  iframe.onload = () => {
    iframe.contentWindow.postMessage(JSON.stringify({ action: 'test-cookie' }), '*');
  };

  document.body.appendChild(iframe);
};

/**
 * 建立隱藏的 iframe
 */
function createHiddenIframe(url) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.sandbox = 'allow-scripts allow-same-origin';
  iframe.style.display = 'none';
  return iframe;
}

// ===================================================
// 以下是 iframe 內部的 HTML 內容範例
// 需要部署在第三方域名上
// ===================================================

const iframeHtmlTemplate = /* html */ `
<!doctype html>
<html>
<head>
  <title>Cookie Test</title>
</head>
<body>
  <script>
    // 檢查 cookie 是否啟用
    function isCookieEnabled() {
      // 方法 1: 使用瀏覽器 API
      if (navigator.cookieEnabled) {
        return true;
      }
      
      // 方法 2: 實際寫入測試 (fallback)
      document.cookie = 'testcookie=1';
      const hasCookie = document.cookie.includes('testcookie');
      
      // 清理測試 cookie
      if (hasCookie) {
        document.cookie = 'testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      }
      
      return hasCookie;
    }

    // 監聽父頁面的測試請求
    window.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // 確認是 cookie 測試請求
        if (data.action !== 'test-cookie') {
          return;
        }
        
        // 執行測試並回傳結果
        const result = isCookieEnabled();
        parent.postMessage(
          JSON.stringify({ isCookieEnabled: result }), 
          event.origin
        );
      } catch (error) {
        console.error('Cookie 測試失敗:', error);
      }
    });
  </script>
</body>
</html>
`;
