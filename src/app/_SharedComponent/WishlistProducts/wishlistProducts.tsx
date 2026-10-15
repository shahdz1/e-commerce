"use client"

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { FaCheck, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa"
import Link from "next/link"
import { IProduct } from "@/interface/product.interface"
import { getWishListProducts } from "@/services/wishListActions/getWishList.action"
import { deleteProductsWishlist } from "@/services/wishListActions/removeFromWishList.action"
import { getProductsCart } from "@/services/cartActions/getProductsCart.action"
import { addProductsCart } from "@/services/cartActions/addProductsCart.action"
import { addGuestProduct, getGuestCart } from "@/Utilities/guestCart"
import { getGuestWishlist, removeGuestWishlistProduct } from "@/Utilities/guestWishlist"
import { useSession } from "next-auth/react"

export default function wishlistProducts() {
    const [wishlist, setList] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [cartProductIds, setCartProductIds] = useState<string[]>([])
    const { status } = useSession()

    async function getWishlistProducts() {
        try {
            if (status === "authenticated") {
                const response = await getWishListProducts()
                setList(Array.isArray(response.data) ? response.data : [])
            } else {
                setList(getGuestWishlist())
            }

            const cart = status === "authenticated"
                ? await getProductsCart()
                : getGuestCart()
            setCartProductIds(cart.map((item) => item.product._id))
        }
        catch {
            await Swal.fire({
                title: "Unable to load your wishlist",
                text: "Please try again later.",
                icon: "error"
            })
        }
        setIsLoading(false)
    }

    async function removeProduct(productId: string) {
        try {
            if (status === "authenticated") {
                const response = await deleteProductsWishlist(productId)
                if (response.status !== "success") {
                    throw new Error(response.message || "Unable to remove this product.")
                }
                setList((products) => products.filter((product) => product._id !== productId))
            } else {
                setList(removeGuestWishlistProduct(productId))
            }
        }
        catch (error) {
            await Swal.fire({
                title: "Unable to remove this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
    }

    async function addToCart(product: IProduct) {
        try {
            if (status === "authenticated") {
                await addProductsCart(product._id)
            } else if (status === "unauthenticated") {
                addGuestProduct(product)
            } else {
                return
            }

            setCartProductIds((ids) => ids.includes(product._id) ? ids : [...ids, product._id])
            await Swal.fire({
                title: "Added to cart",
                icon: "success",
                timer: 1200,
                showConfirmButton: false
            })
        } catch (error) {
            await Swal.fire({
                title: "Unable to add this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
    }

    useEffect(() => {
        if (status !== "loading") getWishlistProducts()
    }, [status])

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {isLoading ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                        Loading your wishlist...
                    </div>
                ) : (
                    <>
                        <div className="mb-10">
                            <nav className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500">
                                <Link href="/" className="hover:text-green-600">Home</Link>
                                <span>/</span>
                                <span className="text-gray-900">Wishlist</span>
                            </nav>
                            <div>
                                <h1 className="flex items-center gap-5 text-3xl font-bold text-gray-900">
                                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl text-red-500">
                                        <FaHeart />
                                    </span>
                                    My Wishlist
                                </h1>
                                <p className="mt-2 text-gray-500">
                                    <span className="font-semibold text-green-600">{wishlist.length} item{wishlist.length === 1 ? "" : "s"} saved</span>
                                </p>
                            </div>
                        </div>

                        {wishlist.length > 0 ? (
                            <>
                                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                                    <div className="hidden grid-cols-4 gap-6 border-b border-gray-100 bg-gray-50 px-8 py-5 text-gray-500 md:grid">
                                        <span className="col-span-1">Product</span>
                                        <span className="text-center">Price</span>
                                        <span className="text-center">Status</span>
                                        <span className="text-center">Actions</span>
                                    </div>

                                    {wishlist.map((product) => (
                                        <div key={product._id} className="grid grid-cols-1 items-center gap-5 border-b border-gray-100 px-5 py-6 last:border-b-0 md:grid-cols-4 md:gap-6 md:px-8">
                                            <div className="flex min-w-0 items-center gap-5">
                                                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-3">
                                                    <img src={product.imageCover} alt={product.title} className="h-full w-full object-contain" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h2 className="truncate text-lg font-medium text-gray-900">{product.title}</h2>
                                                    <p className="mt-1 truncate text-gray-400">{product.category?.name}</p>
                                                </div>
                                            </div>

                                            <div className="md:text-center">
                                                <p className="text-lg font-bold text-gray-900">
                                                    {product.priceAfterDiscount && product.priceAfterDiscount < product.price
                                                        ? product.priceAfterDiscount
                                                        : product.price} EGP
                                                </p>
                                                {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                                                    <p className="text-sm text-gray-400 line-through">{product.price} EGP</p>
                                                )}
                                            </div>

                                            <div className="md:text-center">
                                                <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${product.quantity > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                                    <span className={`h-2 w-2 rounded-full ${product.quantity > 0 ? "bg-green-500" : "bg-red-500"}`} />
                                                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3 md:justify-center">
                                                {cartProductIds.includes(product._id) ? (
                                                    <Link
                                                        href="/cart"
                                                        className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-gray-700 duration-150 hover:bg-gray-200"
                                                    >
                                                        <FaCheck className="text-green-600" />
                                                        View Cart
                                                    </Link>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        disabled={product.quantity <= 0 || status === "loading"}
                                                        onClick={() => addToCart(product)}
                                                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white duration-150 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                                                    >
                                                        <FaShoppingCart />
                                                        Add to Cart
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(product._id)}
                                                    aria-label={`Remove ${product.title} from wishlist`}
                                                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-gray-400 duration-150 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/" className="mt-10 inline-flex items-center gap-2 text-gray-500 duration-150 hover:text-green-600">
                                     Continue Shopping
                                </Link>
                            </>
                        ) : (
                            <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                                Your wishlist is empty.
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
