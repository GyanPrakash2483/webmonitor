import WMButton from "../../components/WMButton";
import Navbar from "../../components/Navbar"


function HeroHome() {
    return (
        <div className="bg-[url('/source-code.jpg')] h-[500px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-10 md:text-4xl md:font-bold">Reliable Website Monitoring <br /> Services</h1>
            <WMButton text="GET STARTED"/>
        </div>
    )
}

function About() {
    return (
        <div className="bg-white w-[50%] mx-auto max-md:w-full -mt-16 flex max-md:flex-col-reverse max-w-[790px] min-md:min-w-[781px]">
            <div className="left-section p-4 w-[50%] max-md:w-full pt-12 max-md:pt-8">
                <span className="text-[#00B4AB]">ABOUT US</span>
                <h2 className="text-2xl my-1">Discover Webmonitor's Commitment to Excellence</h2>
                <p className="text-[#535353] text-sm mt-2 mb-8">Founded in 2024, Webmonitor is dedicated to providing top-notch website monitoring services. We empower businesses across various industries to maintain an optimal online presence.</p>
                <WMButton text="READ MORE"/>
            </div>
            <img src="/digital_marketing.png" alt="Digital Marketing decorative image" className="w-[50%] max-md:w-full"/>
        </div>
    )
}

function ValuePoints(prop: {
    pointno: string,
    title: string,
    description: string
}) {
    return (
        <div className="p-8 text-left max-w-[400px]">
            <span className="text-[#00B4AB]">{prop.pointno}</span>
            <h3 className="text-2xl mt-3">{prop.title}</h3>
            <p className="text-[#535353] mt-4">{prop.description}</p>
        </div>
    )
}

function Values() {
    return (
        <div className="text-center mt-10">
            <span className="text-[#00B4AB]">OUR VALUES</span>
            <h2 className="text-4xl max-md:text-3xl mt-4 px-8">Core Values That Define Us</h2>
            <div className="values flex max-md:flex-col justify-around items-center">
                <ValuePoints pointno="01" title="Reliability" description="We are commited to providing dependable monitoring services that our clients can trust. Our proactive alerts insure that you never miss a critical issue."/> <hr className="w-[90vw] text-gray-300 min-md:hidden" />
                <ValuePoints pointno="02" title="Customer Focus" description="Our clients are at the heart of everything we do. We prioritize understanding their needs in order to deliver tailored services and exceptional support." /> <hr className="w-[90vw] text-gray-300 min-md:hidden" />
                <ValuePoints pointno="03" title="Innovation" description="We embrace new technologies and methodologies to enhance our services. Our user-friendly interface is designed with the future in mind, making monitoring effortless." />
            </div>
        </div>

    )
}

function Elevate() {
    return (
        <div>Hello</div>
    )
}

export default function Home() {
    return (
        <>
            <HeroHome />
            <About />
            <Values />
            <Elevate />
        </>
    )
}