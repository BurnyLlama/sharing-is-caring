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
        const customUrl = req.body.customUrl.replace(/\W+/g, "-")
        if (customUrl && Url.findByCustomUrl(customUrl))
            return res.status(402).send("Already taken!")

        const url = Url.create(req.body.url, customUrl ?? null)
        Url.save(url)
        if (url.customUrl)
            return res.send(`<a href="/url/c/${url.customUrl}">Your link here. (Right click.)</a>`)

        res.send(`<a href="/url/s/${url.id}">Your link here. (Right click.)</a>`)
    }
)

export default urls