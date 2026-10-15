export async function getSubInCategory(categoryId:string){
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch subcategories: ${response.status} ${response.statusText}`);
  }

  return response.json();
}