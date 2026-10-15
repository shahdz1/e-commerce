import { Category } from "@/interface/cartList.interface";
import { getSubInCategory } from "@/services/subcategoryInCategory";
import Link from "next/link";
import { FaArrowRight, FaFolderOpen } from "react-icons/fa";

export default async function subCategory({ categoryId }: { categoryId: string }) {
    const response = await getSubInCategory(categoryId);
    const categories = response.data
    return (
        <>
            {categories.map((category: Category) => (
                <Link key={category._id} href={`/oneSubCategories/${category._id}`} className="group rounded-2xl text-gray-900 border border-gray-100 bg-white p-6 shadow-sm duration-300 hover:border-green-200 hover:text-green-600 hover:-translate-y-1.5 hover:shadow-lg">
                    <div className="mb-4 flex items-center text-green-600 justify-center group-hover:bg-green-100 h-14 w-14 rounded-xl bg-green-50">
                        <FaFolderOpen size={30} />
                    </div>
                    <h3 className="mb-2 font-bold  duration-300 text-lg">{category.name}</h3>
                    <span className="mt-2 flex duration-300">
                        <span className="flex items-center gap-1 text-sm font-medium text-green-600 group-hover:opacity-100 opacity-0">Browse Products <FaArrowRight /></span>
                    </span>
                </Link>
            ))}
        </>
    );
}
