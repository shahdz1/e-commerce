"use client"

import { useForm } from "react-hook-form"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkOutSchema } from "@/schema/checkout.schema"
import { checkOutSession } from "@/services/checkOut.service"
import { ICheckOut } from "@/interface/checkout.interface"
import Link from "next/link"
import { FaShoppingBag, FaTruck, FaShieldAlt, FaBox, FaHome, FaInfoCircle, FaPhoneAlt, FaMoneyBillWave, FaCreditCard, FaCheck, FaCcMastercard, FaCcAmex } from "react-icons/fa"
import { getCartData } from "@/services/cartActions/getProductsCart.action"
import { useEffect, useState } from "react"
import { CartProduct } from "@/interface/cartList.interface"
import Swal from 'sweetalert2'
import { PiBuildingApartmentFill } from "react-icons/pi";
import { MdPlace } from "react-icons/md";
import { FaWallet, FaCcVisa } from "react-icons/fa6";
import { cashOnOrder } from "@/services/cashOnDelivery.service"

type PaymentMethod = "cash" | "online";

export default function Checkout() {
  const { id } = useParams<{ id: string }>()
  const [cartList, setList] = useState<CartProduct[]>([])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const { register, handleSubmit } = useForm<ICheckOut>({
    resolver: zodResolver(checkOutSchema),
    defaultValues: {
      city: "",
      phone: "",
      details: "",
    },
    mode: "onBlur"
  })


  async function handelPayment(value: ICheckOut) {
    const response = await checkOutSession(id, value)
    if (response.status == "success") {
      window.location.href = response.session.url
    }
  }
  async function handelCashOrder(value: ICheckOut) {
    try {
      const response = await cashOnOrder(id, value)
      if (response.status !== "success") {
        throw new Error(response.message || "Unable to place your order")
      }
      await Swal.fire({
        title: "Order placed",
        text: "Your order has been placed successfully.",
        icon: "success"
      })
      window.location.href = "/allorders"
    } catch (error) {
      await Swal.fire({
        title: "Unable to place your order",
        text: error instanceof Error ? error.message : "Please try again later.",
        icon: "error"
      })
    }
  }

  useEffect(() => {
    async function getCartProducts() {
      try {
        const cart = await getCartData()
        setList(cart.products)
      } catch (error) {
        await Swal.fire({
          title: "Unable to load your cart",
          text: error instanceof Error ? error.message : "Please try again later.",
          icon: "error"
        })
      }
    }

    getCartProducts()
  }, [])

  return (
    <div className="py-8 min-h-screen bg-gray-50">
      <div className="mx-auto container px-4">
        <div className="mb-8">
          <nav className="text-gray-500 font-medium text-sm gap-2 mb-4 flex items-center">
            <Link href="/">Home</Link>
            <span className="text-gray-700">/ Checkout</span>
          </nav>
          <div>
            <h1 className="text-gray-900 font-bold text-3xl flex items-center gap-3">
              <span className="text-white bg-green-600 rounded-xl flex items-center justify-center w-12 h-12">
                <FaShoppingBag />
              </span>
              <span className="text-gray-700">Complete Your Order</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Review your items and complete your purchase
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit((value) => {
          if (paymentMethod === "online") {
            return handelPayment(value)
          }
          return handelCashOrder(value)
        })}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <FaHome />
                    Shipping Address
                  </h2>
                  <p className="text-green-100 text-sm mt-1 font-medium">Where should we deliver your order?</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 bg-blue-100 rounded-full items-center justify-center text-blue-600"><FaInfoCircle /></div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Delivery Information</p>
                      <p className="text-xs mt-0.5 text-blue-600 font-medium">Please ensure your address is accurate for smooth delivery</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-700">City <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <div className="absolute top-1/4 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <PiBuildingApartmentFill />
                      </div>
                      <input {...register("city")} type="text" id="city" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 pl-14 duration-150 focus:ring-green-400 focus:border-green-500 placeholder:text-body" placeholder="e.g.Cairo, Alex, Giza" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="details" className="block mb-2 text-sm font-semibold text-gray-700">Street Address <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <div className="absolute top-3 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <MdPlace />
                      </div>
                      <textarea {...register("details")} rows={3} id="details" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 pl-14 duration-150 focus:ring-green-400 focus:border-green-500 placeholder:text-body" placeholder="Street name, building number,floor, apartment..." />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-700">Phone Number <span className="text-red-600">*</span></label>
                    <div className="relative">
                      <div className="absolute top-1/4 left-4 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                        <FaPhoneAlt />
                      </div>
                      <input {...register("phone")} type="tel" id="phone" className="block w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 pl-14 duration-150 focus:ring-green-400 focus:border-green-500 placeholder:text-body" placeholder="01xxxxxxxxx" />
                      <span className="absolute right-4 top-5 text-xs text-gray-400">Egyption numbers only</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border mt-5 border-gray-100 bg-white shadow-sm">
                <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <FaWallet />
                    Payment Method
                  </h2>
                  <p className="text-green-100 text-sm mt-1 font-medium">Choose how you'd like to pay</p>
                </div>
                <div className="p-6">
                  <button
                    type="button"
                    aria-pressed={paymentMethod === "cash"}
                    onClick={() => setPaymentMethod("cash")}
                    className={`mb-5 flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all ${paymentMethod === "cash"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-200"
                      }`}
                  >
                    <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl text-white ${paymentMethod === "cash" ? "bg-green-600" : "bg-gray-300"
                      }`}>
                      <FaMoneyBillWave />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-bold text-green-800">Cash on Delivery</span>
                      <span className="mt-1 block text-gray-600">Pay when your order arrives at your doorstep</span>
                    </span>
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${paymentMethod === "cash" ? "bg-green-600 text-white" : "border-2 border-gray-200"
                      }`}>
                      {paymentMethod === "cash" && <FaCheck />}
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={paymentMethod === "online"}
                    onClick={() => setPaymentMethod("online")}
                    className={`flex w-full items-center gap-5 rounded-2xl border-2 p-5 text-left transition-all ${paymentMethod === "online"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-200"
                      }`}
                  >
                    <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl ${paymentMethod === "online" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"
                      }`}>
                      <FaCreditCard />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-bold text-gray-900">Pay Online</span>
                      <span className="mt-1 block text-gray-600">Secure payment with Credit/Debit Card via Stripe</span>
                      <span className="mt-2 flex gap-2 font-bold text-blue-700 text-sm">
                        <FaCcVisa />
                        <FaCcMastercard />
                        <FaCcAmex />
                      </span>
                    </span>
                    <span className={`h-10 w-10 shrink-0 rounded-full ${paymentMethod === "online" ? "flex items-center justify-center bg-green-600 text-white" : "border-2 border-gray-200"
                      }`}>
                      {paymentMethod === "online" && <FaCheck />}
                    </span>
                  </button>

                  <div className="mt-5 flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
                      <FaShieldAlt />
                    </span>
                    <span>
                      <span className="block font-semibold text-green-800">Secure & Encrypted</span>
                      <span className="mt-1 block text-sm text-green-700">Your payment info is protected with 256-bit SSL encryption</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
                <div className="bg-linear-to-r from-green-600 to-green-700 px-5 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <FaShoppingBag />
                    Order Summary
                  </h2>
                </div>
                <div className="mb-2 max-h-56 overflow-y-auto p-1">
                  {cartList.map((product: CartProduct) => (
                    <div key={product._id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 duration-150 hover:bg-gray-100">
                      <div className="shrink-0 w-14 h-14 rounded-lg p-1 border border-gray-100 bg-white">
                        <img src={product.product.imageCover} alt={product.product.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{product.product.title}</p>
                        <p className="mt-0.5 text-xs text-gray-500 font-medium">{product.count} * {product.price}</p>
                      </div>
                      <p className="shrink-0 text-sm font-bold text-gray-900">{product.price * product.count}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 p-5">
                  <div className="space-y-3 text-md font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal </span>
                      <span className="font-medium text-gray-700">
                        {cartList.reduce((subtotal, product) => subtotal + product.price * product.count, 0)} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2"><FaTruck /> Shipping</span>
                      <span className="font-medium text-gray-900"> </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">{cartList.reduce((subtotal, product) => subtotal + product.price * product.count, 0)} EGP</span>
                  </div>
                  {paymentMethod === "online" ? (
                    <button
                      type="button"
                      onClick={() => handleSubmit(handelPayment)()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 font-semibold text-white shadow-lg shadow-green-600/20 duration-200 hover:from-green-700 hover:to-green-800"
                    >
                      <FaCreditCard />
                      Proceed to Payment
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSubmit(handelCashOrder)()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-600 to-green-700 py-4 font-semibold text-white shadow-lg shadow-green-600/20 duration-200 hover:from-green-700 hover:to-green-800"
                    >
                      <FaBox />
                      Place Order
                    </button>
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
        </form>

      </div>
    </div>

  )
}
