import Image from "next/image";
import HeaderSlider from "./_SharedComponent/Home/HeaderSlider/HeaderSlider";
import CategorySlider from "./_SharedComponent/Home/CategorySlider/CategorySlider";
import HomeProducts from "./_SharedComponent/Home/HomeProducts/HomeProducts";
import { FaTruck, FaShieldAlt } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <div>
        <HeaderSlider />
      </div>
      <section className="py-8 bg-gray-100">
        <div className="mx-auto container px-7">
          <div className="grid *:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex shrink-0 text-2xl w-12 h-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <FaTruck />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800">Free Shipping</h3>
                <p className="text-gray-500 text-sm">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex shrink-0 w-12 h-12 text-2xl items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800">Secure Payment</h3>
                <p className="text-gray-500 text-sm">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex shrink-0 w-12 h-12 text-2xl items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <FaArrowRotateLeft />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800">Easy Returns</h3>
                <p className="text-gray-500 text-sm">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
              <div className="flex shrink-0 w-12 h-12 text-2xl items-center justify-center rounded-full bg-violet-100 text-violet-600" >
                <BiSupport />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-800">24/7 Support</h3>
                <p className="text-gray-500 text-sm">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CategorySlider />
      <HomeProducts />
    </>
  );
}
