export default function SectionTitle({ title, subTitle }: { title: string, subTitle: string }) {
    return (
        <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-emerald-500 to-emerald-800"></div>
            <h2 className="text-3xl text-gray-800 font-bold">{title} <span className="text-emerald-600">{subTitle}</span></h2>
        </div>
    )
}
