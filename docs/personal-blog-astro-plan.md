# Astro 個人部落格實施計畫

## 專案概述

建立一個功能完整的 Astro 5.0 個人部落格，包含文章管理、分類標籤、搜尋和留言功能，部署到 GitHub Pages。

**專案目錄**: `c:\Users\李欣翰\Downloads\0131-github-mgr\personal-blog`

## 技術堆疊

- **框架**: Astro 5.0 (使用新的 Content Layer API)
- **內容管理**: Content Collections + Markdown
- **搜尋**: Pagefind (基於 Rust，高效能)
- **留言**: Giscus (基於 GitHub Discussions)
- **部署**: GitHub Pages (未來可遷移到 Vercel)
- **CI/CD**: GitHub Actions

## 核心功能

1. ✅ 文章列表和詳情頁
2. ✅ 分類系統
3. ✅ 標籤系統
4. ✅ 全文搜尋 (Pagefind)
5. ✅ 留言功能 (Giscus)
6. ✅ 響應式設計
7. ✅ 自動部署

## 實施步驟

### 步驟 1: 建立專案目錄結構

建立 `personal-blog` 目錄並初始化 Astro 專案：

```bash
# 建立目錄
mkdir personal-blog
cd personal-blog

# 初始化 Astro 專案 (使用 blog 範本)
npm create astro@latest . -- --template blog --typescript strict --install

# 初始化 Git
git init
git branch -M main
```

**關鍵檔案**:
- `package.json` - 相依性管理
- `astro.config.mjs` - Astro 設定
- `tsconfig.json` - TypeScript 設定

### 步驟 2: 安裝額外相依套件

```bash
# 安裝 Pagefind 搜尋
npm install -D pagefind

# 更新 package.json scripts
# "build": "astro check && astro build && pagefind --site dist --force-language zh"
```

### 步驟 3: 設定 Astro 核心設定

**檔案**: `astro.config.mjs`

關鍵設定：
- `site: 'https://graylee0128.github.io'` (User Pages)
- `base: '/'` (根路徑部署)
- `output: 'static'` (靜態生成)
- Markdown 語法高亮設定

