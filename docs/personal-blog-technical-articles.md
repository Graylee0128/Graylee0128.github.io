# Technical Articles

個人技術部落格文章集合

## 概述
此倉庫用於存放技術相關的部落格文章和筆記。

### 內容策略：Pillar + Cluster

採用「Pillar（主文）+ Cluster（子文）」策略來組織內容：

**主文（Pillar）**
- 特定領域的全景概述
- 例：「AWS 內網到底是什麼？我的釐清過程」
- 提供完整的知識框架和導航

**子文（Cluster）**
- 主文中各個核心概念的深度拆解
- 例：PrivateLink 完整拆解、Direct Connect 完整拆解等
- 每篇都能獨立傳播，也能引導讀者回到主文

### 內容飛輪（示例）

以備考 ANS/SCS 為例的內容飛輪：

```
備考 ANS/SCS 等認證
    ↓
遇到搞不懂的概念
    ↓
寫 Pillar 文（釐清過程）
    ↓
拆出 Cluster 文（每個概念深挖）
    ↓
備考完成 = 一個完整的領域知識庫
```

**注：** 飛輪的觸發點和終點可根據不同領域調整（工作專案、技術研究、興趣探索等）

**這個結構的優勢：**
- 每篇子文都可獨立傳播，但能互相引導
- 備考進度直接驅動內容產出（不需另外找題目）
- 越寫越深，自然從「陪跑者」變成「領域參考資源」

## 文章列表

### Pillar 文（主文）
- AWS 內網詳解系列
  - [AWS 內網到底是什麼？我的釐清過程](./aws-private-network-explained.md)

### Cluster 文（子文）
*以下文章待展開*
- PrivateLink 完整拆解
- Direct Connect 完整拆解
- VPC Peering vs PrivateLink 對比

## 如何使用

### 新增文章流程
1. **備考遇到不懂的概念** → 決定是寫 Pillar 還是 Cluster 文
2. **Pillar 文結構**
   - 開頭：為什麼我需要理解這個概念
   - 中段：核心概念拆解
   - 結尾：引導到相關 Cluster 文

3. **Cluster 文結構**
   - 深度探討單一概念
   - 結尾附上相關 Pillar 文鏈結
   - 注明與其他 Cluster 文的關係

4. 在此 README 中更新文章列表

---
持續更新中...
