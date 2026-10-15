import { getMyToken } from "@/Utilities/getMyToken";

export async function updateProductsCart(productId: string, count: number) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        count: count,
      }),
    },
  );
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail") {
    throw new Error(payload.message || "Unable to update the product in your cart.");
  }

  return payload;
}
