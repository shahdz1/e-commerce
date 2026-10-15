import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";

export default function PagesTitle({ title, subTitle, sectionName, image, }: { title: string, subTitle: string, sectionName: string, image?: string }) {
    return (
        <div className="text-white bg-linear-to-br from-green-600 to-green-400">
            <div className="py-16 px-4 mx-auto container">
                <nav className="mb-6 flex items-center gap-2 text-sm font-medium">
                    <Link href={"/"} className=" hover:underline duration-200 font-light">Home</Link>
                    / {sectionName}
                </nav>
                <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30">
                        {image ? (
                            <img src={image} alt={title} className="h-full w-full rounded-2xl object-contain p-2" />
                        ) : (
                            <FaLayerGroup size={30} />
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
                        <p className="text-white/80 mt-1 font-medium">{subTitle}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}
