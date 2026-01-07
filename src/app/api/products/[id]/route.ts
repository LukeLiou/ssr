import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

type Context = {
  params: {
    id: string;
  };
};

// GET /api/products/[id]
export async function GET(_request: Request, context: Context) {
  const product = await getProductById(context.params.id);

  if (!product) {
    return NextResponse.json(
      { message: "商品不存在" },
      {
        status: 404
      }
    );
  }

  return NextResponse.json(product);
}


