import express from "express"

const server = express()

server.get("/", (req, res) => res.send("Hello, world!"))

server.listen(12345, () => console.log("Listening on 'http://localhost:12345/'!"))