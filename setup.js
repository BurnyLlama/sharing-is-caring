import fs from "fs"
import getLogger from "./lib/logger.js"

const log = getLogger("Setup |", "yellow")

export default function setup() {
    log.write("Making sure that the storage-folder exists...")
    if (!fs.existsSync("./data/storage"))
        fs.mkdirSync("./data/storage")
}
