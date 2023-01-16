import { randomUUID } from "crypto"
import { db } from "../lib/database"

/**
 * A paste is a text stored in the database.
 * @typedef {object} Paste
 * @property {string} id
 * @property {string} text The text in the paste.
 */

const Paste = {
    /**
     * Creates a {@link Paste} instance. (Does not save to database.)
     * @param {string} text
     * @returns
     */
    create: text => ({
        id: randomUUID(),
        text: text ?? ""
    }),

    /**
     * Saves a {@link Paste} instance to the database.
     * @param {Paste} paste
     */
    save: paste => db
        .prepare("INSERT INTO paste (id, text) VALUES ($id, $text)")
        .run(paste),

    /**
     * Find a paste via id.
     * @param {string} id
     * @returns {Paste?}
     */
    findById: id => db
        .prepare("SELECT * FROM paste WHERE id = ?")
        .get(id) ?? null,
}

export default Paste