import { Router } from "express"

const app = Router()

app.get("/", (req, res) => res.render("pages/landing.njk"))
app.get("/paste", (req, res) => res.render("pages/create_paste.njk"))
app.get("/file", (req, res) => res.render("pages/create_file.njk"))
app.get("/custom", (req,res) => res.render("pages/custom.njk"))

export default app