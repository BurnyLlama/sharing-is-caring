import { Router } from "express"
import File from "../models/File.js"
import multer from "multer"

const files = Router()

files.get(
    "/:id",
    (req, res) => {
        const file = File.findById(req.params.id)

        if (!file)
            return res.status(404).send("Not found.")

        res.render("pages/file.njk", { file })
    }
)

files.post(
    "/create",
    multer({ storage: multer.memoryStorage() }).single("file"),
    (req, res) => {
        // TODO: Fix this later.
    }
)

export default files