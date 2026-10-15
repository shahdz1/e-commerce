"use client"

import { IUserOrder } from "@/interface/userOrder"
import { getUserOrders } from "@/services/getUserOrders.service"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { FaBox, FaBuilding } from "react-icons/fa";
import { RiCashFill } from "react-icons/ri";
import { MdPlace } from "react-icons/md";

export default function AllOrders() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState<IUserOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getOrders(id: string) {
    try {
      const res = await getUserOrders(id)
      setOrders(res)
    } catch (error) {
      await Swal.fire({
        title: "Unable to load orders",
        text: "Please try again",
        icon: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status === "loading") return

    if (session?.user?.id) {
      getOrders(session.user.id)
    } else {
      setIsLoading(false)
    }
  }, [session?.user?.id, status])

  return (
    <div className="mx-auto container px-4 py-8">
      <div className="mb-8">
        <nav className="text-gray-500 font-medium text-sm gap-2 mb-4 flex items-center">
          <Link href="/">Home</Link>
          <span className="text-gray-700">/ My Orders</span>
        </nav>
        <div>
          <h1 className="text-gray-900 font-bold text-3xl flex items-center gap-3">
            <span className="text-white bg-green-600 rounded-xl flex items-center justify-center w-12 h-12">
              <FaBox />
            </span>
            My Orders
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Track and manage your orders
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm duration-300 hover:bg-gray-100 hover:shadow-md" key={index}>
            <div className="p-5 sm:p-6">
              <div className="flex gap-5">
                <div className="shrink-0 relative">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-2.5 sm:h-28 sm:w-28">
                    <img src={order.cartItems?.[0]?.product?.imageCover} alt={order.cartItems?.[0]?.product?.title} />
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-lg -top-2 -right-2 absolute">+{order.cartItems?.[0].count}</div>
                  <div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <div className="mb-2 text-xs font-semibold text-amber-600 inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-2.5 py-1">
                        {order.paymentMethodType}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900"># {order.id}</h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100"><RiCashFill /></div>
                  </div>
                  <div className="mb-4 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium text-sm text-gray-500">
                      <FaBuilding />
                      {order.createdAt?.split("T")[0]}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-sm text-gray-500">
                      <FaBox />
                      {order.cartItems?.[0]?.count} items
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-sm text-gray-500">
                      <MdPlace /> {order.shippingAddress.city}
                    </span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{order.totalOrderPrice}</span>
                    <span className="ml-1 text-sm font-medium text-gray-400"> EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
