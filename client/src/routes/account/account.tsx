import { toast, Bounce, ToastContainer } from 'react-toastify';
import AppBar from '../../components/AppBar';
import AppFooter from '../../components/AppFooter';
import AppTitle from '../../components/AppTitle';
import WMButton from '../../components/WMButton';
import React from 'react'
import Swal from 'sweetalert2';
import { renderToStaticMarkup } from 'react-dom/server';

function ChangeUsername({currentUserName} : {currentUserName: string}) {

    const [userName, setUserName] = React.useState(currentUserName)
    const [userNameError, setUserNameError] = React.useState('')

    React.useEffect(() => {
        setUserName(currentUserName)
    }, [currentUserName])

    const changeUsername = async () => {
        const userNameRegex = /^[a-zA-Z0-9]+$/
        if(userNameRegex.test(userName)) {
            setUserNameError('')
            const response = await fetch('/user/changeuname', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    newUserName: userName
                })
            })
            const nameChangeRes = await response.json()

            if(nameChangeRes.rescode === 6001) {
                toast.error('Authentication Error', {
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
                localStorage.removeItem('auth_token')
                setTimeout(() => {
                    location.href = '/home'
                }, 1000)
            } else if(nameChangeRes.rescode === 6002) {
                toast.warn('Invalid Username', {
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
            } else if(nameChangeRes.rescode === 6003) {
                toast.warn('Username is already taken', {
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
            } else if(nameChangeRes.rescode === 6000) {
                toast.success('Username changed successfully!', {
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
            }
        } else {
            setUserNameError('Username should consist only of uppercase letters, lowercase letters, or digits. Spaces are not allowed.')
        }
    }

    return (
        <div className='text-left bg-white shadow-2xl p-4 flex flex-col gap-2'>
            <div className='text-3xl'>Username</div>
            <input className='border-1 border-[#A3A3A3] w-[80%] p-1 rounded-sm' type='text' placeholder='MyUsername123' value={userName} onChange={e => setUserName(e.target.value)} />
            <div className='text-sm text-red-500'>{userNameError}</div>
            <div className='w-full flex justify-center pt-4'>
                <WMButton text='Change Username' clickHandler={changeUsername} />
            </div>
        </div>
    )
}

function Email({email}: {email: {
    email: string,
    allowAlerts: boolean,
    allowMarketingMails: boolean,
    _id: string
}}) {

    function EmailPreferencesForm({email}: {email: {
        email: string,
        allowAlerts: boolean,
        allowMarketingMails: boolean,
        _id: string
    }}) {
        return (
            <div className='flex flex-col p-16 gap-6 min-md:min-w-[400px] max-md:p-6 text-left'>
                <h3 className='text-2xl'>Email Settings</h3>
                <p className='text-sm text-gray-500'>{email.email}</p>
                <form className='pl-4 pr-8 py-6 flex flex-col gap-6'>
                    <div className='flex items-center justify-between'>
                        <label className='text-sm' htmlFor='title'>Website Down</label>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" id='websiteDown' name='websiteDown' checked={Boolean(email.allowAlerts)} onChange={() => {}} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#00B4AB] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B4AB]"></div>
                        </label>
                    </div>
                    <div className='flex items-center justify-between'>
                        <label className='text-sm' htmlFor='title'>Marketing Emails</label>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" id='marketingEmails' name='marketingEmails' checked={Boolean(email.allowMarketingMails)} onChange={() => {}} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#00B4AB] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B4AB]"></div>
                        </label>
                    </div>
                </form>
            </div>
        )
    }

    const manageEmail = async (email: {
        email: string,
        allowAlerts: boolean,
        allowMarketingMails: boolean,
        _id: string
    }) => {
        const newEmailPreferences = await Swal.fire({
            html: renderToStaticMarkup(<EmailPreferencesForm email={email} />),
            showCloseButton: true,
            confirmButtonText: 'Change Preference',
            confirmButtonColor: '#00B4AB',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    websiteDown: (document.querySelector('#websiteDown') as HTMLInputElement)?.checked,
                    marketingEmails: (document.querySelector('#marketingEmails') as HTMLInputElement)?.checked,
                }
            },

            showDenyButton: false,
            denyButtonText: 'Delete Email'
        })

        if(newEmailPreferences.isConfirmed) {
            const eid = email._id
            const websiteDown = newEmailPreferences.value.websiteDown
            const marketingEmails = newEmailPreferences.value.marketingEmails

            const response = await fetch(`/user/changeemailpreference`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify({
                    emailId: eid,
                    allowAlerts: websiteDown,
                    allowMarketingMails: marketingEmails
                })
            })
            await response.json()
            window.location.reload()
        } else if(newEmailPreferences.isDenied) {
            const eid = email._id
            console.log("DELETE", eid)
            /* Redundant */
        }
    }

    return (
        <div className='flex items-center justify-start gap-1'>
            <input className='border-1 border-[#A3A3A3] w-[80%] p-1 rounded-sm' type='text' placeholder='MyUsername123' value={email.email ?? ''} onChange={e => {
                e.target.value = email.email
            }} />
            <button className='bg-[#00B4AB] p-[7px] rounded-sm'>
                <img src='/setting-icon.png' className='w-5' alt='Settings icon' onClick={() => manageEmail(email)} />
            </button>
        </div>
    )
}

function ManageEmail({emails}: {emails: [{
    email: string,
    allowAlerts: boolean,
    allowMarketingMails: boolean,
    _id: string
}]}) {

    return (
        <div className='text-left bg-white shadow-2xl p-4 pb-8 flex flex-col gap-2 my-15'>
            <div className='text-3xl'>Manage Account</div>
            {
                emails.map((email, index) => {
                    return <Email email={email} key={index} />
                })
            }
            <div className='w-full flex justify-center pt-4'>
                <WMButton text='Logout' clickHandler={() => {
                    localStorage.removeItem('auth_token')
                    location.href = '/login'
                }} />
            </div>
        </div>
    )
}

function DeleteAccount() {
    return (
        <div>
            <div className='text-left bg-white shadow-2xl p-4 flex flex-col gap-2 my-15'>
                <div className='text-3xl'>Delete Account</div>
                <div className='text-sm text-red-500'>This action is irreversible. Please proceed with caution.</div>
                <div className='w-full flex justify-center pt-4'>
                    <button className='bg-[#E51348] p-2 rounded-sm flex items-center gap-2 text-white' onClick={async () => {
                        const result = await Swal.fire({
                            title: 'Are you sure?',
                            html: "Are you sure you want to delete your account? This action is permanent and will erase all your data, settings, and access to associated services.<br /><br /> Type <b>Yes</b> below to confirm.",
                            icon: 'warning',
                            input: 'text',
                            showCancelButton: true,
                            confirmButtonColor: '#FF4D4D',
                            cancelButtonColor: '#00B4AB',
                            confirmButtonText: 'Delete Account',
                            cancelButtonText: 'Cancel'
                        })

                        if(result.isConfirmed && result.value === 'Yes') {
                            const response = await fetch('/user/deleteaccount', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                                }
                            })
                            const deleteAccountRes = await response.json()
                            console.log(deleteAccountRes)
                            if(deleteAccountRes.rescode === 6001) {
                                toast.error('Authentication Error', {
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
                                localStorage.removeItem('auth_token')
                                setTimeout(() => {
                                    location.href = '/home'
                                }, 1000)
                            } else if(deleteAccountRes.rescode === 6000) {
                                toast.success('Account deleted successfully!', {
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
                                localStorage.removeItem('auth_token')
                                setTimeout(() => {
                                    location.href = '/home'
                                }, 1000)
                            } else if(deleteAccountRes.rescode === 6002) {
                                toast.error('Error deleting account', {
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
                                localStorage.removeItem('auth_token')
                                setTimeout(() => {
                                    location.href = '/home'
                                }, 1000)
                            }
                        } else {
                            toast.info('Account deletion cancelled', {
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
                        }
                    }}>
                        <img src='/delete-icon.png' className='w-5' alt='Delete icon' />
                        <span>Delete Account</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

function AccountManagement() {
    const [userName, setUserName] = React.useState('MyUsername123')
    const [emails, setEmails] = React.useState([{}])

    React.useEffect(() => {
        (async () => {
            try{
                const userDataResponse = await fetch(`/userinfo`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                    }
                })
                const userData = await userDataResponse.json()
                if(userData.success) {
                    setUserName(userData.userData.userName)
                    setEmails(userData.userData.emails)
                }
            } catch(err) {
                console.log(err)
            }
        })()
    }, [])

    return (
        <div className='max-w-120 mx-auto mt-20 text-center'>
            <ChangeUsername currentUserName={userName} />               
            <ManageEmail emails={emails as [{
                email: string,
                allowAlerts: boolean,
                allowMarketingMails: boolean,
                _id: string
            }]} />
            <DeleteAccount />
        </div>
    )
}

export default function Account() {
    React.useEffect(() => {
        if(!localStorage.getItem('auth_token')) {
            location.href = '/login'
        }
    })
    return (
        <>
            <AppBar />
            <AppTitle title='Account' />
            <AccountManagement />
            <AppFooter />
            <ToastContainer />
        </>
    )
}