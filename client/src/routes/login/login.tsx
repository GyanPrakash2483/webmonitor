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

function LoginMain() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')

    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

    const emailErrorMessage = 'Not a valid email address.'
    const passwordErrorMessage = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-).'

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Validate Input
        let isInputValid = true

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

        if(!isInputValid) {
            return;
        }

        // Input is valid, proceed with registration
        const request = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const response: {
            success: boolean,
            rescode: number,
            message: string,
            auth_token?: string
        } = await request.json()

        if(response.rescode === 6001) {
            toast.error('Input Format Error', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            })
        } else if(response.rescode === 6002) {
            toast.warn('Account not found, try logging in', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })
        } else if(response.rescode === 6003) {
            toast.warn('Use Google SignIn or press forgot password to set a password.', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        } else if(response.rescode === 6004) {
            toast.error('Incorrect Password', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })
        } else if(response.rescode === 6005) {
            toast.warn('Internal server error, please report this incident', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })
        } else if(response.rescode === 6006) {
            toast.warn('Please verify your email, check your mailbox for verification link.', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })
        } else if(response.rescode === 6000) {
            toast.success('Logged In', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            })
            localStorage.setItem('auth_token', response.auth_token ?? '')

            setTimeout(function() {
                location.href = '/dashboard'
            }, 3000)
        }

    }

    const googleAuthStrategy = () => {
        location.href = '/auth/google'
    }

    return (
        <div className="bg-[#F5F5F5] max-w-[400px] mx-auto my-20 py-10 shadow-2xl">
            <form className="py-6 px-10 flex flex-col gap-6 items-center" onSubmit={handleLoginSubmit}>
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
                <div className="w-full">
                <a href="/forgotpassword" className="text-blue-500">Forgot Password?</a>
                </div>
                <WMButton text="Login" />
            </form>

            <div className="flex flex-col items-center justify-center gap-8">
                <span className="text-xs text-[#8C8C8C]">OR</span>
                <div className="flex justify-around items-center gap-4 bg-white border-[#D4D4D4] border-1 p-2 px-8 rounded-3xl cursor-pointer w-[80%] hover:shadow-xl" onClick={googleAuthStrategy}>
                    <img src="/google-logo.png" alt="Google Icon" />
                    Continue with Google
                </div>
                <a href="/register" className="text-blue-500">Don't have an account?</a>
            </div>

        </div>
    )
}

export default function Login() {
    return (
        <>
            <AppBar />
            <AppTitle title="Login" />
            <LoginMain />
            <AppFooter />
            <ToastContainer />
        </>
    )
}