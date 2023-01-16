import express from "express"
import getLogger from "./lib/logger.js"
import njk from "nunjucks"
import setup from "./setup.js"
import { setupDB } from "./lib/database.js"
import routes from "./routes/routes.js"
import bodyParser from "body-parser"

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

server.use(bodyParser.urlencoded({ extended: true }))

server.use("/", routes)
server.use("/static", express.static("static"))

server.listen(12345, () => log.write("Listening on 'http://localhost:12345/'!"))