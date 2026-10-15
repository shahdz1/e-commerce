import { getMyToken } from "@/Utilities/getMyToken";

export async function deleteProductsCart(productId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token as string,
      },
    },
  );
  const payload = await response.json();
  return payload;
}
