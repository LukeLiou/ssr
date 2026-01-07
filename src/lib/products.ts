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

// ---- 提供给页面使用的“通过 API 获取数据”的封装（SSR 调接口示例）----

const getBaseUrl = () => {
  // 在生产环境推荐设置 NEXT_PUBLIC_BASE_URL 指向你的站点域名
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // 本地开发时兜底为 localhost
  return "http://localhost:3000";
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${getBaseUrl()}/api/products`, {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`获取商品列表失败（status: ${res.status}）`);
  }

  return res.json();
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const res = await fetch(`${getBaseUrl()}/api/products/${id}`, {
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

