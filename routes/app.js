import { Router } from "express"

const app = Router()

app.get("/", (req, res) => res.render("pages/landing.njk"))

export default app