完整設定範例：

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://graylee0128.github.io',
  base: '/',
  output: 'static',

  build: {
    assets: '_astro',
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
```

### 步驟 4: 設定 Content Collections (Astro 5.0 新 API)

**檔案**: `src/content.config.ts`

使用新的 `loader: glob()` API 替代舊的 `type: 'content'`：

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Graylee'),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

**重要特性**:
- 使用 `loader: glob()` 替代舊的 `type: 'content'`
- 內容不再限於 `src/content/`，可放在任何位置
- 支援遠端內容載入
- 建置速度提升 5 倍

### 步驟 5: 建立目錄結構

```bash
# 內容目錄（依分類組織）
mkdir -p src/content/blog/aws
mkdir -p src/content/blog/web-dev
mkdir -p src/content/blog/python
mkdir -p src/content/blog/work-logs

# 元件目錄
mkdir -p src/components

# 版面配置目錄
mkdir -p src/layouts

# 工具函式
mkdir -p src/utils

# 靜態資源
mkdir -p public/images
```

完整專案結構：

```
personal-blog/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # GitHub Actions 部署設定
│
├── public/                            # 靜態資源
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/                        # 部落格圖片
│
├── src/
│   ├── components/                    # 可重用元件
│   │   ├── Header.astro              # 導覽列
│   │   ├── Footer.astro              # 頁尾
│   │   ├── BlogCard.astro            # 文章卡片
│   │   ├── TagList.astro             # 標籤列表
│   │   ├── CategoryList.astro        # 分類列表
│   │   ├── Pagination.astro          # 分頁元件
│   │   ├── TableOfContents.astro     # 目錄
│   │   ├── Search.astro              # 搜尋元件 (Pagefind)
│   │   └── Comments.astro            # 留言元件 (Giscus)
│   │
│   ├── content/                       # 內容集合
│   │   └── blog/                     # 部落格文章
│   │       ├── aws/                  # AWS 相關
│   │       ├── web-dev/              # Web 開發
│   │       ├── python/               # Python
│   │       └── work-logs/            # 工作記錄
│   │
│   ├── content.config.ts             # Content Collections 設定
│   │
│   ├── layouts/                       # 版面配置元件
│   │   ├── BaseLayout.astro          # 基礎版面配置
│   │   ├── BlogLayout.astro          # 部落格文章版面配置
│   │   └── ListLayout.astro          # 列表頁版面配置
│   │
│   ├── pages/                         # 路由頁面
│   │   ├── index.astro               # 首頁
│   │   ├── blog/
│   │   │   ├── index.astro           # 文章列表
│   │   │   ├── [slug].astro          # 文章詳情 (動態路由)
│   │   │   └── [page].astro          # 分頁
│   │   ├── categories/
│   │   │   ├── index.astro           # 分類列表
│   │   │   └── [category].astro      # 分類下的文章
│   │   ├── tags/
│   │   │   ├── index.astro           # 標籤列表
│   │   │   └── [tag].astro           # 標籤下的文章
│   │   ├── search.astro              # 搜尋頁面
│   │   └── about.astro               # 關於頁面
│   │
│   ├── styles/                        # 全域樣式
│   │   └── global.css
│   │
│   └── utils/                         # 工具函式
│       ├── formatDate.ts             # 日期格式化
│       ├── sortPosts.ts              # 文章排序
│       └── getUniqueTags.ts          # 取得唯一標籤
│
├── astro.config.mjs                   # Astro 設定
├── package.json                       # 相依性管理
├── tsconfig.json                      # TypeScript 設定
└── README.md                          # 專案說明
```

### 步驟 6: 開發核心頁面

#### 6.1 首頁 (`src/pages/index.astro`)
- 展示最新 5 篇文章
- 簡介和導覽連結

範例程式碼：
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import BlogCard from '@/components/BlogCard.astro';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const recentPosts = allPosts
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 5);
---

<BaseLayout title="首頁">
  <h1>歡迎來到我的技術部落格</h1>
  <h2>最新文章</h2>
  <div class="posts-grid">
    {recentPosts.map((post) => <BlogCard post={post} />)}
  </div>
</BaseLayout>
```

#### 6.2 文章列表頁 (`src/pages/blog/index.astro`)

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '@/layouts/BaseLayout.astro';
import BlogCard from '@/components/BlogCard.astro';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);
const sortedPosts = allPosts.sort((a, b) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout title="所有文章">
  <h1>技術文章</h1>
  <div class="posts-grid">
    {sortedPosts.map((post) => <BlogCard post={post} />)}
  </div>
</BaseLayout>
```

#### 6.3 文章詳情頁 (`src/pages/blog/[slug].astro`)
- 動態路由生成
- Markdown 內容渲染
- 目錄 (TOC)
- 留言元件

**關鍵邏輯**:
```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '@/layouts/BlogLayout.astro';
import Comments from '@/components/Comments.astro';
import TableOfContents from '@/components/TableOfContents.astro';

// 生成所有文章的靜態路徑
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await post.render();
---

<BlogLayout frontmatter={post.data}>
  <TableOfContents headings={headings} />
  <article data-pagefind-body>
    <h1>{post.data.title}</h1>
    <Content />
  </article>
  <Comments />
</BlogLayout>
```

#### 6.4 分類頁 (`src/pages/categories/[category].astro`)

```astro
---
import { getCollection } from 'astro:content';
import ListLayout from '@/layouts/ListLayout.astro';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog');

  // 取得所有唯一分類
  const uniqueCategories = [...new Set(allPosts.map((post) => post.data.category))];

  return uniqueCategories.map((category) => {
    const filteredPosts = allPosts.filter(
      (post) => post.data.category === category
    );

    return {
      params: { category },
      props: { posts: filteredPosts },
    };
  });
}

const { category } = Astro.params;
const { posts } = Astro.props;
---

<ListLayout title={`分類: ${category}`}>
  <h1>分類: {category}</h1>
  <div class="posts-grid">
    {posts.map((post) => <BlogCard post={post} />)}
  </div>
</ListLayout>
```

#### 6.5 標籤頁 (`src/pages/tags/[tag].astro`)
類似分類實作，使用標籤過濾文章。

### 步驟 7: 開發可重用元件

**關鍵元件**:

#### 1. Header.astro - 導覽列
```astro
<header>
  <nav>
    <a href="/">首頁</a>
    <a href="/blog">部落格</a>
    <a href="/categories">分類</a>
    <a href="/tags">標籤</a>
    <a href="/search">搜尋</a>
    <a href="/about">關於</a>
  </nav>
