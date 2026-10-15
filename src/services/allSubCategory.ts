export async function getSubCategories(){
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/subcategories",
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch subcategories`,
    );
  }

  return response.json();
}
