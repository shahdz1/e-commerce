"use client"
import { IProduct } from "@/interface/product.interface";
import { FaPlus } from "react-icons/fa6";
import { addProductsCart } from "@/services/cartActions/addProductsCart.action";
import { addGuestProduct } from "@/Utilities/guestCart";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AddBtn({ product }: { product: IProduct }) {
    const { status } = useSession()

    async function addToCart() {
        try {
            if (status === "authenticated") {
                await addProductsCart(product._id)
            } else if (status === "unauthenticated") {
                addGuestProduct(product)
            } else {
                return
            }
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
        <button
            type="button"
            onClick={addToCart}
            disabled={status === "loading"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-800 duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
            <FaPlus />
        </button>
    )
}
