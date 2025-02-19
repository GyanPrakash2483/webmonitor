import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

function HeroAbout() {
    return (
        <div className="bg-[url('/lined-boxes.png')] bg-cover h-[400px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-10 md:text-4xl md:font-bold">Our Services</h1>
        </div>
    )
}

function Offering(props: {
    label: string,
    title: string,
    description: string
}) {
    return (
        <div className="w-[50%] flex flex-col justify-center p-8 max-md:w-auto">
            <span className="text-[#00B4AB]">{props.label}</span>
            <h2 className="text-2xl my-4">{props.title}</h2>
            <p className="text-[#535353]">{props.description}</p>
        </div>
    )
}

function OfferingList() {
    return (
        <div className="flex flex-col items-center bg-white min-md:max-w-[800px] mx-auto shadow-2xl -mt-20">
            <div className="flex max-md:flex-col-reverse max-md:items-center max-md:mt-5">
                <Offering label="01" title="Website Monitoring" description="Our website monitoring service ensures optimal uptime and accessibility. With real-time alerts and tracking, you can  proactively address issues before they impact your business's online presence." />
                <img className="w-[50%] max-md:w-[90%] h-[400px]" src="/google-search.png" alt="google search" />
            </div>
            <div className="flex max-md:flex-col max-md:items-center">
                <img className="w-[50%] max-md:w-[90%] h-[400px]" src="/source-code.jpg" alt="Source Code" />
                <Offering label="02" title="Performance Analytics" description="Utilize our detailed performance analytics to gain insights into your website's operation. We provide regular reports, helping you make data-driven decisions for improved user experience." />
            </div>
            <div className="flex max-md:flex-col-reverse max-md:items-center">
                <Offering label="03" title="Custom Alerts" description="Set up custom alerts tailored to your business needs. Receive notifications for specific metrics and downtime occurences, allowing you to stay informed and responsive." />
                <img className="w-[50%] max-md:w-[90%] h-[400px]" src="/digital_marketing.png" alt="Digital Marketing" />
            </div>
        </div>
    )
}

function Review() {
    return (
        <div className="flex flex-col items-center my-10 gap-6 px-2">
            <span className="text-[#00B4AB] text-8xl">"</span>
            <p className="text-2xl text-center max-w-100">Webmonitor's services have significantly improved our website's performance. We can focus more on our core business, knowing our online presence is in good hands.</p>
            <span className="text-[#00B4AB]">EMILY JOHNSON</span>
        </div>
    )
}

export default function Offerings() {
    return (
        <>
            <HeroAbout />
            <OfferingList />
            <Review />
            <CallToAction />
            <Footer />
        </>
    )
}