import { db } from "../lib/database.js"
import { randomUUID } from "crypto"

/**
 * @typedef {object} File
 * @property {string} id
 * @property {string} name The file name.
 * @property {string} mimetype The file type.
 * @property {Date}   c_time Creation time.
 */

const File = {
    /**
     * Creates a {@link File} instance. (Does not save to database.)
     * @param {string} name File name.
     * @param {string} mimetype File type.
     * @returns {File}
     */
    create: (name, mimetype) => ({
        id: randomUUID(),
        name,
        mimetype,
        c_time: new Date(Date.now())
    }),

    /**
     * Inserts a {@link File} into the database.
     * @param {Url} url
     * @returns {void}
     */
    save: file => db
        .prepare("INSERT INTO urls (id, name, c_time) VALUES ($id, $name, $c_time)")
        .run(file) ?? null,

    /**
     * Find a file via an ID.
     * @param {string} id The id of the file to find.
     * @returns {File?}
     */
    findById: id => db
        .prepare("SELECT * FROM files WHERE id = ?")
        .get(id) ?? null,
}

export default File