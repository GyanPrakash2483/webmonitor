import Site from "../models/SiteSchema.js";

let run = 0

async function pingURL(url) {
    try {
        const t1 = Date.now()
        const res = await fetch(url)
        const t2 = Date.now()

        if(res.status !== 200) {
            return -1
        } else {
            return (t2 - t1)
        }
    } catch(err) {
        console.log(err)
        return -1
    }
}

setInterval(async () => {
    console.log(`Running Service: Site Checker, run: ${run}`)

    const sites = await Site.find()

    for(const site of sites) {
        if(run % site.checkInterval == 0) {
            const ping = await pingURL(site.site)
            site.uptimeData.push({
                timestamp: Date.now(),
                latency: ping,
                up: ping === -1 ? false : true
            })

            let nUp = 0
            let nRecords = site.uptimeData.length
            for(const record of site.uptimeData) {
                if(record.up) {
                    nUp++
                }
            }
            const uptime = nUp * 100 / nRecords
            site.uptime = uptime
            
            try {
                await site.save()
            } catch(err) {
                console.log(err)
            }        
        }
    }

    run++
}, 60 * 1000) // 1 min