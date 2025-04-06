/*
    Not to be used in main program, only for testing.
*/

import Site from "../models/SiteSchema.js";
import mongoose from "mongoose";

const sites = await Site.find()

for(const site of sites) {
    site.uptimeData = []
    await site.save()
}

console.log('Sites cleared, ' + sites.length + 'sites')

mongoose.disconnect()