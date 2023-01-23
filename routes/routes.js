import { Router } from "express"
import app from "./app.js"
import files from "./file.js"
import urls from "./urls.js"

const routes = Router()

routes.use("/", app)

routes.use("/url", urls)
routes.use("/file", files)

export default routes