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

function ResetPasswordMain() {

    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const [passwordError, setPasswordError] = React.useState('')
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('')

    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

    const passwordErrorMessage = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-).'
    const confirmPasswordErrorMessage = 'Password does not match.'

    const resetPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let isInputValid = true

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

        const urlParams = new URLSearchParams(location.search)
        const email = urlParams.get('email')
        const resetToken = urlParams.get('reset_token')

        const response = await(await fetch('http://localhost:3000/resetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                resetToken,
                password
            })
        })).json()

        console.log(response)

        if(response.rescode === 6001 || response.rescode === 6002 || response.rescode === 6003) {
            toast.error('Invalid Token, Please contact support', {
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
        } else if(response.rescode === 6004) {
            toast.error('Internal server error, please report this incident, ', {
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
        } else if(response.rescode === 6000) {
            toast.success('Password reset successfully', {
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

            setTimeout(() => {
                location.href = '/login'
            }, 3000)
        }

    }

    return (
            <div className="bg-[#F5F5F5] max-w-[400px] mx-auto my-20 py-10 shadow-2xl">
                <form className="py-6 px-10 flex flex-col gap-6 items-center" onSubmit={resetPasswordSubmit}>
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
                    <WMButton text="RESET" />
                </form>
            </div>
        )
}

export default function ResetPassword() {
    return (
        <>
            <AppBar />
            <AppTitle title="Reset Password" />
            <ResetPasswordMain />
            <AppFooter />
            <ToastContainer />
        </>
    )
}