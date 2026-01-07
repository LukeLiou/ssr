import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";

// GET /api/products
export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}


