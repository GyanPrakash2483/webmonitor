export default function AppBar() {
    return (
        <div className="bg-[url('/teal-bg.png')] flex justify-around items-center min-md:justify-between min-md:px-20 py-3">
            <a href="/home" className="text-4xl text-white">Webmonitor</a>
            <div className="flex justify-around items-center gap-7">
                <a href="/dashboard">
                    <img src="/dashboard-icon.png" alt="dashboard button" />
                </a>
                <a href="/account">
                    <img src="/account-icon.png" alt="account button" />
                </a>
            </div>
        </div>
    )
}