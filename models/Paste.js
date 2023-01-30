import { db } from "../lib/database.js"

/**
 * A paste is a text stored in the database.
 * @typedef {object} Paste
 * @property {number} id
 * @property {string} text The text in the paste.
 */

const Paste = {
    /**
     * Creates a {@link Paste} instance. (Does not save to database.)
     * @param {string} text
     * @returns
     */
    create: text => ({
        text: text ?? ""
    }),

    /**
     * Saves a {@link Paste} instance to the database.
     * @param {Paste} paste
     * @returns {number} id of the inserted paste.
     */
    save: paste => db
        .prepare("INSERT INTO pastes (text) VALUES ($text)")
        .run(paste)
        .lastInsertRowid,

    /**
     * Find a paste via id.
     * @param {number} id
     * @returns {Paste?}
     */
    findById: id => db
        .prepare("SELECT * FROM pastes WHERE id = ?")
        .get(id) ?? null,
}

export default Paste