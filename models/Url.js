import { db } from "../lib/database.js"

/**
 * A Url represents a URL shortening.
 * @typedef {object} Url
 * @property {number} id
 * @property {string} location The location where the URL points to.
 * @property {string} [customUrl] A custom URL instead of using the id.
 */

const Url = {
    /**
     * Creates a {@link Url} instance. (Does not save to database.)
     * @param {string} location The location where the URL points to.
     * @param {string} customUrl Optional custom URL. (Can be null.)
     * @returns {Url}
     */
    create: (location, customUrl) => ({
        location: location ?? "https://example.com",
        customUrl
    }),

    /**
     * Inserts a {@link Url} into the database.
     * @param {Url} url
     * @returns {number} the id of the inserted url.
     */
    save: url => db
        .prepare("INSERT INTO urls (location, customUrl) VALUES ($location, $customUrl)")
        .run(url)
        .lastInsertRowid,

    /**
     * Finds a {@link Url} by id.
     * @param {number} id
     * @returns {Url?}
     */
    findById: id => db
        .prepare("SELECT * FROM urls WHERE id = ?")
        .get(id) ?? null,

    /**
     * Get a {@link Url} by customUrl.
     * @param {string} customUrl
     * @returns {Url?}
     */
    findByCustomUrl: customUrl => db
        .prepare("SELECT * FROM urls WHERE customUrl = ?")
        .get(customUrl) ?? null,
}

export default Url
