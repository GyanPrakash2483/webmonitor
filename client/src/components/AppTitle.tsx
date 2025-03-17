export default function AppTitle(props: {
    title: string
}) {
    return (
        <div className="flex items-center justify-center">
            <span className="font-[Jua] text-[#00B4AB] text-4xl mt-20">{props.title}</span>
        </div>
    )
}