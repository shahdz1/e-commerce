import Link from "next/link";

export default function NotFound() {
    return (
        <div className="py-16 px-4 bg-green-50 overflow-hidden justify-center items-center min-h-screen flex">
            <div className=" max-w-xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-5xl text-gray-900 font-black mb-4">Oops! Nothing Here</h1>
                    <p className=" text-gray-500 text-lg max-w-md mx-auto">Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.</p>
                </div>
                <div className="mb-3 flex items-center justify-center gap-4">
                    <Link href={'/'} className=" text-center rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow">Go to Homepage</Link>
                </div>
            </div>
        </div>
    )
}
