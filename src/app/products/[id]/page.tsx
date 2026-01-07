import Link from "next/link";
import { fetchProductById } from "@/lib/products";
import type { Metadata } from "next";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata(
  props: ProductDetailPageProps
): Promise<Metadata> {
  const product = await fetchProductById(props.params.id);
  if (!product) {
    return {
      title: "商品未找到 - Next SSR Shop"
    };
  }

  return {
    title: `${product.name} - Next SSR Shop`,
    description: product.description
  };
}

// 默认也是服务端渲染：
// - 每次访问 /products/[id] 时，Next.js 会在服务器上调用这个异步组件
// - 数据查不到时返回 404
export default async function ProductDetailPage({
  params
}: ProductDetailPageProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return (
      <section>
        <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>商品不存在</h2>
        <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "16px" }}>
          你访问的商品 ID 为 {params.id}，在我们的“数据库”中没有找到。
        </p>
        <Link
          href="/"
          style={{ fontSize: "14px", color: "#93c5fd", textDecoration: "none" }}
        >
          返回商品列表
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "13px",
          color: "#93c5fd",
          marginBottom: "16px"
        }}
      >
        ← 返回商品列表
      </Link>

      <div
        style={{
          padding: "20px",
          borderRadius: "16px",
          background:
            "radial-gradient(circle at top left, rgba(59,130,246,0.6), rgba(15,23,42,1))",
          border: "1px solid rgba(148,163,184,0.4)"
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: "22px" }}>{product.name}</h2>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: "14px",
            color: "#e5e7eb",
            maxWidth: "560px",
            lineHeight: 1.6
          }}
        >
          {product.description}
        </p>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#fbbf24"
          }}
        >
          ￥{product.price}
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#9ca3af",
            padding: "8px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.6)",
            backgroundColor: "rgba(15,23,42,0.8)"
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "999px",
              backgroundColor: "#22c55e"
            }}
          />
          <span>当前详情页同样由服务器渲染，首屏 HTML 就包含完整商品信息。</span>
        </div>
      </div>
    </section>
  );
}


