import Link from "next/link";
import { fetchProducts } from "@/lib/products";

// 这个页面是一个 Server Component，默认就是 SSR：
// - 每次请求时在服务器上执行 fetchProducts
// - 把渲染好的 HTML 返回给浏览器
export default async function ProductListPage() {
  const products = await fetchProducts();

  return (
    <section>
      <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>商品列表（SSR）</h2>
      <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "24px" }}>
        当前页面使用服务端渲染（Server-Side Rendering）：数据在服务器上获取，生成好的 HTML
        直接返回浏览器，有利于首屏和 SEO。
      </p>
      <p style={{ fontSize: "13px", color: "#93c5fd", marginBottom: "20px" }}>
        你也可以访问{" "}
        <Link
          href="/client"
          style={{ color: "#bfdbfe", textDecoration: "underline" }}
        >
          /client
        </Link>{" "}
        查看一个纯客户端渲染（CSR）的商品列表页面，对比两种数据获取方式。
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            style={{
              display: "block",
              padding: "16px",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(30,64,175,0.8), rgba(8,47,73,0.9))",
              border: "1px solid rgba(148,163,184,0.3)"
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>
              {product.name}
            </h3>
            <p
              style={{
                margin: "0 0 12px",
                fontSize: "13px",
                color: "#e5e7eb"
              }}
            >
              {product.description}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                fontWeight: 600,
                color: "#facc15"
              }}
            >
              ￥{product.price}
            </p>
            <p
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#bfdbfe"
              }}
            >
              点击查看详情（同样 SSR）
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}


