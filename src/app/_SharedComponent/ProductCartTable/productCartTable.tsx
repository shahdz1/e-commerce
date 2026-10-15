"use client"

import { CartProduct } from "@/interface/cartList.interface"
import { getCartData } from "@/services/cartActions/getProductsCart.action"
import { clearCart } from "@/services/cartActions/clearCart.action"
import { Link } from "@heroui/react"
import { useEffect, useState } from "react"
import { FaLock, FaShieldAlt, FaShoppingBag, FaShoppingCart, FaTag, FaTruck } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Swal from 'sweetalert2'
import { deleteProductsCart } from "@/services/cartActions/deleteProductsCart.action"
import { FaBoxOpen } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { updateProductsCart } from "@/services/cartActions/updateProductCart.action"
import { clearGuestCart, getGuestCart, removeGuestProduct, updateGuestProduct } from "@/Utilities/guestCart"
import { useSession } from "next-auth/react"


export default function productCartTable() {

    const [cartList, setList] = useState<CartProduct[]>([])
    const [cartId, setCartId] = useState<string>()
    const [isLoading, setIsLoading] = useState(true)
    const [removingProductId, setRemovingProductId] = useState<string | null>(null)
    const { status } = useSession()

    async function getCartProducts() {
        try {
            if (status === "unauthenticated") {
                setList(getGuestCart())
            } else {
                const cart = await getCartData()
                setCartId(cart.cartId)
                setList(cart.products)
            }
        }
        catch (error) {
            await Swal.fire({
                title: "Unable to load your cart",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
        setIsLoading(false)
    }
    async function emptyCart() {
        const result = await Swal.fire({
            title: "clear your cart?",
            text: `All items will be removed from your cart. This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, clear it!"
        })
        if (!result.isConfirmed) return
        try {
            if (status === "unauthenticated") {
                clearGuestCart()
                setList([])

                return
            }
            const response = await clearCart()
            if (response.message == "success") {
                setList([])
                setCartId(undefined)
            }
        }
        catch (err) {
            await Swal.fire({
                title: "Unable to load your cart",
                text: "Please try again later.",
                icon: "error"
            })
        }
        setIsLoading(false)
    }

    async function updateProduct(productId: string, count: number) {
        if (count < 1) return
        try {
            if (status === "unauthenticated") {
                setList(updateGuestProduct(productId, count))
                return
            }
            const response = await updateProductsCart(productId, count)
            if (response.status !== "success") {
                throw new Error(response.message || "Unable to update this product.")
            }
            if (response.cartId) setCartId(response.cartId)
            const cart = await getCartData()
            setCartId(cart.cartId || response.cartId)
            setList(cart.products)
        }
        catch (error) {
            await Swal.fire({
                title: "Unable to update this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
    }
    async function removeProduct(productId: string) {
        const result = await Swal.fire({
            title: "remove item?",
            text: `remove item from your cart`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })

        if (!result.isConfirmed) return

        try {
            setRemovingProductId(productId)
            if (status === "unauthenticated") {
                setList(removeGuestProduct(productId))
                setRemovingProductId(null)
                return
            }
            const response = await deleteProductsCart(productId)
            if (response.status !== "success") {
                throw new Error(response.message || "Unable to remove this product.")
            }

            setList((products) =>
                products.filter((item) => item.product._id !== productId)
            )
            await Swal.fire({
                title: "Deleted!",
                text: "The product has been removed from your cart.",
                icon: "success"
            })
        }
        catch (error) {
            await Swal.fire({
                title: "Unable to remove this product",
                text: error instanceof Error ? error.message : "Please try again later.",
                icon: "error"
            })
        }
        setRemovingProductId(null)


    }

    useEffect(() => {
        if (status !== "loading") getCartProducts()
    }, [status])


    return (
        <div className="py-8 min-h-screen bg-gray-50">
            <div className="mx-auto container px-4">
                {isLoading ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-gray-500">
                        Loading your cart...
                    </div>
                ) : cartList.length > 0 ? (
                    <>
                        <div className="mb-8">
                            <nav className="text-gray-500 font-medium text-sm gap-2 mb-4 flex items-center">
                                <Link href="/">Home</Link>
                                <span className="text-gray-700">/ Shopping Cart</span>
                            </nav>
                            <div>
                                <h1 className="text-gray-900 font-bold text-3xl flex items-center gap-3">
                                    <span className="text-white bg-green-600 rounded-xl flex items-center justify-center w-12 h-12">
                                        <FaShoppingCart />
                                    </span>
                                    Shopping Cart
                                </h1>
                                <p className="text-gray-500 mt-2 font-medium">
                                    You have
                                    <span className="font-semibold text-green-600"> {cartList.length} items </span>
                                    in your cart
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                {cartList.map((product: CartProduct) => (
                                    <div key={product._id} className="mb-4 rounded-2xl border border-gray-100 bg-white shadow p-5">
                                        <div className="flex gap-6">
                                            <div className="shrink-0 rounded-lg border border-gray-100 p-3 h-32 w-32">
                                                <img src={product.product.imageCover} alt={product.product.title} className="object-contain w-full h-full" />
                                            </div>
                                            <div className="flex flex-col min-w-0 flex-1">
                                                <div className="mb-3">
                                                    <h3 className="text-lg text-gray-900 mb-3 font-semibold">{product.product.title}</h3>
                                                    <span className="text-center text-green-700 font-medium text-xs py-2 px-2.5 rounded-full bg-green-50">{product.product.category?.slug}</span>
                                                </div>
                                                <span className="text-lg font-bold text-green-600">{product.price} EGP</span>
                                                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 p-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => updateProduct(product.product._id, product.count - 1)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 shadow duration-150 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >-</button>
                                                        <span className="mx-2 text-gray-600">{product.count}</span>
                                                        <button
                                                            type="button"
                                                            disabled={product.count >= product.product.quantity}
                                                            onClick={() => updateProduct(product.product._id, product.count + 1)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-white bg-green-500 shadow duration-150 disabled:cursor-not-allowed disabled:opacity-50"
                                                        >+</button>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-gray-400 text-xs mb-0.5">Total</p>
                                                            <p className="text-gray-900 font-bold text-xl">
                                                                {product.price * product.count}
                                                                <span className="text-gray-400 text-sm font-medium mb-0.5"> EGP</span>
                                                            </p>
                                                        </div>
                                                        <button disabled={removingProductId !== null} onClick={() => removeProduct(product.product._id)} className="flex items-center justify-center w-10 h-10 rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white duration-200 disabled:cursor-not-allowed disabled:opacity-50">
                                                            <ImBin2 />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-6 border-gray-200 border-t mt-6 flex items-center justify-between">
                                    <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-800 duration-150">
                                        <HiOutlineArrowSmallLeft />
                                        Continue Shopping
                                    </Link>
                                    <button onClick={() => { emptyCart() }} className="flex items-center gap-2 text-sm text-gray-400 duration-150 hover:text-red-600 font-medium">
                                        <ImBin2 />
                                        Clear all items
                                    </button>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                                    <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-4">
                                        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                                            <FaShoppingBag />
                                            Order Summary
                                        </h2>
                                        <p className="mt-1 text-sm text-green-50">
                                            {cartList.length} {cartList.length === 1 ? "item" : "items"} in your cart
                                        </p>
                                    </div>
                                    <div className="space-y-4 p-5">
                                        <div className="rounded-xl bg-amber-50 p-4">
                                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                                                <FaTruck className="text-orange-500" />
                                                <span>Shipping calculated at checkout</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-amber-200">
                                                <div className="h-full w-3/4 rounded-full bg-amber-500" />
                                            </div>
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Subtotal ({cartList.reduce((sum, item) => sum + item.count, 0)} items)</span>
                                                <span className="font-medium text-gray-900">
                                                    {cartList.reduce((sum, item) => sum + item.price * item.count, 0)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Shipping</span>
                                                <span className="font-medium text-gray-900">Calculated at checkout</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
                                            <span className="font-semibold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-gray-900">{cartList.reduce((sum, product) => sum + product.price * product.count, 0)}</span>
                                        </div>

                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-600 duration-150 hover:border-green-500 hover:text-green-700"
                                        >
                                            <FaTag />
                                            Apply Promo Code
                                        </button>

                                        {status === "unauthenticated" ? (
                                            <Link
                                                href="/login"
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 font-semibold text-white shadow-lg shadow-green-600/20 duration-200 hover:from-green-700 hover:to-green-800"
                                            >
                                                <FaLock />
                                                Login to Checkout
                                            </Link>
                                        ) : (
                                            <Link
                                                href={`/checkout/${cartId}`}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 font-semibold text-white shadow-lg shadow-green-600/20 duration-200 hover:from-green-700 hover:to-green-800"
                                            >
                                                <FaLock />
                                                Secure Checkout
                                            </Link>
                                        )}

                                        <div className="flex items-center justify-center gap-4 pt-1 text-xs text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <FaShieldAlt className="text-green-500" />
                                                Secure Payment
                                            </span>
                                            <span className="h-4 border-l border-gray-200" />
                                            <span className="flex items-center gap-1.5">
                                                <FaTruck className="text-blue-500" />
                                                Fast Delivery
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex px-4 justify-center items-center">
                        <div className="max-w-md text-center">
                            <div className="bg-gray-100 rounded-full flex items-center justify-center w-32 h-32 mx-auto text-gray-400 mb-5"><FaBoxOpen size={50} /></div>
                            <h2 className="text-gray-900 font-bold text-2xl mb-3">Your cart is empty</h2>
                            <p className="mb-8 text-gray-500 font-medium">Looks like you haven't added anything to your cart yet.
                                Start exploring our products!</p>
                            <Link className="items-center inline-flex gap-2 bg-green-600 text-white rounded-xl px-8 py-3.5 font-semibold shadow-lg duration-150 hover:bg-green-800" href="/">Start Shopping
                                <FaArrowRightLong />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
