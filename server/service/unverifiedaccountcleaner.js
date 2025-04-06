import User from "../models/UserSchema.js";

let run = 0

setInterval(async () => {
    console.log(`Running Service: Unverified Account Cleaner, run: ${run}`)

    await User.deleteMany({
        verified: false
    })

    run++
}, 60 * 60 * 1000) // 1 hr