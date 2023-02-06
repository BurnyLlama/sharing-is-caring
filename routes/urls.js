import { Router } from "express"
import Url from "../models/Url.js"

const urls = Router()

urls.get(
    "/s/:id",
    (req, res) => {
        const url = Url.findById(parseInt(req.params.id, 16))

        if (!url)
            return res.status(404).send("Not found.")

        res.redirect(url.location.match(/^https?:\/\//) ? url.location : `https://${url.location}`)
    }
)

urls.get(
    "/info/:id",
    (req, res) => {
        const url = Url.findById(parseInt(req.params.id, 16))

        if (!url)
            return res.status(404).send("Not found.")

        const subdomains = req.subdomains.join(".")
        const siteUrl = `${req.protocol}://${subdomains ? subdomains + "." : ""}${req.hostname === "localhost" ? "localhost:12345" : req.hostname}`
        res.render("pages/view_url.njk", { siteUrl, url })
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

        res.redirect(`/url/info/${url.id}`)
    }
)

export default urls