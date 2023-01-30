import { db } from "../lib/database.js"

/**
 * @typedef {object} File
 * @property {number} id
 * @property {string} name The file name.
 * @property {string} mimetype The file type.
 * @property {string} c_time Creation time. (Saved as ISO-string.)
 */

const File = {
    /**
     * Creates a {@link File} instance. (Does not save to database.)
     * @param {string} name File name.
     * @param {string} mimetype File type.
     * @returns {File}
     */
    create: (name, mimetype) => ({
        name,
        mimetype,
        c_time: new Date(Date.now()).toISOString() // Must be a string to save in sqlite.
    }),

    /**
     * Inserts a {@link File} into the database.
     * @param {Url} url
     * @returns {number} id of the inserted file.
     */
    save: file => db
        .prepare("INSERT INTO files (name, mimetype, c_time) VALUES ($name, $mimetype, $c_time)")
        .run(file)
        .lastInsertRowid,

    /**
     * Find a file via an ID.
     * @param {number} id The id of the file to find.
     * @returns {File?}
     */
    findById: id => db
        .prepare("SELECT * FROM files WHERE id = ?")
        .get(id) ?? null,
}

export default File