"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useEffect, useState } from "react";

export default function ClientProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error(`请求失败（status: ${res.status}）`);
        }
        const data: Product[] = await res.json();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "未知错误");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>
        商品列表（CSR：Client Component）
      </h2>
      <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "16px" }}>
        这个页面是纯客户端渲染：HTML 首屏几乎没有商品内容，加载完成后在浏览器中调用
        <code style={{ padding: "2px 4px" }}>/api/products</code> 获取数据并渲染。
      </p>

      <p style={{ fontSize: "13px", color: "#93c5fd", marginBottom: "20px" }}>
        你可以打开浏览器 DevTools 的 Network 面板，对比本页和首页
        <code style={{ padding: "2px 4px" }}>/</code>
        的请求时机差异：前者在浏览器发起 API 请求，后者在服务器渲染时就已经拿到数据。
      </p>

      {loading && (
        <p style={{ fontSize: "14px", color: "#e5e7eb", marginBottom: "12px" }}>
          正在从浏览器请求商品列表...
        </p>
      )}

      {error && (
        <p
          style={{
            fontSize: "14px",
            color: "#fecaca",
            marginBottom: "12px"
          }}
        >
          加载失败：{error}
        </p>
      )}

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
              点击查看详情（详情页仍然是 SSR）
            </p>
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: "24px",
          fontSize: "13px",
          color: "#9ca3af"
        }}
      >
        <Link
          href="/"
          style={{ color: "#93c5fd", textDecoration: "none", marginRight: 12 }}
        >
          ← 返回 SSR 商品列表
        </Link>
      </div>
    </section>
  );
}


