import { Router } from "express"
import Paste from "../models/Paste.js"

const pastes = Router()

pastes.get(
    "/:id",
    (req, res) => {
        const file = Paste.findById(req.params.id)

        if (!file)
            return res.status(404).send("Not found.")

        res.render("pages/file.njk", { file })
    }
)

pastes.post(
    "/create",
    (req, res) => {
        const paste = Paste.create(req.body.paste)
        Paste.save(paste)
        res.render("pages/paste.njk", { paste })
    }
)

export default pastes