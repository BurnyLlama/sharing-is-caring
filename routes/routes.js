import { Router } from "express"
import app from "./app.js"
import files from "./files.js"
import pastes from "./pastes.js"
import urls from "./urls.js"

const routes = Router()

routes.use("/", app)

routes.use("/url", urls)
routes.use("/file", files)
routes.use("/paste", pastes)

export default routes