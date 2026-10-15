"use client"
import { IProduct } from "@/interface/product.interface";
import { addProductWishlist } from "@/services/wishListActions/addToWishList.action";
import { FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AddBtnDetailsWishList({ product, price }: { product: IProduct; price: number }) {


    async function addToCart() {
        try {
            const response = await addProductWishlist(product.id)
            await Swal.fire({ title: "Added to cart", icon: "success", timer: 1200, showConfirmButton: false })
        } catch (error) {
            await Swal.fire({
                title: "Unable to add this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
    }

    return (
        <button onClick={() => { addToCart() }} className="flex flex-1 text-gray-700 items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium shadow shadow-gray-300 hover:-translate-y-1.5 duration-300 ease-in-out">
            <FaRegHeart />
            Add to Wishlist
        </button>
    )
}
