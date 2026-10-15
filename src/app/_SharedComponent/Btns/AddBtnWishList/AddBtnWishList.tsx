"use client"
import { IProduct } from "@/interface/product.interface";
import { addProductWishlist } from "@/services/wishListActions/addToWishList.action";
import { addGuestWishlistProduct } from "@/Utilities/guestWishlist";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { FaRegHeart } from "react-icons/fa";


export default function AddBtnWishList({ product }: { product: IProduct }) {
    const { status } = useSession()

    async function addToCart() {
        try {
            if (status === "authenticated") {
                await addProductWishlist(product._id)
            } else if (status === "unauthenticated") {
                addGuestWishlistProduct(product)
            } else {
                return
            }
            await Swal.fire({ title: "Added to wishlist", icon: "success", timer: 1200, showConfirmButton: false })
        } catch (error) {
            await Swal.fire({
                title: "Unable to add this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
    }

    return (
        <button type="button" onClick={addToCart} disabled={status === "loading"} className="flex h-8 w-8 mb-2 items-center justify-center rounded-full bg-white cursor-pointer text-gray-600 shadow-sm hover:text-red-700 ease-in-out duration-150 disabled:cursor-not-allowed">
            <FaRegHeart />
        </button>
    )
}
