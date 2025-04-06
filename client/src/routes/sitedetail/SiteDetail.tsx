import AppBar from '../../components/AppBar'
import AppFooter from '../../components/AppFooter'
import React from 'react'
import { CartesianGrid, LabelList, Legend, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useSearchParams } from 'react-router'

const MemoizedPieChart = React.memo(({ uptime }: {
    uptime: number
}) => (
    <PieChart width={500} height={300}>
      <Pie
        cx='50%'
        cy='50%'
        data={[
          { name: 'Up', value: uptime, fill: '#3CFF60', stroke: '#29D849' },
          { name: 'Down', value: 100 - uptime, fill: '#FA8080', stroke: '#F82D2D' }
        ]}
        dataKey='value'
      >
        <LabelList dataKey='name' position='outside' />
      </Pie>
      <Tooltip />
    </PieChart>
));

const MemoizedLineChart = React.memo(({ uptimeData }: {
    uptimeData: [object]
}) => {

    const data = uptimeData
    return (
            <LineChart width={window.innerWidth - 30} height={400} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='latency' stroke='#00aae8' />
            </LineChart>
        )
})

function SiteInfo() {

    const [url, setUrl] = React.useState('Loading...')
    const [title, setTitle] = React.useState('Loading...')
    const [uptime, setUptime] = React.useState(0)
    const [uptimeData, setUptimeData] = React.useState([{}])
    const [online, setOnline] = React.useState(false)
    const [latency, setLatency] = React.useState(-1)

    const [searchParams] = useSearchParams()
    const siteid = searchParams.get('siteid')

    React.useEffect(() => {
        (async () => {
            const response = await fetch(`/siteinfo/${siteid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                }
            })
            const siteinfo = await response.json()
            const sitedata = siteinfo.sitedata
            setUrl(sitedata.site)
            setTitle(sitedata.title)
            setUptime(sitedata.uptime)
            setUptimeData(sitedata.uptimeData)
            setOnline(sitedata.uptimeData.at(-1).up)
            setLatency(sitedata.uptimeData.at(-1).latency)
        })()
    }, [siteid])
    
    return (
        <div className='p-4'>
            <div className='flex w-full justify-between items-center max-md:flex-col'>
                <div>
                    <div className='text-4xl'>{title}</div>
                    <div className='text-sm p-2 text-gray-600'><a href={url} target='_blank' rel='noopener noreferrer'>{url}</a></div>
                    <div className='px-2'>Online: {
                            online ? <span className='bg-green-600 text-white p-1 px-2 rounded-sm'>Yes</span> : <span className='bg-red-600 text-white p-1 px-2 rounded-sm'>No</span>
                        }
                    </div>
                    <div className='p-2'>Latency: { latency === -1 ? ' ... ' : latency} ms</div>
                </div>
                <div>
                    <MemoizedPieChart uptime={uptime} />
                </div>
                <div>
                    {/** For spacing */}
                </div>
            </div>
            <div>
                <div className='text-3xl p-8'>Latency Over time</div>
                <MemoizedLineChart uptimeData={uptimeData as [object]} />
            </div>
        </div>
    )
}

export default function SiteDetail() {
    return (
        <>
            <AppBar />
            <SiteInfo />
            <AppFooter />
        </>
    )
}