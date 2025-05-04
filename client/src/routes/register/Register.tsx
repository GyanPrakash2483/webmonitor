import React from 'react'
import AppBar from '../../components/AppBar'
import AppFooter from '../../components/AppFooter'
import AppTitle from '../../components/AppTitle'
import WMButton from '../../components/WMButton'
import { ToastContainer, toast, Bounce } from 'react-toastify'

function InputError(props: {
    error: string | null
}) {
    return (
        <div className="text-sm text-red-500">
            {props.error && props.error}
        </div>
    )
}

function RegisterMain() {

    const [userName, setUserName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [userNameError, setUsernameError] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('')

    const userNameRegex = /^[a-zA-Z0-9]+$/
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

    const userNameErrorMessage = 'Username should consist only of uppercase letters, lowercase letters, or digits. Spaces are not allowed.'
    const emailErrorMessage = 'Not a valid email address.'
    const passwordErrorMessage = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-).'
    const confirmPasswordErrorMessage = 'Password does not match.'

    const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Validate Input
        let isInputValid = true
        if(userNameRegex.test(userName)) {
            setUsernameError('')
        } else {
            setUsernameError(userNameErrorMessage)
            isInputValid = false
        }

        if(emailRegex.test(email)) {
            setEmailError('')
        } else {
            setEmailError(emailErrorMessage)
            isInputValid = false
        }

        if(passwordRegex.test(password)) {
            setPasswordError('')
        } else {
            setPasswordError(passwordErrorMessage)
            isInputValid = false
        }

        if(password == confirmPassword) {
            setConfirmPasswordError('')
        } else {
            setConfirmPasswordError(confirmPasswordErrorMessage)
            isInputValid = false
        }

        if(!isInputValid) {
            return;
        }

        // Input is valid, proceed with registration
        const request = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName,
                email,
                password
            })
        })
        const response: {
            success: boolean,
            rescode: number,
            message: string
        } = await request.json()

        /**
         * 
         * | Rescode      | Description                                            |
         * | ------------ | ------------------------------------------------------ |
         * | 6000         | Account Creation Successful, proceed for verification  |
         * | 6001         | Input Format Error                                     |
         * | 6002         | Username Already Exists                                |
         * | 6003         | Email Already Registered, try logging in               |
         * | 6004         | Unknown Server Error                                   |
         * 
         */

        if(!response.rescode || response.rescode == 6004) {
            toast.error('Unknown Server error, please report this incident', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } else if(response.rescode == 6003) {
            toast.warn('Email already registered, please try logging in', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else if(response.rescode == 6002) {
            toast.warn('Username taken, please select another username', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else if(response.rescode == 6001) {
            toast.warn('Input Format Error - suspected client modification', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else if(response.rescode == 6000) {
            toast.success('Registration successful, please check your email.', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

    }

    const googleAuthStrategy = () => {
        location.href = '/auth/google'
    }

    return (
        <div className="bg-[#F5F5F5] max-w-[400px] mx-auto my-20 py-10 shadow-2xl">
            <form className="py-6 px-10 flex flex-col gap-6 items-center" onSubmit={handleRegisterSubmit}>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="userName">Name</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="text" name="userName" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <InputError error={userNameError} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="email">Email</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputError error={emailError} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="password">Password</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputError error={passwordError} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="password" name="confirmPassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <InputError error={confirmPasswordError} />
                </div>
                <p className="text-sm text-[#535353]">By clicking Register, you agree to our <a className="text-blue-500" href="/pages/terms-of-service">terms of service</a> and <a className="text-blue-500" href="/pages/privacy-policy">privacy policy</a>.</p>
                <WMButton text="Register" />
            </form>

            <div className="flex flex-col items-center justify-center gap-8">
                <span className="text-xs text-[#8C8C8C]">OR</span>
                <div className="flex justify-around items-center gap-4 bg-white border-[#D4D4D4] border-1 p-2 px-8 rounded-3xl cursor-pointer w-[80%] hover:shadow-xl" onClick={googleAuthStrategy}>
                    <img src="/google-logo.png" alt="Google Icon" />
                    Continue with Google
                </div>
                <a href="/login" className="text-blue-500">Already have an account?</a>
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
            <ToastContainer />
        </>
    )
}