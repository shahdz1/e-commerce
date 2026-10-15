import Card from "@/app/_SharedComponent/Card/Card";
import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { IProduct } from "@/interface/product.interface";
import { getProducts } from "@/services/product.service";
import Link from "next/link";
import { FaFilter, FaFolderOpen, FaBoxOpen } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { getOneBrand } from "@/services/getOneBrand.service";

export default async function oneBrand({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [brandResponse, productsResponse] = await Promise.all([
        getOneBrand(id),
        getProducts(),
    ])
    const brand = brandResponse.data
    const products = productsResponse.data.filter((product: IProduct) =>
        product.brand._id === id
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <PagesTitle title={brand?.name ?? ""} subTitle={brand?.slug ?? ""} sectionName={brand?.name ?? ""} image={brand?.image}/>
            <div className="mx-auto container px-4 py-10">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FaFilter />
                        Active Filters:
                    </span>
                    <Link href={"/Brands"} className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 duration-150"><FaFolderOpen />
                        {brand?.name}
                        <IoIosClose size={20} />
                    </Link>
                    <Link href={"/Brands"} className="underline text-gray-500 text-sm font-medium">Clear All</Link>
                </div>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product: IProduct) => (
                            <Card key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex px-4 justify-center items-center">
                        <div className="max-w-md text-center">
                            <div className="bg-gray-100 rounded-full flex items-center justify-center w-22 h-22 mx-auto text-gray-400 mb-5"><FaBoxOpen size={40} /></div>
                            <h2 className="text-gray-900 font-bold text-xl mb-3">No Products Found</h2>
                            <p className="mb-8 text-gray-500 font-medium">No products match your current filters.</p>
                            <Link className="items-center inline-flex gap-2 bg-green-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg duration-150 hover:bg-green-800" href="/Brands">View All Brands
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
