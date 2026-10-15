import { getProducts } from "@/services/product.service";
import SectionTitle from "../../sectionTitle/SectionTitle";
import Card from "../../Card/Card";

export default async function HomeProducts() {
    const { data: products } = await getProducts();
    return (
        <section className="py-10 px-5">
            <div className=" container mx-auto">
                <SectionTitle title={"Featured "} subTitle={"Products"} />
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5">
                    {products.map((product) => (
                        <Card product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </section>
    )
}
