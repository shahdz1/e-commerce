"use client"
import { IProduct } from "@/interface/product.interface";
import { addProductsCart } from "@/services/cartActions/addProductsCart.action";
import { FaShoppingCart } from "react-icons/fa";
import { addGuestProduct } from "@/Utilities/guestCart";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AddBtnDetails({ product, price }: { product: IProduct; price: number }) {
    const { status } = useSession()

    async function addToCart() {
        try {
            if (status === "authenticated") {
                await addProductsCart(product._id)
            } else if (status === "unauthenticated") {
                addGuestProduct(product, price)
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
        <button disabled={status === "loading"} onClick={addToCart} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-medium text-white shadow shadow-green-300 hover:-translate-y-1.5 duration-300 ease-in-out disabled:opacity-60">
            <FaShoppingCart size={18} />
            Add to Cart
        </button>
    )
}
