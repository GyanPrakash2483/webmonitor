import React from "react";
import AppBar from "../../components/AppBar";
import AppFooter from "../../components/AppFooter";
import AppTitle from "../../components/AppTitle";
import WMButton from "../../components/WMButton";

function RegisterMain() {

    const [userName, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

        }

    return (
        <div className="bg-[#F5F5F5] max-w-[400px] mx-auto my-20 py-10 shadow-2xl">
            <form className="py-6 px-10 flex flex-col gap-6 items-center" onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="userName">Name</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="text" name="userName" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="password">Password</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="password" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <p className="text-sm text-[#535353]">By clicking Register, you agree to our <a className="text-blue-500" href="/pages/terms-of-service">terms of service</a> and <a className="text-blue-500" href="/pages/privacy-policy">privacy policy</a>.</p>
                <WMButton text="Register" />
            </form>

            <div className="flex flex-col items-center justify-center gap-8">
                <span className="text-xs text-[#8C8C8C]">OR</span>
                <div className="flex justify-around items-center gap-4 bg-white border-[#D4D4D4] border-1 p-2 px-8 rounded-3xl cursor-pointer w-[80%]">
                    <img src="/google-logo.png" alt="Google Icon" />
                    Continue with Google
                </div>
            </div>

        </div>
    )
}

export default function Register() {
    return (
        <>
            <AppBar />
            <AppTitle title="Register" />
            <RegisterMain />
            <AppFooter />
        </>
    )
}