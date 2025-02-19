import WMButton from "../../components/WMButton"
import Navbar from "../../components/Navbar"
import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"

function AboutHome() {
    return (
        <div className="bg-[url('/source-code.jpg')] h-[400px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-10 md:text-4xl md:font-bold">Your Website Guardian</h1>
            <WMButton text="GET STARTED"/>
        </div>
    )
}

function Story() {
    return (
        <div className="flex max-md:flex-col justify-around items-center my-10 max-md:px-10 max-md:gap-10">
            <div className="min-md:w-[20%]">
                <span className="text-[#00B4AB]">OUR STORY</span>
                <h2 className="text-3xl">Discover Webmonitor's Commitment to Excellence</h2>
            </div>
            <div className="min-md:w-[40%]">
                <p className="text-2xl">Webmonitor is dedicated to providing top-notch website monitoring services, ensuring business maintain peak performance and availability. We empower our clients through real-time data and intuitive anlytics.</p> <br />
                <p className="text-[#535353]">We proudly serve a diverse range of clients, from small startups to established enterprises across various industries. Our reliable solutions and exceptional customer support help them secure a strong online presence.</p>
            </div>
        </div>
    )
}

function Approaches(props: {
    title: string,
    description: string
}) {
    return (
        <div className="min-md:w-[30%]">
            <h3 className="text-lg">{props.title}</h3>
            <p className="text-[#535353]">{props.description}</p>
        </div>
    )
}

function Approach() {
    return (
        <div className="max-md:p-5 bg-white py-10 flex flex-col items-center gap-10">
            <div className="flex flex-col gap-8">
                <span className="text-[#00B4AB]">OUR APPROACH</span>
                <h2 className="text-3xl">Our Comprehensive Approach to Website Monitoring</h2>
            </div>
            <div className="flex max-md:flex-col items-center justify-around">
                <Approaches title="Proactive Monitoring" description="We utilize advanced monitoring technology that continuously checks your website's performance. By identifying potential issues before they escalate, we ensure that your online presence remains uninterrupted. allowing you to focus on your business priorities." />
                
                <div className="bg-[#535353] w-[1px] h-[150px] max-md:w-[100%] max-md:h-[1px] max-md:my-6"></div>

                <Approaches title="User-Friendly Interface" description="Our platform is designed with user experience in mind. Clients can easily navigate our dashboard, access real-time analytics, and receive proactive alerts, making website management simple and effective" />
            </div>
        </div>
    )
}

export default function About() {
    return (
        <>
            <AboutHome />
            <Story />
            <Approach />
            <CallToAction />
            <Footer />
        </>
    )
}