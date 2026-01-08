export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
};

// 模拟数据库里的商品数据
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Next.js 高级课程",
    price: 199,
    description: "手把手带你掌握 Next.js SSR、SSG、ISR 以及生产环境最佳实践。"
  },
  {
    id: "2",
    name: "React 性能优化指南",
    price: 149,
    description: "从渲染机制到性能调优，系统讲解如何让你的 React 应用飞起来。"
  },
  {
    id: "3",
    name: "前端工程化实战",
    price: 249,
    description: "涵盖 Monorepo、自动化部署、质量保障等现代前端工程化方案。"
  }
];

// ---- 模拟“数据库访问层”（真实项目里可以换成 ORM / 调后端服务）----

export async function getAllProducts(): Promise<Product[]> {
  // 这里模拟后端请求的延迟
  await new Promise((resolve) => setTimeout(resolve, 200));
  return PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const product = PRODUCTS.find((p) => p.id === id);
  return product ?? null;
}

// ---- 提供给页面使用的"通过 API 获取数据"的封装（SSR 调接口示例）----

const getBaseUrl = () => {
  // 优先使用用户自定义的环境变量
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  
  // 在 Vercel 环境中，使用 VERCEL_URL（Vercel 自动提供）
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    // VERCEL_URL 不包含协议，需要加上 https://
    return `https://${vercelUrl}`;
  }
  
  // 本地开发时兜底为 localhost
  return "http://localhost:3000";
};

/**
 * 获取商品列表
 * - 在服务器端（Server Component）：直接调用 getAllProducts()，避免 HTTP 请求
 * - 在客户端（Client Component）：通过 HTTP 请求调用 API
 */
export async function fetchProducts(): Promise<Product[]> {
  // 在服务器端运行时，直接调用函数，避免 HTTP 请求
  // 这样可以避免在 Vercel 等 Serverless 环境中的网络问题
  if (typeof window === "undefined") {
    return getAllProducts();
  }

  // 在客户端运行时，通过 HTTP 请求
  const res = await fetch("/api/products", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`获取商品列表失败（status: ${res.status}）`);
  }

  return res.json();
}

/**
 * 获取商品详情
 * - 在服务器端（Server Component）：直接调用 getProductById()，避免 HTTP 请求
 * - 在客户端（Client Component）：通过 HTTP 请求调用 API
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  // 在服务器端运行时，直接调用函数，避免 HTTP 请求
  if (typeof window === "undefined") {
    return getProductById(id);
  }

  // 在客户端运行时，通过 HTTP 请求
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store"
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`获取商品详情失败（status: ${res.status}）`);
  }

  return res.json();
}

