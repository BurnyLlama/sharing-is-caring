import express from "express"
import getLogger from "./lib/logger.js"
import njk from "nunjucks"
import setup from "./setup.js"
import { setupDB } from "./lib/database.js"

const log = getLogger("MAIN     |", "blue")

log.write("Setting stuff up...")
setup()

log.write("Loading in the database...")
setupDB()

log.write("Starting the server...")
const server = express()

njk.configure(
    "./app/views",
    {
        express: server,
        autoescape: true,
        lstripBlocks: true,
        trimBlocks: true,
    }
)

server.get("/", (req, res) => res.render("pages/landing.njk"))

server.listen(12345, () => log.write("Listening on 'http://localhost:12345/'!"))