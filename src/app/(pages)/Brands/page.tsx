import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { Brand } from "@/interface/cartList.interface";
import { getAllBrands } from "@/services/allBrands.service";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
export default async function Brands() {
  const response = await getAllBrands();
  const brands = response.data;
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <PagesTitle title="Top Brands" subTitle="Shop from your favorite brands" sectionName="Brands" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-6">
          {brands.map((brand: Brand) => (
            <Link href={`/getBrand/${brand._id}`} key={brand._id} className="rounded-2xl group text-gray-900 hover:text-green-400 hover:border-green-200 hover:shadow-md hover:-translate-y-1.5 border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 sm:p-6">
              <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                <img src={brand.image} alt={brand.name} className="h-full w-full object-contain duration-500 hover:scale-110" />
              </div>
              <h3 className="text-center font-bold duration-300">{brand.name}</h3>
              <span className="mt-2 flex justify-center duration-300">
                <span className="flex items-center gap-1 text-xs text-green-600 group-hover:opacity-100 opacity-0">View Products <FaArrowRight /></span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
