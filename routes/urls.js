import { Router } from "express"
import Url from "../models/Url.js"

const urls = Router()

urls.get(
    "/s/:id",
    (req, res) => {
        const url = Url.findById(parseInt(req.params.id, 16))

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

urls.post(
    "/create",
    (req, res) => {
        const customUrl = req.body.customUrl
        if (customUrl && Url.findByCustomUrl(customUrl))
            return res.status(402).send("Already taken!")

        let url = Url.create(req.body.url, customUrl ? customUrl.replace(/\W+/g, "-") : null)
        url.id = Url.save(url).toString(16)
        if (url.customUrl)
            return res.send(`<a href="/url/c/${url.customUrl}">Your link here. (Right click.)</a>`)

        res.send(`<a href="/url/s/${url.id}">Your link here. (Right click.)</a>`)
    }
)

export default urls