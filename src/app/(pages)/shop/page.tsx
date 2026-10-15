import Card from "@/app/_SharedComponent/Card/Card";
import PagesTitle from "@/app/_SharedComponent/pagesTitle/PagesTitle";
import { getProducts } from "@/services/product.service";

export default async function shop() {
    const { data: products } = await getProducts();
    return (
        <section className="min-h-screen bg-gray-50">
            <div className="container mx-auto">
                <PagesTitle title="All Products" subTitle="Explore our complete product collection" sectionName="All Products" />
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-5">
                    {products.map((product) => (
                        <Card product={product} key={product._id} />
                    ))}
                </div>
            </div>
        </section>
    )
}
