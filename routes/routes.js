import { Router } from "express"
import app from "./app.js"
import urls from "./urls.js"

const routes = Router()

routes.use("/", app)

routes.use("/url", urls)

export default routes