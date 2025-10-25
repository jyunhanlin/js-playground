// 無限序列產生器 - 惰性產生數字，只在被請求時才計算
// 優勢：不佔用記憶體存儲整個序列
function* dataGenerator() {
  let index = 0;
  while (true) {
    yield index++; // yield 暫停執行，直到 .next() 被呼叫
  }
}

// Generator 轉換器 - 從另一個 generator 取值、處理、再 yield 出去
// 這展示了 generators 可以組合形成處理管道
function* processData(data, processFn) {
  for (let item of data) {
    yield processFn(item); // 惰性處理：只在需要時才執行 processFn
  }
}

// 建立無限數字序列
const data = dataGenerator();

// 組合 generators：建立管道 (data -> *2)
const processedData = processData(data, (item) => item * 2);

// 從無限序列中取 500 個值
// 記憶體使用：O(1) - 任何時刻只存一個值
for (let i = 0; i < 500; i++) {
  console.log(processedData.next().value);
}
