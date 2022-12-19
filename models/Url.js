import { randomUUID } from "crypto"
import { db } from "../lib/database.js"

/**
 * @typedef {object} Url
 * @property {string} id
 * @property {string} location The location where the URL points to.
 * @property {string} [customUrl] A custom URL instead of using the id.
 */

const Url = {
    /**
     * Creates a {@link Url} instance. (Does not save to database.)
     * @param {string} location The location where the URL points to.
     * @param {string} [customUrl] Optional custom URL.
     * @returns {Url}
     */
    create: (location, customUrl=null) => ({
        id: randomUUID(),
        location: location ?? "https://example.com",
        // TODO: Implement customUrl.
        customUrl: null
    }),

    /**
     * Inserts a {@link Url} into the database.
     * @param {Url} url
     * @returns {void}
     */
    save: url => db
        .prepare("INSERT INTO urls (uuid, location, customUrl) VALUES ($uuid, $location, $customUrl)")
        .run(url) ?? null,

    /**
     * Finds a {@link Url} by id.
     * @param {string} id
     * @returns {Url?}
     */
    findById: id => db
        .prepare("SELECT * FROM urls WHERE uuid = ?")
        .get(id) ?? null,

    /**
     * Get a {@link Url} by customUrl.
     * @param {string} customUrl
     * @returns {Url?}
     */
    findByCustomUrl: customUrl => db
        .prepare("SELECT * FROM urls WHERE uuid = ?")
        .get(customUrl) ?? null,
}

export default Url
