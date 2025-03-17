import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

function HeroTOS() {
    return (
        <div className="bg-[url('/terms-of-service-bg.webp')] bg-cover h-[400px] flex flex-col items-center">
            <Navbar />
        </div>
    )
}

function Content() {
    return (
        <div className="max-w-[800px] mx-auto bg-[#F3FFFB] shadow-2xl p-10 max-md:p-4 -mt-60">
            <h1 className="text-4xl mb-10 text-[#2E2E2E]">Webmonitor Terms of Service</h1>
            <p className="text-[#2E2E2E] my-6">Last Updated: 17th March, 2025 <br />
                                Welcome to Webmonitor! By using our service, you agree to the following Terms of Service. Please read them carefully before creating an account.</p>
            
            <h2 className="text-2xl text-[#2E2E2E]">Acceptance of Terms</h2>
            <p className="text-[#2E2E2E] my-6">By registering an account or using Webmonitor, you agree to comply with these Terms of Service. If you do not agree, please do not use the service.</p>
            
            <h2 className="text-2xl text-[#2E2E2E]">Description of Service</h2>
            <p className="text-[#2E2E2E] my-6">Webmonitor is a free service that monitors the uptime of websites and notifies users via email if a monitored site is down.</p>
 
            
            <h2 className="text-2xl text-[#2E2E2E]">User Accounts</h2>
            <ol>
                <li><p className="text-[#2E2E2E] my-6">Users must create an account using an email and password or sign in with Google.</p></li>
                <li><p className="text-[#2E2E2E] my-6">You are responsible for maintaining the security of your account and notifying us of any unauthorized use.</p></li>
            </ol>

            <h2 className="text-2xl text-[#2E2E2E]">Website Monitoring</h2>
            <ol>
                <li><p className="text-[#2E2E2E] my-6">Users can monitor any website.</p></li>
                <li><p className="text-[#2E2E2E] my-6">Webmonitor provides notifications based on detected downtime, but we do not guarantee accuracy or real-time reporting.</p></li>
            </ol>

            <h2 className="text-2xl text-[#2E2E2E]">Limitations of Liability</h2>
            <ol>
                <li><p className="text-[#2E2E2E] my-6">We are not responsible for incorrect or delayed monitoring results.</p></li>
                <li><p className="text-[#2E2E2E] my-6">Webmonitor is provided "as is" without warranties of any kind.</p></li>
                <li><p className="text-[#2E2E2E] my-6">We are not liable for any damages, losses, or issues arising from reliance on our service.</p></li>
            </ol>
            
            <h2 className="text-2xl text-[#2E2E2E]">User Conduct and Restrictions</h2>
            <ol>
                <li><p className="text-[#2E2E2E] my-6">Users must not use Webmonitor for unlawful purposes or in a way that disrupts the service for others.</p></li>
                <li><p className="text-[#2E2E2E] my-6">We reserve the right to suspend or terminate accounts that violate these terms.</p></li>
            </ol>

            <h2 className="text-2xl text-[#2E2E2E]">Notifications and Emails</h2>
            <ol>
                <li><p className="text-[#2E2E2E] my-6">Webmonitor sends email notifications when a monitored site is detected as down.</p></li>
                <li><p className="text-[#2E2E2E] my-6">We are not responsible for undelivered or delayed emails.</p></li>
            </ol>

            <h2 className="text-2xl text-[#2E2E2E]">Termination of Service</h2>
            <p className="text-[#2E2E2E] my-6">We reserve the right to suspend, terminate, or ban users at our discretion, particularly in cases of misuse or abuse of the service.</p>

            <h2 className="text-2xl text-[#2E2E2E]">Changes to Terms</h2>
            <p className="text-[#2E2E2E] my-6">Webmonitor may update these Terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>

            <h2 className="text-2xl text-[#2E2E2E]">Contact Information</h2>
            <p className="text-[#2E2E2E] my-6">If you have any questions about these Terms, please contact us at <a href="mailto:gyanprakash2483@gmail.com">gyanprakash2483@gmail.com</a>.</p>

        </div>
    )
}

export default function TermsOfService() {
    return (
        <>
            <div className="bg-white">
                <HeroTOS />
                <Content />
                <CallToAction />
                <Footer />
            </div>
        </>
    )
}