# How Airbnb smoothly upgrades React

> Source: https://medium.com/airbnb-engineering/how-airbnb-smoothly-upgrades-react-b1d772a565fd

## Why incremental upgrades

Monorepo 強制 single version per dependency，傳統做法是 **atomic upgrade**：

- 一次到位的大規模 migration
- 長壽命的升級分支
- 一次部署、`0% → 100%` flip
- 無法在 rollout 前收 production 指標，回滾成本極高

Goals：

- **Upgrade incrementally** — 縮短 feedback loop
- **Upgrade often** — 縮小版本差距
- **Test upgrades** — 量測 performance / 確認回歸

## Two pillars

### 1. Module aliasing

用 yarn 的 `npm:` 協定把第二份 React 以別名安裝：

```json
{
  "dependencies": {
    "react": "16.x",
    "react-18": "npm:react@18"
  }
}
```

再做一份「global alias」設定，在 Babel / Jest / Webpack / 自訂 resolver 統一改寫 `import 'react'` 的解析目標。
→ **使用者程式碼完全不用改**，build pipeline 在不同時機解析到不同實體。

### 2. Environment targeting

每個 React 版本各自出一份 artifact：

- **Control**：React 16
- **Treatment**：React 18

SSR 情境下，兩份 artifact 跑在不同的 Kubernetes environment / Node process。用環境變數（如 `REACT_UPGRADE`）切換版本和條件邏輯。

```
                 ┌────────────────┐  Control (React 16)
   traffic ─────►│ experimentation├──►  k8s env A  ──► artifact built with react@16
                 │     router      │
                 └────────────────┘  Treatment (React 18)
                                  └──►  k8s env B  ──► artifact built with react@18 (alias)
```

兩條 pipeline、兩個版本、共用同一份原始碼，由 experimentation infra 控制流量分配。

## Cross-cutting concerns

### TypeScript

安裝 React 18 types 後，舊版本沒有的 API 需要分類處理：

- **可降級 API**（例：`useTransition`）：建立 shim，在 React 16 build 中回 no-op
- **無法降級 API**（例：`useId`）：用 type augmentation 將型別標成「runtime 可能 undefined」，強迫呼叫端處理

### Tests

- 同一份 unit test 在兩個版本各跑一次，把對 React 內部／API 的假設從 test/adapter 中清掉
- 維護一份 **permitted failures list**：允許暫時失敗，但只能往下收斂、不能新增（ratcheting）

### Component compatibility

升級窗口期間，每個 component 都得能在兩個版本同時跑。仰賴 React 對 backwards compatibility 的承諾（即使 major version 也維持）。

## Rollout phases

1. 修 visual regression / integration / unit test，讓兩個版本都綠
2. 建立 permitted failures ratchet
3. SPA 層級 opt-in switch
4. 先在 internal（staging / dev）環境打開
5. Production 透過流量實驗逐步加碼
6. **升級完成數週後**再採用新 API（concurrent rendering、new root API…）

## Takeaways

- 「保持新版本」應該是分散在時間軸上的常態，不是一次性英雄式 migration
- 雙版本並存的關鍵不是 React 內部魔法，而是 **build-time alias + runtime env targeting** 這套基礎設施
- 同一套機制可以拿來試 canary（例如 React 19 預覽）
- 對長壽命專案，投資 upgrade infra 的 ROI 很高：把一次性大爆炸換成可量測、可回滾的小步前進
