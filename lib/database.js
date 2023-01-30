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

    db.pragma("journal_mode = WAL")
    db.pragma("encoding = \"UTF-8\"")

    log.write("Making sure tables exists...")
    db.prepare(`
        CREATE TABLE IF NOT EXISTS urls (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            location  TEXT    NOT NULL,
            customUrl
        )
    `).run()

    db.prepare(`
        CREATE TABLE IF NOT EXISTS files (
            id       INTEGER   PRIMARY KEY AUTOINCREMENT,
            c_time   TIMESTAMP NOT NULL,
            name     TEXT      NOT NULL,
            mimetype TEXT      NOT NULL
        )
    `).run()

    db.prepare(`
        CREATE TABLE IF NOT EXISTS pastes (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT    NOT NULL
        )
    `).run()
}