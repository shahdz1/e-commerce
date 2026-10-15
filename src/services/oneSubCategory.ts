
export async function getOneSubCategory(subCategoryId:string){
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch subcategory`,
    );
  }

  return response.json();
}