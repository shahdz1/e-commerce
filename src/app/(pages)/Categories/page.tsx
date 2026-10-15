import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { Category } from "@/interface/cartList.interface";
import { getCategories } from "@/services/category.service";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function Categories() {
  const response = await getCategories();
  const categories = response?.data
  return (
    <div className="min-h-screen bg-gray-50">
      <PagesTitle title={"All Categories"} subTitle={'Browse our wide range of product categories'} sectionName={"categories"} />
      <div className="mx-auto container px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category: Category) => (
            <Link href={`/subCategories/${category._id}`} key={category._id} className="rounded-2xl group text-gray-900 hover:text-green-400 hover:border-green-200 hover:shadow-md hover:-translate-y-1.5 border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 sm:p-6">
              <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover duration-500 hover:scale-110" />
              </div>
              <h3 className="text-center font-bold duration-300">{category.name}</h3>
              <span className="mt-2 flex justify-center duration-300">
                <span className="flex items-center gap-1 text-xs text-green-600 group-hover:opacity-100 opacity-0">View Subcategories <FaArrowRight /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
