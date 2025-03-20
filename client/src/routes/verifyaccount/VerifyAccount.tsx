import React from "react"
import AppBar from "../../components/AppBar"
import AppFooter from "../../components/AppFooter"
import WMButton from "../../components/WMButton"

function Verifying() {
    return (
        <div className="flex flex-col items-center justify-around gap-8 py-10 px-30 shadow-2xl rounded-xl mx-2 bg-[#FFFFFF] max-md:px-10">
            <span className="text-3xl text-[#00B4AB] text-center font-bold">Verifying...</span>
            <p className="text-[#666666] text-center">Please wait while your account is getting verified.</p>
        </div>
    )
}

function VerifiedSuccessfully() {
    React.useEffect(() => {
        setTimeout(() => {
            location.href = '/login'
        }, 3000)
    })

    return (
        <div className="flex flex-col items-center justify-around gap-8 py-10 px-30 shadow-2xl rounded-xl mx-2 bg-[#FFFFFF] max-md:px-10">
            <span className="text-3xl text-[#00B4AB] text-center font-bold">Account Verified</span>
            <p className="text-[#666666] text-center">Redirecting to login...</p>
            <div className="flex gap-24 mt-10">
                <WMButton text="HOME" clickHandler={() => {
                    location.href = '/home'
                }} />
                <WMButton text="LOGIN" clickHandler={() => {
                    location.href = '/login'
                }}/>
            </div>
        </div>
    )
}

function VerificationFailed() {
    React.useEffect(() => {
        setTimeout(() => {
            location.href = '/home'
        }, 3000)
    })
    return (
        <div className="flex flex-col items-center justify-around gap-8 py-10 px-30 shadow-2xl rounded-xl mx-2 bg-[#FFFFFF] max-md:px-10">
            <span className="text-3xl text-red-400 text-center font-bold">Account Verification Failed</span>
            <p className="text-[#666666] text-center">Redirecting to home page...</p>
            <div className="flex gap-24 mt-10">
                <WMButton text="HOME" clickHandler={() => {
                    location.href = '/home'
                }} />
                <WMButton text="GET STARTED" clickHandler={() => {
                    location.href = '/dashboard'
                }}/>
            </div>
        </div>
    )
}

function Verification() {

    const VerificationState = {
        VERIFYING: 0,
        SUCCESSFUL: 1,
        FAILED: 2
    }

    const [verificationState, setVerificationState] = React.useState(VerificationState.VERIFYING)
    
    React.useEffect(() => {
        (async () => {
            const urlParams = new URLSearchParams(location.search)
            const uid = urlParams.get('uid')

            if(!uid) {
                setVerificationState(VerificationState.FAILED)
                return
            }

            const verifyreq = await fetch('/verifyaccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid
                })
            })

            const response = await verifyreq.json()
            
            if(response.success) {
                setVerificationState(VerificationState.SUCCESSFUL)
            } else {
                setVerificationState(VerificationState.FAILED)
            }

        })()
    })

    return (
        <div className="flex items-center justify-center h-[80vh]">
            { verificationState === VerificationState.VERIFYING && <Verifying /> }
            { verificationState === VerificationState.SUCCESSFUL && <VerifiedSuccessfully /> }
            { verificationState === VerificationState.FAILED && <VerificationFailed /> }
        </div>
    )

}

export default function VerifyAccount() {
    return (
        <>
            <AppBar />
            <Verification />
            <AppFooter />
        </>
    )
}