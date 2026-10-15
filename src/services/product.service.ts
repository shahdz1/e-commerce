
import type { productResponse } from "@/interface/response.type";

export async function getProducts(): Promise<productResponse> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
