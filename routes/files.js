import { Router } from "express"
import File from "../models/File.js"
import multer from "multer"
import { writeFile } from "fs/promises"

const files = Router()

files.get(
    "/view/:id",
    (req, res) => {
        const file = File.findById(req.params.id)

        if (!file)
            return res.status(404).send("Not found.")

        res.render("pages/view_file.njk", { file })
    }
)

files.get(
    "/download/:id",
    (req, res) => {
        const file = File.findById(req.params.id)

        if (!file) {
            res.status(404).send("Not found.")
        }

        const filePath = `./data/storage/${file.name.replace(/[^\w-.]+/g, "_")}_${file.id}.${file.mimetype.replace(/^.+\//g, "")}`
        res.sendFile(
            filePath,
            {
                root: ".",
                dotfiles: "deny"
            }
        )
    }
)

files.post(
    "/create",
    multer({ storage: multer.memoryStorage() }).single("file"),
    (req, res) => {
        if (!req.file)
            return res.status()

        const { mimetype, originalname, buffer} = req.file

        const file = File.create(originalname, mimetype)

        const filePath = `./data/storage/${originalname.replace(/[^\w-.]+/g, "_")}_${file.id}.${mimetype.replace(/^.+\//g, "")}`
        writeFile(filePath, buffer)
            .then(() => {
                File.save(file)
                res.redirect(`/file/view/${file.id}`)
            })
            .catch(err => {
                console.error(err)
                res.status(500).send("ERROR!")
            })
    }
)

export default files