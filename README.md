## Next SSR Shop 示例

一个使用 **Next.js（App Router）** 实现的简单 **商品列表 + 商品详情 SSR** 示例，方便理解 SSR 在业务中的典型用法。

### 功能说明

- **商品列表页 `/`**
  - 使用服务端渲染（Server Component），在服务器上获取商品数据并生成 HTML。
  - 首屏 HTML 就包含完整的商品列表内容，有利于首屏体验和 SEO。
  - SSR 渲染时会在服务器上调用 `GET /api/products` 获取数据。

- **商品列表页（CSR 示例） `/client`**
  - 使用 Client Component，在浏览器中通过 `fetch("/api/products")` 获取数据再渲染。
  - 首屏 HTML 基本没有商品内容，数据会在前端 JS 加载完成后出现。
  - 方便你对比 SSR 和 CSR 在「首屏 HTML 内容」「请求时机」上的差异。

- **商品详情页 `/products/[id]`**
  - 同样是服务端渲染，根据 URL 中的 `id` 查询商品信息。
  - 数据不存在时返回“商品不存在”的页面。
  - 通过 `generateMetadata` 根据商品动态设置页面 `<title>` 和描述。

数据源为 `src/lib/products.ts` 中的模拟“数据库”，并通过内置 API Route 暴露出来：

- `GET /api/products` → `src/app/api/products/route.ts`
- `GET /api/products/[id]` → `src/app/api/products/[id]/route.ts`

页面（例如 `src/app/page.tsx`、`src/app/products/[id]/page.tsx`）在 **服务端渲染时会先调用这些 API** 再生成 HTML，从而演示了「SSR 调接口」的完整链路。

### 本地运行

1. 安装依赖（建议使用 Node.js 18+）：

   ```bash
   cd /Users/lukeliou/my-doc/github/ssr
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm run dev
   ```

3. 在浏览器中访问：

- SSR 商品列表页：`http://localhost:3000/`
- CSR 商品列表页示例：`http://localhost:3000/client`
- 商品详情页（SSR）：`http://localhost:3000/products/1`、`/products/2`、`/products/3`

### 部署到线上

#### 方法一：部署到 Vercel（推荐）

- **准备工作**
  - 把本项目推到一个 Git 仓库（GitHub / GitLab / Bitbucket 均可）。
  - 确保使用 Node.js 18+（Vercel 默认支持）。

- **在 Vercel 控制台操作**
  1. 访问 Vercel 官网，登录你的账号。
  2. 点击「New Project」，选择你刚刚推送的仓库。
  3. Vercel 会自动识别为 Next.js（App Router），一般保持默认：
     - Build Command: `next build`
     - Install Command: `npm install`
     - Output Directory: `.next`
  4. 如果有自定义域名，在「Domains」里绑定即可。
  5. 点击「Deploy」，等待构建和部署完成，几分钟内就可以访问。

- **环境变量设置**
  - 如果你希望在 SSR 中调用自己的正式域名，可以在 Vercel 项目的「Environment Variables」里设置：

    ```bash
    NEXT_PUBLIC_BASE_URL=https://your-domain.com
    ```

  - 不设置的话，代码里会自动使用 Vercel 提供的部署域名。

#### 方法二：自己部署 Node 服务器

1. 在服务器上拉取代码并安装依赖：

   ```bash
   cd /Users/lukeliou/my-doc/github/ssr
   npm install
   ```

2. 构建生产版本：

   ```bash
   npm run build
   ```

3. 启动生产服务（默认端口 3000）：

   ```bash
   npm start
   ```

4. 使用 Nginx / Caddy 等反向代理，把你的域名转发到 `http://127.0.0.1:3000` 即可对外提供服务。

5. 如需设置 `BASE_URL`，可以在启动前导出环境变量（以 Linux 为例）：

   ```bash
   export NEXT_PUBLIC_BASE_URL=https://your-domain.com
   npm start
   ```

### 可以怎么继续扩展

- 把模拟数据替换为真实后端接口（例如 REST / GraphQL）。
- 为价格、搜索等增加交互功能（使用 Client Components）。
- 加入缓存策略（如 Route Handlers + fetch 缓存、或者使用 SSG/ISR 混合）。

### 关于 BASE_URL

为了在 SSR 时调用自己的 API，本项目在 `src/lib/products.ts` 里约定了一个 `getBaseUrl()`：

- 本地开发：默认使用 `http://localhost:3000`
- 生产部署（可选）：建议在环境变量里设置 `NEXT_PUBLIC_BASE_URL` 为你的站点域名，例如：

  ```bash
  NEXT_PUBLIC_BASE_URL=https://your-domain.com
  ```