</header>
```

#### 2. Footer.astro - 頁尾
```astro
<footer>
  <p>&copy; 2026 Graylee. All rights reserved.</p>
</footer>
```

#### 3. BlogCard.astro - 文章卡片
```astro
---
const { post } = Astro.props;
const { title, description, pubDate, category, tags } = post.data;
---

<article class="blog-card">
  <h2><a href={`/blog/${post.id}`}>{title}</a></h2>
  <p>{description}</p>
  <div class="meta">
    <time>{pubDate.toLocaleDateString('zh-TW')}</time>
    <span class="category">{category}</span>
  </div>
  <div class="tags">
    {tags.map(tag => <span class="tag">{tag}</span>)}
  </div>
</article>
```

#### 4. Pagination.astro - 分頁
```astro
---
const { currentPage, totalPages } = Astro.props;
---

<nav class="pagination">
  {currentPage > 1 && <a href={`/blog/${currentPage - 1}`}>上一頁</a>}
  <span>第 {currentPage} 頁，共 {totalPages} 頁</span>
  {currentPage < totalPages && <a href={`/blog/${currentPage + 1}`}>下一頁</a>}
</nav>
```

#### 5. TableOfContents.astro - 文章目錄
```astro
---
const { headings } = Astro.props;
---

<nav class="toc">
  <h2>目錄</h2>
  <ul>
    {headings.map(({ depth, slug, text }) => (
      <li class={`toc-level-${depth}`}>
        <a href={`#${slug}`}>{text}</a>
      </li>
    ))}
  </ul>
</nav>
```

#### 6. Search.astro - 搜尋元件
將在步驟 8 詳細說明。

#### 7. Comments.astro - 留言元件
將在步驟 9 詳細說明。

### 步驟 8: 整合 Pagefind 搜尋

#### 8.1 設定建置腳本

**檔案**: `package.json`

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build && pagefind --site dist --force-language zh",
    "preview": "astro preview"
  }
}
```

**說明**:
- `--force-language zh`: 強制中文語言支援，改善中文分詞效果

#### 8.2 標記可搜尋內容

在 `src/layouts/BlogLayout.astro` 的文章內容上添加：

```html
<article data-pagefind-body>
  <Content />
</article>
```

**重要**: 只有帶有 `data-pagefind-body` 屬性的內容才會被索引。

#### 8.3 建立搜尋元件

**檔案**: `src/components/Search.astro`

```astro
---
// 無需伺服器端程式碼
---

<div id="search-container">
  <input type="search" id="search-input" placeholder="搜尋文章..." />
  <div id="search-results"></div>
</div>

<style>
  #search-container {
    max-width: 600px;
    margin: 2rem auto;
  }

  #search-input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }

  #search-results {
    margin-top: 1rem;
  }

  #search-results a {
    display: block;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
  }

  #search-results a:hover {
    background-color: #f9fafb;
  }

  #search-results h3 {
    margin: 0 0 0.5rem 0;
    color: #1f2937;
  }

  #search-results p {
    margin: 0;
    color: #6b7280;
    font-size: 0.9rem;
  }
</style>

<script>
  // 動態載入 Pagefind
  window.addEventListener('DOMContentLoaded', async () => {
    const pagefind = await import('/pagefind/pagefind.js');
    await pagefind.init();

    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput?.addEventListener('input', async (e) => {
      const query = e.target.value;

      // 至少輸入 2 個字元才搜尋
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }

      const results = await pagefind.search(query);

      if (results.results.length === 0) {
        searchResults.innerHTML = '<p>未找到相關文章</p>';
        return;
      }

      // 渲染搜尋結果
      const resultsHTML = await Promise.all(
        results.results.map(async (r) => {
          const data = await r.data();
          return `
            <a href="${data.url}">
              <h3>${data.meta.title || '無標題'}</h3>
              <p>${data.excerpt}</p>
            </a>
          `;
        })
      );

      searchResults.innerHTML = resultsHTML.join('');
    });
  });
</script>
```

**優勢**:
- 自動索引建置
- 按需載入搜尋索引 (節省頻寬)
- 支援中文分詞
- 零設定

#### 8.4 建立搜尋頁面

