export async function getOneBrand(brandId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch brand`);
  }

  return response.json();
}
