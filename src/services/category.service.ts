import type { categoryResponse } from "@/interface/response.type";

export async function getCategories(): Promise<categoryResponse> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch categories`,
    );
  }

  return response.json();
}
