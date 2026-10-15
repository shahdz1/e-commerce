import { FaStar, FaRegStar,  FaRegEye } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";
import { IProduct } from "@/interface/product.interface";
import Link from "next/link";
import AddBtn from "../Btns/AddBtnCart/addBtn";
import AddBtnWishList from "../Btns/AddBtnWishList/AddBtnWishList";

export default function Card({ product }: { product: IProduct }) {
    return (
        <div >
            <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow transition-shadow duration-500 hover:-translate-y-1.5 hover:shadow-lg">
                <div className="relative h-60 shrink-0">
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={500}
                        height={240}
                        className="h-full w-full object-contain"
                    />
                    <div className="absolute right-3 top-3 flex flex-col">
                 <AddBtnWishList product={product}/>
                        <button className="flex h-8 w-8 mb-2 items-center justify-center rounded-full bg-white cursor-pointer text-gray-600 shadow-sm hover:text-amber-400 ease-in-out duration-150">
                            <TfiReload />
                        </button>
                        <Link href={`/product/${product.id}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white cursor-pointer text-gray-600 shadow-sm hover:text-green-600 ease-in-out duration-150">
                            <FaRegEye />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <p className="mb-1 h-5 truncate text-12px font-medium text-gray-500">{product.category.name}</p>
                    <h3 className="mb-1 h-18 line-clamp-3 font-medium">{product.title}</h3>
                    <div className="mb-2 flex min-h-5 items-center gap-2">
                        <div className="flex text-amber-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                        </div>
                        <span className="inline-block text-12px text-gray-500 font-medium">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">{product.price} EGP</span>
                        <AddBtn product={product} />
                    </div>
                </div>
            </article></div>

    )
}
