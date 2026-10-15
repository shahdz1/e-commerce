export async function getAllBrands(){
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch brands`,
    );
  }

  return response.json();
}