**檔案**: `src/pages/search.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import Search from '@/components/Search.astro';
---

<BaseLayout title="搜尋">
  <h1>搜尋文章</h1>
  <Search />
</BaseLayout>
```

### 步驟 9: 整合 Giscus 留言系統

#### 9.1 GitHub 準備工作

在 GitHub 上:
1. 確保部落格儲存庫為 **public**
2. 啟用 **Discussions** 功能 (Settings → Features → Discussions)
3. 訪問 [Giscus 官網](https://giscus.app/)，輸入儲存庫名稱獲取設定參數

#### 9.2 建立留言元件

**檔案**: `src/components/Comments.astro`

```astro
---
const { title } = Astro.props;
---

<div class="comments-section">
  <h2>留言</h2>
  <script
    src="https://giscus.app/client.js"
    data-repo="Graylee0128/Graylee0128.github.io"
    data-repo-id="YOUR_REPO_ID"
    data-category="Announcements"
    data-category-id="YOUR_CATEGORY_ID"
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="top"
    data-theme="preferred_color_scheme"
    data-lang="zh-TW"
    data-loading="lazy"
    crossorigin="anonymous"
    async>
  </script>
</div>

<style>
  .comments-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #e5e7eb;
  }

  .comments-section h2 {
    margin-bottom: 1rem;
  }
</style>
```

**注意**:
- `YOUR_REPO_ID` 和 `YOUR_CATEGORY_ID` 需要在建立 GitHub 儲存庫後，訪問 giscus.app 取得
- `data-lang="zh-TW"` 設定為繁體中文介面

#### 9.3 深色模式支援（可選）

**檔案**: `src/layouts/BlogLayout.astro`

```html
<script>
  // 監聽主題變化，同步 Giscus 主題
  const giscusTheme = document.querySelector('iframe.giscus-frame');

  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const theme = isDark ? 'dark' : 'light';

    if (giscusTheme) {
      giscusTheme.contentWindow?.postMessage(
        { giscus: { setConfig: { theme } } },
        'https://giscus.app'
      );
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
</script>
```

**優勢**:
- 無需後端伺服器
- 資料儲存在 GitHub Discussions
- 支援 Markdown 留言
- GitHub 登入，減少垃圾留言
- 完全免費

#### 9.4 整合到文章詳情頁

在 `src/pages/blog/[slug].astro` 底部添加：

```astro
<Comments />
```

### 步驟 10: 設定 GitHub Actions 部署

#### 10.1 建立工作流程檔案

**檔案**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  # 當推送到 main 分支時觸發
  push:
    branches: [main]
  # 允許手動觸發
  workflow_dispatch:

# 設定 GITHUB_TOKEN 的權限
permissions:
  contents: read
  pages: write
  id-token: write

# 只允許一個並發部署
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**說明**:
- 使用 Node.js 22 (最新 LTS)
- `npm ci` 確保一致的相依性安裝
- 自動建置並上傳到 GitHub Pages

#### 10.2 設定 .gitignore

**檔案**: `.gitignore`

```
# 相依性
node_modules/

# 建置輸出
dist/
.astro/

# 環境變數
.env
.env.*
!.env.example

# IDE
.vscode/
.idea/

# macOS
.DS_Store

# Windows
Thumbs.db

# Pagefind
dist/pagefind/
```

### 步驟 11: 建立範例內容

建立 4 篇範例文章（每個分類 1 篇）：

#### 11.1 AWS 文章範例

**檔案**: `src/content/blog/aws/ec2-basics.md`

```markdown
---
title: 'AWS EC2 入門指南'
description: '詳細介紹 AWS EC2 實例的建立、設定和管理'
pubDate: 2026-01-31
author: 'Graylee'
category: 'AWS'
tags: ['AWS', 'EC2', 'Cloud', '運維']
image: '/images/posts/ec2-basics.webp'
draft: false
---

# AWS EC2 入門指南

EC2 (Elastic Compute Cloud) 是 AWS 提供的虛擬伺服器服務，讓您可以在雲端快速啟動和管理運算資源。

## 建立實例

1. 登入 AWS Console
2. 選擇 EC2 服務
3. 點擊 Launch Instance
4. 選擇 AMI (Amazon Machine Image)
5. 選擇實例類型 (如 t2.micro)
6. 設定網路和安全群組
7. 啟動實例

## 連線到實例

使用 SSH 連線到 EC2 實例：

\`\`\`bash
ssh -i "your-key.pem" ec2-user@your-instance-public-ip
\`\`\`

## 安全性最佳實踐

- 定期更新安全群組規則
- 使用 IAM 角色而非硬編碼憑證
- 啟用 CloudWatch 監控
- 定期備份重要資料

## 總結

EC2 是 AWS 的核心服務之一，掌握其使用方法對雲端運維至關重要。
```

#### 11.2 Web 開發文章範例

**檔案**: `src/content/blog/web-dev/astro-intro.md`

```markdown
---
title: 'Astro 框架入門：建立高效能網站'
description: '介紹 Astro 框架的核心概念和使用方式'
pubDate: 2026-01-31
author: 'Graylee'
category: 'Web 開發'
tags: ['Astro', 'JavaScript', '前端', 'SSG']
draft: false
---

# Astro 框架入門

Astro 是一個現代化的靜態網站生成器，專注於效能和開發體驗。

## 為什麼選擇 Astro？

1. **零 JavaScript 預設**: 預設不傳送 JavaScript 到客戶端
2. **島嶼架構**: 按需載入互動元件
3. **多框架支援**: 可以混用 React、Vue、Svelte 等
4. **內容優先**: 非常適合部落格和文件網站

## 快速開始

\`\`\`bash
npm create astro@latest
\`\`\`

選擇範本，安裝相依性，就可以開始開發了！

## 核心概念

### Content Collections

Astro 5.0 引入了新的 Content Layer API，讓內容管理更加靈活。

\`\`\`typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});
\`\`\`

## 總結

Astro 是建立高效能網站的絕佳選擇，特別適合內容導向的網站。
```

#### 11.3 Python 文章範例

**檔案**: `src/content/blog/python/python-tips.md`

```markdown
---
title: 'Python 實用技巧 10 則'
description: '提升 Python 程式碼品質的實用技巧'
pubDate: 2026-01-31
author: 'Graylee'
category: 'Python'
tags: ['Python', '程式設計', '最佳實踐']
draft: false
---

# Python 實用技巧 10 則

分享一些在日常開發中常用的 Python 技巧。

## 1. 列表推導式

\`\`\`python
# 傳統方式
squares = []
for i in range(10):
    squares.append(i ** 2)

# 列表推導式
squares = [i ** 2 for i in range(10)]
\`\`\`

## 2. 字典合併

\`\`\`python
# Python 3.9+
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
merged = dict1 | dict2
\`\`\`

## 3. f-strings 格式化

\`\`\`python
name = "Alice"
age = 30
message = f"{name} is {age} years old"
\`\`\`

## 總結

這些技巧能讓你的 Python 程式碼更簡潔、更易讀。
```

#### 11.4 工作記錄範例

**檔案**: `src/content/blog/work-logs/2026-01-project.md`

```markdown
---
title: '2026-01 專案開發記錄'
description: '記錄本月專案開發的重點和心得'
pubDate: 2026-01-31
author: 'Graylee'
category: '工作記錄'
tags: ['專案管理', '開發日誌']
draft: false
---

# 2026-01 專案開發記錄

## 本月重點工作

### 1. Astro 部落格開發

- 使用 Astro 5.0 建立個人技術部落格
- 整合 Pagefind 搜尋功能
- 整合 Giscus 留言系統
- 部署到 GitHub Pages

### 2. 技術學習

- 深入學習 Astro Content Collections
- 研究 Pagefind 搜尋引擎
- 了解 GitHub Actions 自動化部署

## 遇到的問題

### Pagefind 中文搜尋

**問題**: 預設設定下中文搜尋效果不佳

**解決方案**: 在建置命令加入 `--force-language zh`

\`\`\`json
"build": "astro build && pagefind --site dist --force-language zh"
\`\`\`

## 心得

使用 Astro 建立部落格的體驗非常好，建置速度快，部署簡單，推薦給大家。

## 下個月計畫

- 撰寫更多技術文章
- 優化網站效能
- 考慮加入 RSS feed
```

### 步驟 12: 本地測試

```bash
# 開發伺服器
npm run dev
# 訪問 http://localhost:4321

# 測試建置（包含 Pagefind）
npm run build
npm run preview
# 訪問 http://localhost:4321
```

**測試清單**:
- [ ] 首頁正常顯示
- [ ] 文章列表顯示所有文章
- [ ] 文章詳情頁 Markdown 渲染正確
- [ ] 分類和標籤過濾正常
- [ ] 搜尋功能可以找到文章（需要先 build）
- [ ] 目錄（TOC）正確生成
- [ ] 響應式設計在行動裝置正常

### 步驟 13: 部署到 GitHub Pages

#### 13.1 建立 GitHub 儲存庫

1. 訪問 GitHub，登入帳號
2. 建立新儲存庫
3. 儲存庫名稱: `Graylee0128.github.io` (User Pages)
4. 設為 **Public**（Giscus 留言系統需要）
5. 不要初始化 README、.gitignore 或 LICENSE（我們已有這些檔案）

#### 13.2 推送程式碼

```bash
# 在專案目錄下
git add .
git commit -m "Initial commit: Astro personal blog"
git remote add origin https://github.com/Graylee0128/Graylee0128.github.io.git
git push -u origin main
```

#### 13.3 設定 GitHub Pages

1. 訪問儲存庫 Settings → Pages
2. Source 選擇: **GitHub Actions**
3. 等待 Actions 完成部署（約 2-3 分鐘）
4. 部署完成後會顯示網站網址

#### 13.4 訪問網站

https://graylee0128.github.io

### 步驟 14: 設定 Giscus (部署後)

#### 14.1 啟用 Discussions

1. 訪問儲存庫 Settings → Features
2. 勾選 **Discussions**
3. 點擊 Discussions 標籤，確認已啟用

#### 14.2 取得 Giscus 設定參數

1. 訪問 https://giscus.app/
2. 輸入儲存庫名稱: `Graylee0128/Graylee0128.github.io`
3. 選擇 Discussion 分類: `Announcements`（或建立新分類）
4. 頁面對應: `pathname`
5. 語言: `繁體中文 (zh-TW)`
6. 複製生成的設定參數

#### 14.3 更新留言元件

**檔案**: `src/components/Comments.astro`

將 `YOUR_REPO_ID` 和 `YOUR_CATEGORY_ID` 替換為 Giscus 生成的實際值。

#### 14.4 提交並重新部署

```bash
git add src/components/Comments.astro
git commit -m "Update Giscus configuration"
git push
```

等待 GitHub Actions 完成部署，訪問網站測試留言功能。

### 步驟 15: SEO 優化（可選）

#### 15.1 新增 robots.txt

**檔案**: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://graylee0128.github.io/sitemap-index.xml
```

#### 15.2 設定 Sitemap

Astro 會自動生成 sitemap，只需在 `astro.config.mjs` 確認 `site` 設定正確。

#### 15.3 設定 Meta Tags

在 `src/layouts/BaseLayout.astro` 添加：

```astro
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={Astro.url} />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
</head>
```

#### 15.4 新增 RSS Feed（可選）

安裝 Astro RSS 套件：

```bash
npm install @astrojs/rss
```

建立 RSS feed：

**檔案**: `src/pages/rss.xml.js`

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Graylee 的技術部落格',
    description: '分享工作記錄和技術心得',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
  });
}
```

## 關鍵檔案清單

### 必須建立/修改的核心檔案

1. **`astro.config.mjs`** - Astro 設定
   - site、base、output 設定
   - Markdown 設定

2. **`src/content.config.ts`** - Content Collections 設定
   - 使用 Astro 5.0 新 API
   - 定義 blog schema

3. **`src/pages/blog/[slug].astro`** - 文章詳情頁
   - 動態路由
   - Markdown 渲染
   - 整合 TOC 和留言

4. **`src/pages/blog/index.astro`** - 文章列表
   - 取得所有文章
   - 排序和分頁

5. **`src/pages/categories/[category].astro`** - 分類頁
   - 依分類過濾

6. **`src/pages/tags/[tag].astro`** - 標籤頁
   - 依標籤過濾

7. **`src/components/Search.astro`** - 搜尋元件
   - Pagefind 整合

8. **`src/components/Comments.astro`** - 留言元件
   - Giscus 整合

9. **`.github/workflows/deploy.yml`** - 部署設定
   - GitHub Actions

10. **`package.json`** - 相依性和腳本
    - 包含 Pagefind 建置命令

## 驗證測試

### 本地測試（開發環境）

```bash
cd personal-blog
npm run dev
```

**驗證項目**:
1. 訪問 http://localhost:4321 查看首頁
2. 點擊文章連結，驗證詳情頁渲染
3. 測試分類和標籤過濾
4. 檢查響應式設計（調整瀏覽器視窗大小）
5. 驗證導覽列和頁尾顯示正常

### 建置測試（生產環境）

```bash
npm run build
npm run preview
```

**驗證項目**:
1. 搜尋功能是否正常（Pagefind 僅在建置後運作）
2. 檢查 `dist` 目錄是否包含 `pagefind` 資料夾
3. 驗證所有頁面靜態生成成功
4. 測試分頁功能
5. 檢查目錄（TOC）正確生成

### 部署後測試

1. 訪問 https://graylee0128.github.io
2. 測試所有功能在生產環境正常
3. 測試留言功能（需要 GitHub 登入）
4. 使用 Google Lighthouse 檢查效能分數
5. 測試行動裝置瀏覽體驗
6. 驗證搜尋結果正確性
7. 測試分享連結（Open Graph）

## 未來遷移到 Vercel（可選）

### 遷移準備

當前架構已考慮 Vercel 相容性：
- 使用 `output: 'static'` 靜態輸出
- 環境變數使用 `import.meta.env`
- 無伺服器端相依性

### 遷移步驟

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入
vercel login

# 部署
vercel --prod
```

**需要修改**:
1. 更新 `astro.config.mjs` 中的 `site` URL
2. 在 Vercel Dashboard 新增環境變數（如有）
3. 可選啟用 Vercel Image Optimization
4. 更新 Giscus 設定的網域（如需要）

**無需修改程式碼**，架構已支援無縫遷移。

### Vercel 部署優勢

- 更快的全球 CDN
- 自動 HTTPS
- 預覽部署（每個 PR 都有預覽網址）
- Edge Functions 支援
- 圖片自動最佳化

## 專案亮點

1. **最新技術**: Astro 5.0 Content Layer API，效能提升 5 倍
2. **完整功能**: 文章、分類、標籤、搜尋、留言
3. **高效能搜尋**: Pagefind (基於 Rust)，支援中文分詞
4. **零成本部署**: GitHub Pages 免費託管
5. **靈活遷移**: 可隨時遷移到 Vercel
6. **SEO 最佳化**: 靜態生成，搜尋引擎友善
7. **開發體驗**: TypeScript + Astro，型別安全
8. **現代化設計**: 響應式、無障礙、使用者友善

## 常見問題解決

### Q1: Pagefind 搜尋不到中文內容？

**解決方案**:
在 `package.json` 建置命令加入 `--force-language zh`

```json
"build": "astro build && pagefind --site dist --force-language zh"
```

### Q2: GitHub Actions 部署失敗？

**檢查清單**:
1. 確認 `astro.config.mjs` 中的 `site` 設定正確
2. 檢查 Node 版本是否 >= 18
3. 確認 `package-lock.json` 已提交
4. 查看 Actions 日誌中的錯誤訊息
5. 確認 GitHub Pages 設定為 GitHub Actions

### Q3: Giscus 留言不顯示？

**檢查清單**:
1. 儲存庫是否為 public
2. Discussions 是否已啟用
3. `data-repo` 和 `data-repo-id` 是否正確
4. 瀏覽器是否封鎖第三方 iframe
5. 檢查瀏覽器主控台是否有錯誤訊息

### Q4: 本地開發時搜尋不運作？

**說明**: Pagefind 僅在建置後生效，開發時無法使用。

**測試方法**:
```bash
npm run build
npm run preview
```

### Q5: 圖片沒有顯示？

**解決方案**:
確認圖片放在 `public/images/` 目錄，並使用絕對路徑：

```markdown
![描述](/images/posts/example.jpg)
```

### Q6: 樣式沒有套用？

**檢查**:
1. CSS 檔案是否正確匯入
2. 檢查瀏覽器開發者工具的 Network 標籤
3. 確認 `astro.config.mjs` 中的 `base` 設定正確

## 效能最佳化建議

### 1. 圖片最佳化

使用 Astro 內建的 Image 元件：

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero" width={800} height={600} />
```

**優勢**:
- 自動生成多種尺寸
- 懶載入
- 現代格式 (WebP, AVIF)

### 2. CSS 最佳化

- 使用 CSS Modules 或 Scoped Styles
- 避免全域樣式污染
- 考慮使用 Tailwind CSS（可選）

### 3. JavaScript 最小化

- 僅在必要時使用客戶端腳本
- 使用 Astro Islands 架構
- 懶載入非關鍵元件

### 4. 內容分頁

當文章數量超過 50 篇時，考慮實作分頁：

```astro
---
// src/pages/blog/[page].astro
export async function getStaticPaths({ paginate }) {
  const posts = await getCollection('blog');
  return paginate(posts, { pageSize: 10 });
}
---
```

## 未來擴充功能

### 短期 (1-3 個月)
- [ ] RSS Feed
- [ ] 網站地圖 (Sitemap)
- [ ] Google Analytics
- [ ] 文章閱讀時間估算
- [ ] 相關文章推薦
- [ ] 社群分享按鈕

### 中期 (3-6 個月)
- [ ] 多語言支援 (i18n)
- [ ] 文章系列功能
- [ ] 書籤/收藏功能
- [ ] Newsletter 訂閱
- [ ] 程式碼語法高亮主題切換
- [ ] 暗色模式切換

### 長期 (6-12 個月)
- [ ] 留言通知系統
- [ ] 訪問統計和熱門文章
- [ ] 全文 RSS
- [ ] PWA 支援
- [ ] 遷移到 Vercel（可選啟用 SSR）
- [ ] 整合 CMS（如 Strapi）

## 學習資源

### 官方文件
- [Astro 官方文件](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Pagefind 官方文件](https://pagefind.app/)
- [Giscus 官網](https://giscus.app/)
- [GitHub Pages 文件](https://docs.github.com/pages)

### 社群資源
- [Astro Discord](https://astro.build/chat)
- [Astro GitHub](https://github.com/withastro/astro)
- [Astro 範例](https://github.com/withastro/astro/tree/main/examples)

### 推薦閱讀
- [Astro 部落格教學](https://docs.astro.build/en/tutorial/0-introduction/)
- [Content Collections 完整指南](https://docs.astro.build/en/guides/content-collections/)
- [Markdown 語法指南](https://www.markdownguide.org/)

## 時間預估

- 專案初始化: 30 分鐘
- 核心頁面開發: 2-3 小時
- 元件開發: 2 小時
- 搜尋整合: 1 小時
- 留言整合: 1 小時
- 樣式和響應式: 2 小時
- 測試和除錯: 1 小時
- 部署設定: 30 分鐘

**總計**: 約 1 天完成基礎版本，後續可持續新增內容和最佳化。

## 成功指標

### 技術指標
- [ ] Lighthouse 效能分數 > 90
- [ ] 首次內容繪製 (FCP) < 1.5 秒
- [ ] 累積版面配置位移 (CLS) < 0.1
- [ ] 所有頁面成功生成
- [ ] 搜尋功能正常運作
- [ ] 留言系統正常運作

### 使用者體驗
- [ ] 行動裝置友善
- [ ] 導覽清晰
- [ ] 載入速度快
- [ ] 內容易讀
- [ ] 搜尋準確

## 總結

本計畫設計了一個現代化、高效能、易擴充的 Astro 個人部落格系統，具有以下特點：

### 核心優勢
1. **最新技術**: Astro 5.0 Content Layer API，效能提升 5 倍
2. **完整功能**: 文章、分類、標籤、搜尋、留言一應俱全
3. **使用者友善**: Pagefind 提供快速搜尋，Giscus 實現互動留言
4. **部署靈活**: GitHub Pages 起步，可無縫遷移 Vercel
5. **SEO 最佳化**: 靜態生成，搜尋引擎友善
6. **維護簡單**: Markdown 寫作，Git 管理，自動部署

### 實施建議
- **優先順序**: 先實現核心功能（文章、列表、詳情），再新增進階功能（搜尋、留言）
- **迭代開發**: 分階段實施，每個階段可獨立測試
- **內容為王**: 技術框架搭建後，專注於內容創作

依照本計畫的 15 個步驟逐步實施，預計 1 天內完成基礎版本，1 週內完成全功能版本。

---

**專案位置**: `c:\Users\李欣翰\Downloads\0131-github-mgr\personal-blog`

**部署網址**: https://graylee0128.github.io

**開始時間**: 2026-01-31

祝你建置順利！🚀
