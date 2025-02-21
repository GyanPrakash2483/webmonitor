import React from "react"
import CallToAction from "../../components/CallToAction"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import WMButton from "../../components/WMButton"

function HeroContact() {
    return (
        <div className="bg-[url('/computer_desk.png')] h-[300px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-0 md:text-4xl md:font-bold">Get in Touch with Us</h1>
        </div>
    )
}

function ContactInfo() {
    return (
        <div className="mt-50 flex flex-col gap-6 justify-start max-md:px-4">
            <h2 className="text-3xl mb-6">We're here to Assist You</h2>
            <p>Reach out for any inquiries. Our team is ready to help.</p>
            <p>Email: <a href="mailto:gyanprakash2483@gmail.com">gyanprakash2483@gmail.com</a></p>
        </div>
    )
}

function ContactForm() {

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = {
            name,
            email,
            message
        }

        console.log(data) // Update after backend is made
    }

    return (
        <div className="bg-white shadow-2xl flex flex-col p-16 gap-6 min-md:min-w-[500px] max-md:p-6">
            <span className="text-[#00B4AB]">SAY HI!</span>
            <h3 className="text-2xl">Fill Out the Form Below</h3>
            <form className="pl-4 pr-8 py-6 flex flex-col gap-6" onSubmit={handleContactSubmit}>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="name">Your Name</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3]" type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="email">Your Email</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3]" type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm" htmlFor="message">Your Message</label>
                    <textarea className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] h-30" name="message" required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                <p className="text-sm text-[#535353]">Do not share any sensitive information with this form.</p>
                <WMButton text="SEND" />
            </form>
        </div>
    )
}

function ContactContainer() {
    return (
        <div className="flex max-md:flex-col justify-around items-center -mt-24 mb-20 max-md:gap-12 px-4">
            <ContactInfo />
            <ContactForm />
        </div>
    )
}

export default function Contact() {
    return (
        <>
            <HeroContact />
            <ContactContainer />
            <CallToAction />   
            <Footer />
        </>
    )
}