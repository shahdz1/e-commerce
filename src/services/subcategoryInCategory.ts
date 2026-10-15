export async function getSubInCategory(categoryId:string){
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch category`,
    );
  }

  return response.json();
}