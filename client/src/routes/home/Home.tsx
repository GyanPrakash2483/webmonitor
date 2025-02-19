import WMButton from "../../components/WMButton";
import Navbar from "../../components/Navbar";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";


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
                <p className="text-[#535353] text-sm mt-2 mb-8">Founded in 2025, Webmonitor is dedicated to providing top-notch website monitoring services. We empower businesses across various industries to maintain an optimal online presence.</p>
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
        <div className="bg-[url('/code2.png')] bg-blend-darken bg-black/40 text-center py-20 px-10">
            <span className="text-white">READY TO ELEVATE</span>
            <h2 className="text-white text-3xl my-10 max-md:text-2xl">Your Online Presence Starts Here</h2>
            <WMButton text="GET STARTED" clickHandler={() => {
                location.href = '/dashboard'
            }} />
        </div>
    )
}

function Choice(props: {
    title: string,
    description: string
}) {
    return (
        <div>
            <h3 className="text-2xl mt-4">{props.title}</h3>
            <p className="text-[#535353] mt-2 mb-4">{props.description}</p>
        </div>
    )
}

function WhyChoose() {
    return (
        <div className="flex max-md:flex-col p-6 min-md:px-80 justify-around max-md:gap-10 pt-10 bg-white">
            <div className="min-md:w-[50%] flex flex-col gap-5 min-md:min-w-[335px]">
                <span className="text-[#00B4AB]">WHY CHOOSE US</span>
                <h2 className="text-3xl">Why Choose Webmonitor for Your Business?</h2>
                <p className="text-[#535353]">Experience the unique advantages of partnering with us. Our offerings set us apart in the world of website monitoring.</p>
            </div>
            <div className="min-md:w-[50%] min-md:px-10 min-md:min-w-[335px]">
                <Choice title="Real-Time Analytics" description="Access detailed tracking and analytics in real-time. Stay informed about your website's performance and uptime, empowering you to make data-driven decisions." /><hr className="text-[#888888]" />
                <Choice title="User-Friendly Interface" description="Our intuitive platform ensures that you can manage monitoring settings with ease. No technical skills required, just straightforward navigation for all users." /><hr className="text-[#888888]" />
                <Choice title="Proactive Alerts" description="Receive instant alerts whenever issues arise, allowing you to address potential disruptions quickly. We help you maintain a stable online presence effortlessly." />
            </div>
        </div>
    )
}

function Review(props: {
    review: string,
    author: string
}) {
    return (
        <div className="max-w-80 bg-white p-10 shadow-2xl">
            <span className="text-6xl text-[#00B4AB]">"</span>
            <p className="text-[#535353]">{props.review}</p><br />
            <span className="text-1xl"> - {props.author}</span>
        </div>
    )
}

function Reviews() {
    return (
        <div className="flex flex-col items-center gap-5 py-10">
            <h2 className="text-3xl">What Our Clients Say?</h2>
            <div className="flex max-md:flex-col justify-center w-full items-center gap-16">
                <Review review="Webmonitor has transformed the way we manage our online presence. Their real-time insights keep us ahead of the curve, and their support is unmatched." author="John Smith"/>
                <Review review="I can't recommend webmonitor enough! Their proactive alerts have saved us from many potential downtimes. The user space is intuitive and easy to navigate." author="Emily Johnson" />
                <Review review="Thanks to Webmonitor, we've been able to maintain our website with minimal issues. Their analytics have provided valuable insights into our online performance." author="Sarah Brown" />
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <HeroHome />
            <About />
            <Values />
            <Elevate />
            <WhyChoose />
            <Reviews />
            <CallToAction />
            <Footer />
        </>
    )
}