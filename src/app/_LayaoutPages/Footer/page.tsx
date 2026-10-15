import Link from "next/link"
import {
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaHeadset,
  FaShoppingCart,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCreditCard,
} from "react-icons/fa"

const footerLinks = [
  {
    title: "Shop",
    links: [
      ["All Products", "/shop"],
      ["Categories", "/Categories"],
      ["Brands", "/Brands"],
      ["Electronics", "/shop"],
      ["Men's Fashion", "/shop"],
      ["Women's Fashion", "/shop"],
    ],
  },
  {
    title: "Account",
    links: [
      ["My Account", "/profile"],
      ["Order History", "/allorders"],
      ["Wishlist", "/wishlist"],
      ["Shopping Cart", "/cart"],
      ["Sign In", "/login"],
      ["Create Account", "/signup"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact Us", "/"],
      ["Help Center", "/"],
      ["Shipping Info", "/"],
      ["Returns & Refunds", "/"],
      ["Track Order", "/allorders"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/"],
      ["Terms of Service", "/"],
      ["Cookie Policy", "/"],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="bg-green-50">
        <div className=" grid max-w-full grid-cols-1 gap-10 mx-auto px-3  py-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4">
            <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
              <FaTruck />
            </span>
            <span>
              <span className="block font-semibold text-gray-900">Free Shipping</span>
              <span className="text-sm text-gray-500">On orders over 500 EGP</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
              <FaUndo />
            </span>
            <span>
              <span className="block font-semibold text-gray-900">Easy Returns</span>
              <span className="text-sm text-gray-500">14-day return policy</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
              <FaShieldAlt />
            </span>
            <span>
              <span className="block font-semibold text-gray-900">Secure Payment</span>
              <span className="text-sm text-gray-500">100% secure checkout</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex h-15 w-15 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-2xl text-green-600">
              <FaHeadset />
            </span>
            <span>
              <span className="block font-semibold text-gray-900">24/7 Support</span>
              <span className="text-sm text-gray-500">Contact us anytime</span>
            </span>
          </div>
        </div>
      </div>

      <div className="text-gray-400">
        <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-10 px-5 py-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href="/" className="mb-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-3xl font-bold text-gray-800">
              <FaShoppingCart className="text-green-600" />
              FreshCart
            </Link>
            <p className="mb-7 max-w-137.5 leading-7">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="mb-3 flex items-center gap-4"><FaPhone className="text-green-500" /> +1 (800) 123-4567</div>
            <div className="mb-3 flex items-center gap-4"><FaEnvelope className="text-green-500" /> support@freshcart.com</div>
            <div className="flex items-center gap-4"><FaMapMarkerAlt className="text-green-500" /> 123 Commerce Street, New York, NY 10001</div>
            <div className="mt-8 flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                <a key={index} href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1e293b] hover:bg-green-600">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h2 className="mb-6 text-xl font-bold text-white">{section.title}</h2>
              <ul className="space-y-4">
                {section.links.map(([title, href]) => (
                  <li key={title}>
                    <Link href={href} className="hover:text-green-400">{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700">
          <div className="mx-auto flex max-w-[1920px] flex-col justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center">
            <p>© 2026 FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2"><FaCreditCard /> Visa</span>
              <span className="flex items-center gap-2"><FaCreditCard /> Mastercard</span>
              <span className="flex items-center gap-2"><FaCreditCard /> PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
