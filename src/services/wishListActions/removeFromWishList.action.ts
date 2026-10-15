import { getMyToken } from "@/Utilities/getMyToken";

export async function deleteProductsWishlist(productId: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
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
