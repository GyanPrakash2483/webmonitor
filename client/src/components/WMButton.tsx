

export default function WMButton(prop: {
    text: string,
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>,
}) {
    
    return (
        <button onClick={prop.clickHandler} className="w-100px text-[14px] bg-[#00B4AB] p-4 text-white font-bold min-w-36">
            {prop.text}
        </button>
    )
}