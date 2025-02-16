import Navbar from "../../components/Navbar"
import WMButton from "../../components/WMButton"

export default function HeroHome() {
    return (
        <div className="bg-[url('/source-code.jpg')] h-[500px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-10 md:text-4xl md:font-bold">Reliable Website Monitoring <br /> Services</h1>
            <WMButton text="GET STARTED"/>
        </div>
    )
}