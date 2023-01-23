import { Router } from "express"
import File from "../models/File.js"
import multer from "multer"
import { writeFile } from "fs/promises"

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
        if (!req.file)
            return res.status()
        // TODO: Fix this later.
        const { mimetype, originalname, buffer} = req.file

        const file = File.create(originalname, mimetype)

        const filePath = `./data/storage/${originalname.replace(/[^\w-.]+/g, "_")}_${file.id}.${mimetype.replace(/^.+\//g, "")}`
        writeFile(filePath, buffer)
            .then(() => {
                File.save(file)
                res.render("pages/file.njk", { file })
            })
            .catch(() => {
                res.status(500).render("pages/file.njk")
            })
    }
)

export default files