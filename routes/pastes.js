import { Router } from "express"
import Paste from "../models/Paste.js"

const pastes = Router()

pastes.get(
    "/view/:id",
    (req, res) => {
        const paste = Paste.findById(req.params.id)

        if (!paste)
            return res.status(404).send("Not found.")

        res.render("pages/view_paste.njk", { paste })
    }
)

pastes.post(
    "/create",
    (req, res) => {
        let paste = Paste.create(req.body.paste)
        paste.id = Paste.save(paste)
        res.redirect(`/paste/view/${paste.id}`)
    }
)

export default pastes