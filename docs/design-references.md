# Personal Portfolio — Design References & Patterns

> 彙整 2022 前端 bootcamp 26 個同學個人網站（存活 15 個）的設計模式觀察，做為本 `github-io` 專案迭代與擴展的參考依據。

**產出時間**: 2026-04-16
**來源**: [HackMD 前端驗收](https://hackmd.io/@QgDwLq0-RGGscgjXHryf6g/HyLbxpA0t)
**定位**: 本站為 Cloud/DevOps/Platform Engineer 履歷補充網站，採用 Brittany Chiang 風（navy + teal + mono）

---

## 目錄

- [1. 觀察摘要](#1-觀察摘要)
- [2. 可抄的設計模式](#2-可抄的設計模式)
- [3. 必避的反模式](#3-必避的反模式)
- [4. 網站分類評比](#4-網站分類評比)
- [5. Resume 網站 vs Portfolio 網站 的定位差異](#5-resume-網站-vs-portfolio-網站-的定位差異)

---

## 1. 觀察摘要

### 1.1 抓取結果

| 類別 | 數量 | 備註 |
|------|-----:|------|
| 原始總數 | 26 | HackMD 列出的同學連結 |
| 已失效 (404) | 11 | 2022 bootcamp 畢業後沒續約/沒續維護 |
| 可分析 | 15 | 以下全部分析以這 15 站為基礎 |

### 1.2 15 個存活網站的共同特徵

- **Layout**：多為 SPA + 錨點導覽（約 10/15），少數多頁（Ethan、Una、Winnie）
- **Hero**：大頭照 + 姓名 + 一句 positioning 是標配
- **Framework**：多用 Bootstrap 或 BootstrapMade 免費模板（Gina 直接掛致謝就是這類）
- **語言**：中英雙語混用普遍（繁中姓名 + 英文職稱）
- **託管**：`github.io` 為主 (13/15)，另有 Netlify、w3spaces

### 1.3 整體品質評估

> 大多完工度不高。普遍問題是 Lorem ipsum 沒換、placeholder 圖沒換、URL 拼錯、skill 百分比亂寫。真正能拿出來給 HR 的不到 3 個。

---

## 2. 可抄的設計模式

### 2.1 佈局 (Layout)

| 模式 | 採用者 | 評語 |
|------|--------|------|
| Fixed Sidebar Nav | April | 錨點清晰、視線動線穩，適合資訊多的履歷 |
| Sticky Top Nav | 怡蓁、Peter | 單頁 SPA 最通用 |
| Timeline Section | (Brittany Chiang 風) | 呈現經歷演進最直覺 |

### 2.2 Hero 要素

- **一句 positioning**：`"Cloud/DevOps Engineer based in Taipei"` 類型，避免 "Lv 0.1"、"學生" 這種弱化詞
- **CTA**：2 顆按鈕（主 + 次），例如 `View Projects` / `About Me`
- **Social icons**：GitHub + LinkedIn + Email 為國際向標配；台灣在地可加 Line

### 2.3 Section 黃金順序

```
About → Experience (timeline) → Projects → Skills → Certifications → Contact
```

說明：
- About 先建信任、給 context
- Experience timeline 建立「時間線敘事」
- Projects 是主秀
- Skills、Certs 放後段當佐證
- Contact 當 CTA 收尾

### 2.4 Project Card 必備三要素

每個 project card 至少包含：

1. **Screenshot** 或 icon（視覺錨點）
2. **一句 problem/solution** 敘述 + 量化成果
3. **雙連結**：Live Demo + GitHub Repo

### 2.5 Skills 呈現建議

- ✅ **分類 Tag**：Cloud / DevOps / Systems 三段分類（本站現行做法）
- ✅ **二階層次**：「熟練 / 使用過」兩層
- ❌ **避免百分比 bar**（April、Gina 的雷區）
- ❌ **避免單一字串列表**（Evan 的 `Java, html, css, js`）

---

## 3. 必避的反模式

| 反模式 | 觀察樣本 | 為什麼不能做 |
|--------|---------|-------------|
| Lorem ipsum 未替換 | Peter, Evan | HR 看到直接判定未完工 |
| Placeholder 圖片未換 | Jason (300x400 灰色 block) | 同上 |
| URL 拼錯 | Ellen (`Porfolio`)、妤臻 (`hompage`) | 細節失守 |
| 過度自貶文案 | Jane (「中文系生存不易」) | 心態訊號差 |
| 惡搞用動物照 / 虛構年份 | Richer (狗、2000-Present) | 正職求職不合適 |
| Skill 百分比量化 | April (`Eating 85%`) | 吃飯不是技能 |
| 直接掛模板致謝 | Gina (BootstrapMade) | 零客製化訊號 |
| 按鈕拼字錯誤 | Jason (`summit`) | 英文檢查失守 |
| 純黑背景不可讀 | Max (留言區自己吐槽「這網站好黑」) | WCAG 對比度不合格 |
| Form 邏輯錯誤 | Ellen (post 400、form 與驗證衝突) | 功能驗證沒做 |

---

## 4. 網站分類評比

### A. 設計較完整（可參考）

| 同學 | URL | 亮點 | 缺點 |
|------|-----|------|------|
| **April** | [f2e_resume](https://huotsai2fi.github.io/f2e_resume/) | Fixed sidebar、Portfolio 可篩選、資訊最完整 | Skill 百分比反模式 |
| Ellen | [Porfolio](https://yyellen.github.io/Porfolio/) | 遊戲風自我定位「Lv 0.1」有辨識度 | URL 拼錯、Lv 0.1 弱化 seniority |
| Max | [Portfolio](https://maxh0401.github.io/Portfolio/) | 動畫 + 前端雙技能差異化 | 純黑對比差、留言區不該放履歷 |

### B. Bootstrap 模板套版（中規中矩）

- Gina [personal](https://ginachiu0212.github.io/personal/) — BootstrapMade 直接致謝
- Peter [resume](https://peterchennn.github.io/resume/resume.html) — Lorem ipsum 未清
- Kelly [PersonalProject](https://siouhuaihuang.github.io/PersonalProject/index.html) — 零 hover 反饋

### C. 結構對但視覺弱

- Ethan [resume](https://ethanseafood.github.io/resume/) — 雙語 + 國際經歷但預設樣式重
- Winnie [myResume](https://winnie0602.github.io/myResume/) — 無 portfolio
- 怡蓁 [cv](https://yi-chen1997.github.io/cv/) — Resume 走 Google Drive 下載（實用）但樣本不足

### D. 不建議仿照

- 妤臻 [hompage](https://hedgehog-chien.github.io/hompage/) — URL 拼錯
- Evan [portfolio-website](https://evan1106.github.io/portfolio-website/) — Lorem ipsum + skill 字串
- Richer [resume-web](https://richeryuan.github.io/resume-web/) — 狗照片 + 惡搞文案
- Una [portfolio](https://una0129.github.io/portfolio/) — 內容量不足
- Jason [jasonchen23](https://jasonchen23.github.io/) — Placeholder 未換 + 拼字錯
- Jane [cart](https://jenny2234.github.io/cart/) — 自貶文案

---

## 5. Resume 網站 vs Portfolio 網站 的定位差異

| 維度 | 前端班 Portfolio | 本站（Cloud/DevOps Resume） |
|------|------------------|----------------------------|
| **核心賣點** | 展示 CSS / 動畫手感 | 展示工程深度 + 雲端架構 |
| **視覺風格** | 繽紛、有插畫 / 動畫 | 深色、Monospace、低彩度 |
| **Projects 呈現** | 購物車 / Todo List 類前端 demo | Infra-as-Code / Migration / 自動化案例 |
| **Tech Stack 重點** | HTML/CSS/JS/Bootstrap/Vue/React | AWS / Terraform / K8s / Linux |
| **CTA** | 「看我的設計」 | 「看我解決的問題」 |
| **可比較對象** | Dribbble 風設計師 portfolio | [brittanychiang.com](https://brittanychiang.com)、[leerob.io](https://leerob.io) |

**結論**：本站不用抄前端班，但要汲取「資訊架構」與「專業度細節」（避開 11 個反模式）。

---

## 附錄：可借鏡的國際範本

- [Brittany Chiang](https://brittanychiang.com/) — Cloud/DevOps 工程師首選風
- [Lee Robinson](https://leerob.io/) — 多頁結構、blog 整合、MDX 驅動
- [Josh Comeau](https://www.joshwcomeau.com/) — 互動細節、個人品牌敘事
- [Kent C. Dodds](https://kentcdodds.com/) — 教育者定位 + 技術文章整合
