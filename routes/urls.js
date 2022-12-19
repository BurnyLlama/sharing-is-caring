import { Router } from "express"
import Url from "../models/Url.js"

const urls = Router()

urls.get(
    "/s/:id",
    (req, res) => {
        const url = Url.findById(req.params.id)

        if (!url)
            return res.status(404).send("Not found.")

        res.redirect(url.location)
    }
)

urls.get(
    "/c/:customUrl",
    (req, res) => {
        const url = Url.findByCustomUrl(req.params.customUrl)

        if (!url)
            return res.status(404).send("Not found.")

        res.redirect(url.location)
    }
)

urls.get(
    "/info/:id",
    (req, res) => {
        const url = Url.findById(req.params.id)

        if (!url)
            return res.status(404).send("Not found.")

        res.json(url)
    }
)

urls.post(
    "/create",
    (req, res) => {
        const url = Url.create(req.body.url)
        Url.save(url)
        res.send(`<a href="/url/s/${url.id}">Your link here.</a>`)
    }
)

export default urls