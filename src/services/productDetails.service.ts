
export default async function getDetails(productId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
