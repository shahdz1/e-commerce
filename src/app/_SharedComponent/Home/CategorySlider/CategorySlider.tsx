import { getCategories } from "@/services/category.service";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "../../sectionTitle/SectionTitle";
import { FaArrowRightLong } from "react-icons/fa6";

export default async function CategorySlider() {
  const { data: categories } = await getCategories();

  return (
    <section className="py-10" id="category">
      <div className="px-4 mx-auto container ">

        <div className="flex justify-between mb-8 items-center">
          <SectionTitle title={"Shop By "} subTitle={"Categories"} />
          <Link href="/Categories" className="text-emerald-600 flex items-center gap-1 font-medium hover:text-emerald-800">View All Categories
            <FaArrowRightLong />          
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {categories.map((category) => (
            <Link href={`/subCategories/${category._id}`} key={category._id} className="w-full gap-2 rounded-lg bg-white p-4 flex flex-col items-center shadow-xl hover:shadow-2xl transition-shadow duration-150">
              <Image
                alt={category.name}
                className="pointer-events-none rounded-full w-20 h-20  object-cover select-none mb-4"
                height={56}
                loading="lazy"
                src={category.image}
                width={56}
              />
              <div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>


  );
}
