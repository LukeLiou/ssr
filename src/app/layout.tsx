import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Next SSR Shop",
  description: "商品列表 + 商品详情 SSR 示例"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body
        style={{
          margin: 0,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
          backgroundColor: "#0f172a",
          color: "#e5e7eb"
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "24px 16px 48px"
          }}
        >
          <header
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "24px"
            }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: 700 }}>Next SSR Shop</h1>
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>
              商品列表 & 详情 · 服务端渲染示例
            </span>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}


