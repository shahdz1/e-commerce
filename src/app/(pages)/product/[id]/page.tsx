import getDetails from "@/services/productDetails.service";
import ProductGallery from "./ProductGallery";
import ProductQuantity from "./ProductQuantity";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaShareAlt, FaTruck, FaShieldAlt, FaStar, FaRegStar } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import AddBtnDetails from "@/app/_SharedComponent/Btns/AddBtnDetailsCart/addBtnDetails";
import AddBtnDetailsWishList from "@/app/_SharedComponent/Btns/AddBtnDetailsWishlist/AddBtnDetailsWishlist";


export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await getDetails(id);
  const productImages = data.images?.length ? data.images : [data.imageCover];
  const discountedPrice = data.priceAfterDiscount;
  const hasDiscount =
    discountedPrice !== undefined &&
    discountedPrice > 0 &&
    discountedPrice < data.price;
  const currentPrice =
    hasDiscount && discountedPrice !== undefined ? discountedPrice : data.price;
  const discountPercentage =
    hasDiscount && discountedPrice !== undefined
      ? Math.round(((data.price - discountedPrice) / data.price) * 100)
      : 0;
  return (


    <section className="p-6">


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
          {/* Product Images */}
          <ProductGallery images={productImages} title={data.title} />

          {/* Product Details */}
          <div className="px-4">
            <div className="shadow p-6 rounded-xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-50 rounded-full font-medium px-3 py-1.5 text-12px text-green-700">{data.category.name}</span>
                <span className="bg-gray-100 rounded-full font-medium px-3 py-1.5 text-12px text-gray-700">{data.brand.name}</span>
              </div>
              <h2 className="text-3xl text-gray-900 font-bold mb-3">{data.title}</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-amber-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaRegStar />
                </div>
                <span className="text-gray-600 text-sm">{data.ratingsAverage} ({data.ratingsQuantity} reviews)</span>
              </div>
              <div className="flex flex-wrap mb-6 items-center gap-3">
                <span className="text-3xl text-gray-900 font-bold">{currentPrice} EGP</span>
                {hasDiscount && (
                  <>
                    <span className="text-gray-400 line-through text-lg">{data.price} EGP</span>
                    <span className="text-white font-medium text-sm py-1 px-3 bg-red-500 rounded-full">
                      Save {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center mb-6 gap-2">
                <span className="flex items-center gap-2 text-green-700 text-sm py-1.5 px-3 bg-green-50 rounded-full font-medium">
                  <div className="bg-green-500 rounded-full w-2 h-2"></div>
                  In Stock
                </span>
              </div>
              <div className="pt-5 mb-6 border-t border-gray-100"><p className="text-gray-700 ">{data.description}</p></div>
              <ProductQuantity price={currentPrice} available={data.quantity} />
              <div className="flex mb-6 gap-3 flex-row">
                <AddBtnDetails product={data} price={currentPrice} />
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-medium text-white shadow shadow-gray-300 hover:-translate-y-1.5 duration-300 ease-in-out">
                  <MdElectricBolt size={20} />
                  Buy Now
                </button>
              </div>
              <div className="flex mb-6 gap-3">
                
                <AddBtnDetailsWishList product={data} price={currentPrice}/>
                <button className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium shadow shadow-gray-300 hover:-translate-y-1.5 duration-300 ease-in-out">
                  <FaShareAlt size={20} />
                </button>
              </div>
              <div className="grid *:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
                  <div className="flex shrink-0 text-2xl w-12 h-12 items-center justify-center rounded-full  bg-green-100 text-green-600">
                    <FaTruck />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">Free Delivery</h3>
                    <p className="text-gray-500 text-sm">Orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
                  <div className="flex shrink-0 w-12 h-12 text-2xl items-center justify-center rounded-full  bg-green-100 text-green-600">
                    <FaArrowRotateLeft />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">30 Days Return</h3>
                    <p className="text-gray-500 text-sm">Money back</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow hover:shadow-md transition-shadow duration-300">
                  <div className="flex shrink-0 w-12 h-12 text-2xl items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">Secure Payment</h3>
                    <p className="text-gray-500 text-sm">100% Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )

}