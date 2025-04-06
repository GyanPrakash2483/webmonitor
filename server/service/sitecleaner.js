import Site from "../models/SiteSchema"

let run = 0

setInterval(async () => {
    console.log(`Running Service: Site Data Cleaner, run: ${run}`)

    const sites = await Site.find()

    const cutofftime = Date.now() - 24 * 60 * 60 * 1000

    for(const site of sites) {
        site.uptimeData = site.uptimeData.filter(record => record.timestamp > cutofftime)
    }

    run++
}, 60 * 60 * 1000) // 1 hr