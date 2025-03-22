import AppBar from '../../components/AppBar'
import AppFooter from '../../components/AppFooter'
import AppTitle from '../../components/AppTitle'
import WMButton from '../../components/WMButton'
import React from 'react'
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

function ForgotPasswordMain() {

    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')

    const forgotPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        const emailErrorMessage = 'Not a valid email address.'

        if(emailRegex.test(email)) {
            setEmailError('')
        } else {
            setEmailError(emailErrorMessage)
            return
        }

        const response = await(await fetch('/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })).json()

        if(response.rescode === 6001) {
            toast.error('Invalid Email', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        } else if(response.rescode === 6002) {
            toast.warn('Unregistered Email', {
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
        } else if(response.rescode === 6003) {
            toast.error('Internal server error, please report this incident.', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        } else if(response.rescode === 6000) {
            toast.success('Check your email to reset the password.', {
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
        }

    }

    return (
            <div className="bg-[#F5F5F5] max-w-[400px] mx-auto my-20 py-10 shadow-2xl">
                <form className="py-6 px-10 flex flex-col gap-6 items-center" onSubmit={forgotPasswordSubmit}>
                    <div className="flex flex-col w-full">
                        <label className="text-sm" htmlFor="email">Email</label>
                        <input className="outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3] bg-white" type="text" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputError error={emailError} />
                    </div>
                    <WMButton text="RESET PASSWORD" />
                </form>
            </div>
        )
}

export default function ForgotPassword() {
    return (
        <>
            <AppBar />
            <AppTitle title="Forgot Password" />
            <ForgotPasswordMain />
            <AppFooter />
            <ToastContainer />
        </>
    )
}