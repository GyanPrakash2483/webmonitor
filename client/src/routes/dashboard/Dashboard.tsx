import React from 'react'
import AppBar from '../../components/AppBar'
import AppFooter from '../../components/AppFooter'
import AppTitle from '../../components/AppTitle'
import WMButton from '../../components/WMButton'
import { LabelList, Pie, PieChart, Tooltip } from 'recharts'
import { renderToStaticMarkup } from 'react-dom/server'
import { toast, Bounce, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'

function SiteCard(props: {
    id: string
}) {
    
    const siteid = props.id

    const [title, setTitle] = React.useState('Loading...')
    const [url, setUrl] = React.useState('Loading...')
    const [latency, setLatency] = React.useState(-1)
    const [uptime, setUptime] = React.useState(0)

    React.useEffect(() => {
        (async () => {
            const response = await(await fetch(`http://localhost:3000/site/${siteid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            })).json()

            const siteinfo = response.siteData

            setTitle(siteinfo.title)
            setUrl(siteinfo.site)
            setLatency(4)
            setUptime(siteinfo.uptime)
        })()
    })

    return (
        <div className='max-w-[480px] flex p-6 pb-0 pr-0 mx-auto bg-white shadow-xl my-8 justify-around overflow-visible'>
            <div className='text-left'>
                <div className='text-2xl'>{title}</div>
                <div className='text-sm text-[#888888]'>{url}</div>
                <div className='my-2'>Latency: {latency === -1 ? '...' : latency}ms</div>
                <WMButton text='Details' />
            </div>
            <div className='w-[60%] -mt-4 flex justify-end items-center] overflow-visible'>
                <PieChart width={250} height={200} >
                    <Pie
                        cx='50%'
                        cy='50%'
                        data={[
                            {
                                name: 'Up',
                                value: uptime,
                                fill: '#3CFF60',
                                stroke: '#29D849',
                            },
                            {
                                name: 'Down',
                                value: 100 - uptime,
                                fill: '#FA8080',
                                stroke: '#F82D2D',
                            }
                        ]}
                        dataKey='value'
                    >
                    <LabelList dataKey='name' position='outside' />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </div>
        </div>
    )
}

function Sites() {

    function AddSiteForm() {
        return (
            <div className='flex flex-col p-16 gap-6 min-md:min-w-[400px] max-md:p-6 text-left'>
                <h3 className='text-2xl'>Add New Site</h3>
                <form className='pl-4 pr-8 py-6 flex flex-col gap-6'>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor='site'>URL</label>
                        <input className='outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3]' type='url' id='site' name='site' required placeholder='https://myawesomesite.com' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor='title'>Title</label>
                        <input className='outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3]' type='text' id='title' name='title' required />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor='title'>Check Every (minutes)</label>
                        <input className='outline-none text-[#333333] p-1 border-[1px] rounded-[4px] border-[#A3A3A3]' type='text' inputMode='numeric' id='checkInterval' name='checkInterval' defaultValue='60' required placeholder='60' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-sm' htmlFor='title'>Alert If Down</label>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input type="checkbox" className="sr-only peer" id='alertIfDown' name='alertIfDown' checked onChange={() => {}} />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#00B4AB] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00B4AB]"></div>
                        </label>
                    </div>
                </form>
            </div>
        )
    }

    const addNewSite = async () => {
        const newSiteValues = await Swal.fire({
            html: renderToStaticMarkup(<AddSiteForm />),
            showCloseButton: true,
            confirmButtonText: 'Add Site',
            confirmButtonColor: '#00B4AB',
            focusConfirm: false,
            preConfirm: () => {
                return {
                    site: (document.querySelector('#site') as HTMLInputElement)?.value,
                    title: (document.querySelector('#title') as HTMLInputElement)?.value,
                    checkInterval: (document.querySelector('#checkInterval') as HTMLInputElement)?.value,
                    alertIfDown: (document.querySelector('#alertIfDown') as HTMLInputElement)?.checked,
                }
            }
        })

        if(newSiteValues.isConfirmed) {
            const data = newSiteValues.value
            const response = await (await fetch('http://localhost:3000/site', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                },
                body: JSON.stringify(data)
            })).json()
            if(response.rescode === 6000) {
                toast.success('Site added successfully', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce
                })
                setTimeout(() => {
                    location.reload()
                }, 3000)
            } else if(response.rescode === 6001) {
                toast.error('Authentication Error', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce
                })
                setTimeout(() => {
                    localStorage.removeItem('auth_token')
                    location.href = '/login'
                }, 3000)
            } else if(response.rescode === 6002) {
                toast.error('Internal server error, please report this incident.', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce
                })
            } else if(response.rescode === 6003) {
                toast.warn('This site is already being monitored.', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce
                })
            } else {
                toast.error('Network Error', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce
                })
            }
        }
    }

    const [sites, setSites] = React.useState([])

    React.useEffect(() => {
        (async () => {
            const res = await (await fetch('http://localhost:3000/site', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            })).json()
            
            setSites(res.sites)
        })()
    }, [])

    return (
        <div className='text-center  min-h-[60vh]'>
            {sites.map((siteid, index) => {
                return <SiteCard id={siteid} key={index} />
            })}
            <WMButton text='Add New' clickHandler={addNewSite} />
        </div>
    )
}

export default function Dashboard() {
    React.useEffect(() => {
        if(!localStorage.getItem('auth_token')) {
            location.href = '/login'
        }
    })
    return (
        <>
            <AppBar />
            <AppTitle title='Sites' />
            <Sites />
            <ToastContainer />
            <AppFooter />
        </>
    )
}