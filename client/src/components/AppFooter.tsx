import Footer from "./Footer";

export default function AppFooter() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <div className="flex py-4 gap-3 font-medium text-sm">
                    <a href="/home" className="hover:text-[#00B4AB]">Webmonitor</a>
                    |
                    <a href="/pages/terms-of-service" className="hover:text-[#00B4AB]">Terms of Service</a>
                    |
                    <a href="/pages/privacy-policy" className="hover:text-[#00B4AB]">Privacy Policy</a>
                </div>
            </div>
            <Footer />
        </div>
    )
}