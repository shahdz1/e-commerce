
export async function getOneCategory(categoryId:string){
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch category`,
    );
  }

  return response.json();
}