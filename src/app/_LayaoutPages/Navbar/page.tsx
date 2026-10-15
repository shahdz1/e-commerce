"use client"

import Image from "next/image";
import freshCartLogo from "@/assets/img/freshcart-logo.49f1b44d.svg";
import Link from "next/link";
import { Form } from "@heroui/react";
import { BiSupport } from "react-icons/bi";
import { FaRegHeart, FaSearch, FaTruck, FaGift } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdMailOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { FiHeart, FiLogOut, FiMapPin, FiPackage, FiSettings, FiUser } from "react-icons/fi";
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/Categories", label: "Categories" },
  { href: "/Brands", label: "Brands" },
];

function ProfileMenu({
  user,
  onSignOut,
  menuId,
}: {
  user: { name?: string | null; email?: string | null } | undefined;
  onSignOut: () => void;
  menuId: string;
}) {
  return (
    <div className="relative ml-2">
      <input
        type="checkbox"
        id={menuId}
        className="peer hidden"
        aria-label="Toggle account menu"
      />
      <label
        htmlFor={menuId}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-slate-50 text-green-600 hover:bg-green-50"
        aria-label="Open account menu"
      >
        <FiUser size={24} />
      </label>
      <label
        htmlFor={menuId}
        className="fixed inset-0 z-40 hidden cursor-default peer-checked:block"
        aria-label="Close account menu"
      />
      <div className="absolute right-0 top-full z-50 mt-2 hidden w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl peer-checked:block">
        <Link href="/profile" className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 hover:bg-slate-50">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
            <FiUser size={24} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold text-slate-800">
              {user?.name || "My Account"}
            </span>
            <span className="block truncate text-sm text-slate-400">
              {user?.email}
            </span>
          </span>
        </Link>
        <nav className="py-2" aria-label="Account menu">
          <Link href="/profile" className="flex items-center gap-4 px-5 py-3 text-slate-600 hover:bg-green-50 hover:text-green-600">
            <FiUser size={19} />
            My Profile
          </Link>
          <Link href="/allorders" className="flex items-center gap-4 px-5 py-3 text-slate-600 hover:bg-green-50 hover:text-green-600">
            <FiPackage size={19} />
            My Orders
          </Link>
          <Link href="/wishlist" className="flex items-center gap-4 px-5 py-3 text-slate-600 hover:bg-green-50 hover:text-green-600">
            <FiHeart size={19} />
            My Wishlist
          </Link>
          <Link href="/profile" className="flex items-center gap-4 px-5 py-3 text-slate-600 hover:bg-green-50 hover:text-green-600">
            <FiMapPin size={19} />
            Addresses
          </Link>
          <Link href="/profile" className="flex items-center gap-4 px-5 py-3 text-slate-600 hover:bg-green-50 hover:text-green-600">
            <FiSettings size={19} />
            Settings
          </Link>
        </nav>
        <div className="border-t border-slate-100 p-2">
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-4 rounded-lg px-3 py-3 text-red-500 hover:bg-red-50"
          >
            <FiLogOut size={19} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { data: session } = useSession()
  function LogOut() {
    signOut({
      callbackUrl: '/login'
    })
  }
  return (
    <header className="sticky top-0 z-40 bg-white shadow">
      <div className="xl:flex hidden h-12 items-center justify-between border-b border-gray-100 px-3 sm:px-4 xl:h-10">
        <div className="items-center flex gap-6 text-gray-600">
          <span className="flex items-center gap-2">
            <FaTruck className="text-green-600" />
            Free Shipping on Orders 500 EGP
          </span>
          <span className="flex items-center gap-2">
            <FaGift className="text-green-600" />
            New Arrivals Daily
          </span>
        </div>
        <div className="gap-6 flex items-center">
          <div className="hidden items-center gap-4 text-gray-500 md:flex">
            <Link href="tel:+18001234567" className="flex items-center gap-1.5 duration-150 hover:bg-gray-100"><IoCall />
              +1 (800) 123-4567
            </Link>
            <Link href="mailto:support@freshcart.com" className="flex items-center gap-1.5 duration-150 hover:bg-gray-100"><MdMailOutline />support@freshcart.com
            </Link>
          </div>
          {session && (
            <div className="flex min-w-0 items-center gap-3 sm:gap-5">
              <Link href="/profile" className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-700 hover:text-green-600">
                <FiUser className="shrink-0" size={18} />
                <span className="max-w-32 truncate sm:max-w-48">{session.user?.name || "My Account"}</span>
              </Link>
              <button type="button" onClick={LogOut} className="flex shrink-0 items-center gap-2 text-sm text-slate-700 hover:text-red-600">
                <FiLogOut size={17} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
          {!session && (
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/login" className="flex items-center text-gray-600 duration-150 hover:text-green-600">
                <CiUser /> Sign In</Link>
              <Link href="/signup" className="flex items-center text-gray-600 duration-150 hover:text-green-600">
                <HiUserAdd />
                Sign Up</Link>
            </div>
          )}
        </div>
      </div>
      <nav className="border-b border-slate-200" aria-label="Main navigation">
        <div className="relative mx-auto  px-4 sm:px-6 lg:px-8">
          <input
            type="checkbox"
            id="fresh-cart-menu"
            className="peer hidden"
            aria-label="Toggle navigation menu"
          />
          <div className="flex h-18 items-center justify-between gap-4">
            <Link href="/" className="shrink-0" aria-label="FreshCart home">
              <Image
                src={freshCartLogo}
                alt="FreshCart"
                width={160}
                height={31}
                priority
              />
            </Link>

            <Form className="hidden max-w-xl flex-1 xl:flex">
              <div className="relative w-full">
                <input
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-5 py-3 pr-12 text-sm duration-150 focus:shadow-green-400 focus:shadow"
                  type="search"
                  name="search"
                  placeholder="Search for products, brands and more..."
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-green-600 text-white"
                >
                  <FaSearch />
                </button>
              </div>
            </Form>
            <div className="hidden items-center xl:flex">
              <ul className="hidden items-center mr-4 gap-6 xl:flex">
                <li>
                  <Link href="/" className="font-medium text-gray-700 duration-150 hover:text-green-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="font-medium text-gray-700 duration-150 hover:text-green-600">
                    Shop
                  </Link>
                </li>
                <li className="group relative">
                  <button type="button" className="flex items-center gap-1.5 py-2 font-medium text-gray-700 duration-150 hover:text-green-600">
                    Categories
                    <svg className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full z-20 w-60 translate-y-2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                    <Link href="/Categories" className="block px-4 py-2.5 text-gray-600 duration-150 hover:bg-green-50 hover:text-green-600">All Categories</Link>
                    <Link href={`/Categories`} className="block px-4 py-2.5 text-gray-600 duration-150 hover:bg-green-50 hover:text-green-600">Electronics</Link>
                    <Link href={`/Categories`} className="block px-4 py-2.5 text-gray-600 duration-150 hover:bg-green-50 hover:text-green-600">Women's Fashion</Link>
                    <Link href={`/Categories`} className="block px-4 py-2.5 text-gray-600 duration-150 hover:bg-green-50 hover:text-green-600">Men's Fashion</Link>
                    <Link href={`/Categories`} className="block px-4 py-2.5 text-gray-600 duration-150 hover:bg-green-50 hover:text-green-600">Beauty & Health</Link>
                  </div>
                </li>
                <li>
                  <Link href="/Brands" className="font-medium text-gray-700 duration-150 hover:text-green-600">
                    Brands
                  </Link>
                </li>
              </ul>
              <Link href="/contactUs" className="mr-2 flex items-center gap-2 border-r border-gray-100 pr-3 duration-150 hover:bg-gray-50">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <BiSupport size={20} />
                </span>
                <span className="text-xs">
                  <span className="text-gray-400">Support</span>
                  <span className="block font-semibold text-gray-700">24/7 Help</span>
                </span>
              </Link>
              <Link href="/wishlist" aria-label="Wishlist" className="rounded-full p-2.5 text-gray-500 duration-75 hover:bg-gray-100 hover:text-red-600">
                <FaRegHeart />
              </Link>
              <Link href="/cart" aria-label="Cart" className=" rounded-full p-2.5 text-gray-500 duration-75 hover:bg-gray-100 hover:text-green-500">
                <FaCartShopping />
              </Link>
              {session && <ProfileMenu user={session.user} onSignOut={LogOut} menuId="fresh-cart-profile-menu-desktop" />}
              {!session &&
                <Link href="/login" className="ml-2 hidden items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-200 duration-200 hover:bg-green-700 sm:inline-flex">
                  <CiUser size={20} />
                  Sign In
                </Link>
              }


            </div>

            <div className="flex items-center gap-1 xl:hidden">
              <Link href="/wishlist" aria-label="Wishlist" className="rounded-full p-2.5 text-gray-600 hover:bg-gray-100">
                <FaRegHeart />
              </Link>
              <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2.5 text-gray-600 hover:bg-gray-100">
                <FaCartShopping />
                <span className="absolute right-0.5 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green-600 text-xs font-semibold text-white ring-2 ring-white">2</span>
              </Link>
              {session && <ProfileMenu user={session.user} onSignOut={LogOut} menuId="fresh-cart-profile-menu-mobile" />}
              <label
                htmlFor="fresh-cart-menu"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100"
                aria-label="Open navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
            </div>
          </div>

          <label
            htmlFor="fresh-cart-menu"
            className="fixed inset-0 z-40 hidden bg-slate-900/40 backdrop-blur-sm peer-checked:block xl:hidden"
            aria-label="Close navigation menu"
          />
          <aside className="pointer-events-none fixed inset-y-0 right-0 z-50 flex w-full max-w-xs translate-x-full flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out peer-checked:pointer-events-auto peer-checked:translate-x-0 xl:hidden">
            <div className="flex h-18 items-center justify-between border-b border-slate-100 px-5">
              <Link href="/" aria-label="FreshCart home">
                <Image src={freshCartLogo} alt="FreshCart" width={140} height={27} />
              </Link>
              <label
                htmlFor="fresh-cart-menu"
                className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close navigation menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 18 12-12M6 6l12 12" />
                </svg>
              </label>
            </div>

            <Form className="border-b border-slate-100 p-4">
              <div className="relative w-full">
                <input
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-11 text-sm focus:border-green-500 focus:outline-none"
                  type="search"
                  name="mobile-search"
                  placeholder="Search products..."
                />
                <button type="submit" aria-label="Search" className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-green-600 text-white">
                  <FaSearch size={14} />
                </button>
              </div>
            </Form>

            <nav className="flex flex-col gap-1 border-b border-slate-100 p-4" aria-label="Mobile navigation">
              {navigationLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-green-50 hover:text-green-700">
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-1 border-b border-slate-100 p-4">
              <Link href="/wishlist" className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-700 hover:bg-green-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500"><FaRegHeart /></span>
                Wishlist
              </Link>
              <Link href="/cart" className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-slate-700 hover:bg-green-50">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600"><FaCartShopping /></span>
                Cart
              </Link>
            </div>
            <div className="mt-auto space-y-3 p-4">
              {session &&
                <Link href="/login" onClick={() => { LogOut() }} className="flex items-center text-gray-600 duration-150 hover:text-green-600">
                  <CiUser /> Log Out</Link>
              }
              {!session &&
                <div className="flex gap-2">
                  <Link href="/signin" className="flex flex-1 items-center justify-center rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
                    Sign In
                  </Link>
                  <Link href="/signup" className="flex flex-1 items-center justify-center rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50">
                    Sign Up
                  </Link>
                </div>
              }


              <Link href="/contactUs" className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700"><BiSupport size={19} /></span>
                <span className="text-xs">
                  <span className="block font-medium text-slate-700">Need Help?</span>
                  <span className="font-semibold text-green-700">Contact Support</span>
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </nav>
    </header>
  );
}
