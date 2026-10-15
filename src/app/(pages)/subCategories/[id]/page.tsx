import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { getOneCategory } from "@/services/getCategory.service";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SubCategory from "../../../_SharedComponent/subCategory/subCategory"

export default async function subCategories({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await getOneCategory(id);
    const category = response.data
    return (
        <div className="min-h-screen bg-gray-50">
            <PagesTitle image={category?.image} title={category.name} subTitle={'Choose a subcategory to browse products'} sectionName={category.name} />
            <div className="mx-auto container px-4 py-10">
                <Link href={"/Categories"} className="mb-6 text-gray-600 hover:text-green-600 flex items-center gap-2"><FaArrowLeft />
                    Back To Categories</Link>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 sm:gap-6">
                    <SubCategory categoryId={id} />
                </div>
            </div>
        </div>
    )
}
