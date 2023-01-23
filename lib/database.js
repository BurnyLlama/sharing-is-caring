import sqlite from "better-sqlite3"
import getLogger from "./logger.js"

const log = getLogger("Database |", "magenta")

/**
 * This can't be used before {@link setupDB} has been called!
 * @type {sqlite.Database}
 */
export let db = null

export function setupDB() {
    db = new sqlite("./data/database.sqlite")

    log.write("Making sure tables exists...")
    db.prepare(`
        CREATE TABLE IF NOT EXISTS urls (
            id        UUID NOT NULL PRIMARY KEY,
            location  TEXT NOT NULL,
            customUrl
        )
    `).run()

    db.prepare(`
        CREATE TABLE IF NOT EXISTS files (
            id       UUID      NOT NULL PRIMARY KEY,
            c_time   TIMESTAMP NOT NULL,
            name     TEXT      NOT NULL,
            mimetype TEXT      NOT NULL
        )
    `).run()

    db.prepare(`
        CREATE TABLE IF NOT EXISTS pastes (
            id   UUID NOT NULL PRIMARY KEY,
            text TEXT NOT NULL
        )
    `).run()
}