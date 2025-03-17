import CallToAction from "../../components/CallToAction"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"

function HeroPrivacyPolicy() {
    return (
        <div className="bg-[url('/privacy-policy-bg.webp')] bg-cover h-[400px] flex flex-col items-center">
            <Navbar />
        </div>
    )
}

function Content() {
    return (
        <div className="max-w-[800px] mx-auto bg-[#F3FFFB] shadow-2xl p-10 max-md:p-4 -mt-60">
            <h1 className="text-4xl mb-10 text-[#2E2E2E]">Webmonitor Privacy Policy</h1>
            <p className="text-[#2E2E2E] my-6">Last Updated: 17th March, 2025 <br />
            Webmonitor ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our service.</p>
            
            <h2 className="text-2xl text-[#2E2E2E]">Information We Collect</h2>
            <p className="text-[#2E2E2E] my-6">When you use Webmonitor, we may collect the following information:</p>
            <ul className="list-disc">
                <li><p className="text-[#2E2E2E] my-6"><strong>Account Information:</strong> Email address, password (if applicable), and Google login details if you choose to sign in via Google.</p></li>
                <li><p className="text-[#2E2E2E] my-6"><strong>Website Monitoring Data:</strong> URLs of websites you choose to monitor and associated uptime status.</p></li>
                <li><p className="text-[#2E2E2E] my-6"><strong>Communication Data:</strong> Email addresses used for notifications and service-related messages.</p></li>
            </ul>
            
            <h2 className="text-2xl text-[#2E2E2E]">How We Use Your Information</h2>
            <p className="text-[#2E2E2E] my-6">We use your information for the following purposes:</p>
            <ul className="list-disc">
                <li><p className="text-[#2E2E2E] my-6">To create and manage your account.</p></li>
                <li><p className="text-[#2E2E2E] my-6">To monitor the uptime of websites you select.</p></li>
                <li><p className="text-[#2E2E2E] my-6">To send email notifications when a monitored website is detected as down.</p></li>
                <li><p className="text-[#2E2E2E] my-6">To improve and secure our services.</p></li>
            </ul>
            
            <h2 className="text-2xl text-[#2E2E2E]">Data Storage and Security</h2>
            <ul className="list-disc">
                <li><p className="text-[#2E2E2E] my-6">We take reasonable security measures to protect your data from unauthorized access or misuse.</p></li>
                <li><p className="text-[#2E2E2E] my-6">Passwords are securely stored using encryption and are never shared.</p></li>
                <li><p className="text-[#2E2E2E] my-6">We do not sell or share your personal data with third parties.</p></li>
            </ul>

            <h2 className="text-2xl text-[#2E2E2E]">Third-Party Services</h2>
            <ul className="list-disc">
                <li><p className="text-[#2E2E2E] my-6">Webmonitor may use third-party services (such as email providers) to send notifications.</p></li>
                <li><p className="text-[#2E2E2E] my-6">We do not share your personal data beyond what is necessary to operate our service.</p></li>
            </ul>

            <h2 className="text-2xl text-[#2E2E2E]">Your Rights and Choices</h2>
            <ul className="list-disc">
                <li><p className="text-[#2E2E2E] my-6">You may update or delete your account at any time.</p></li>
                <li><p className="text-[#2E2E2E] my-6">You can opt out of notifications by adjusting your settings.</p></li>
            </ul>
            
            <h2 className="text-2xl text-[#2E2E2E]">Data Retention</h2>
            <p className="text-[#2E2E2E] my-6">We retain your data as long as your account is active. Upon account deletion, we remove your associated data from our systems.</p>

            <h2 className="text-2xl text-[#2E2E2E]">Changes to This Policy</h2>
            <p className="text-[#2E2E2E] my-6">We may update this Privacy Policy periodically. Continued use of Webmonitor after updates means you accept the revised policy.</p>

            <h2 className="text-2xl text-[#2E2E2E]">Contact Us</h2>
            <p className="text-[#2E2E2E] my-6">If you have any questions about this Policy, please contact us at <a href="mailto:gyanprakash2483@gmail.com">gyanprakash2483@gmail.com</a>.</p>

        </div>
    )
}

export default function PrivacyPolicy() {
    return (
        <>
            <div className="bg-white">
                <HeroPrivacyPolicy />
                <Content />
                <CallToAction />
                <Footer />
            </div>
        </>
    )
}