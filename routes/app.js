import { Router } from "express"

const app = Router()

app.get("/", (req, res) => res.render("pages/landing.njk"))
app.get("/paste", (req, res) => res.render("pages/paste.njk"))
app.get("/file", (req, res) => res.render("pages/file.njk"))

export default app