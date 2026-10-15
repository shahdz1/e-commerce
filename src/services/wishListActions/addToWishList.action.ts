import { getMyToken } from "@/Utilities/getMyToken";

export async function addProductWishlist(productId: string) {
  if (!productId) {
    throw new Error(
      "A valid product ID is required to add a product to the wishlist.",
    );
  }

  const token = await getMyToken();
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      headers: {
        token: token as string,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    },
  );
  const payload = await response.json();

  if (!response.ok || payload.statusMsg === "fail") {
    throw new Error(
      payload.message || "Unable to add the product to the wishlist.",
    );
  }

  return payload;
}
