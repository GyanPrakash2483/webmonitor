import WMButton from "./WMButton";

export default function CallToAction() {
    return (
        <div className="bg-[url('/teal-bg.png')] flex flex-col py-12 items-center gap-12">
            <span className="text-white">TAKE CONTROL OF YOUR</span>
            <h2 className="text-white text-3xl">Online Uptime Today</h2>
            <WMButton text="GET STARTED" clickHandler={() => {
                location.href = '/dashboard'
            }}/>
        </div>
    )
}