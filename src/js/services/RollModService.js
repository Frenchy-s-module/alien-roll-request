export class RollModService {
    // Stocke le mode de jet original
    static #originalMode = null;
    // Indique si le mode a été modifié
    static #isModeModified = false;

    /**
     * Définit un nouveau mode de jet
     * @param {string} mode - Le mode à définir ('publicroll', 'gmroll', 'selfroll', 'blindroll')
     * @returns {Promise<boolean>} - True si le mode a été modifié avec succès
     */
    static async setRollMode(mode) {
        if (!this.isValidRollMode(mode)) {
            console.warn(`Mode de jet invalide: ${mode}`);
            return false;
        }

        // Sauvegarder le mode original si c'est la première modification
        if (!this.#isModeModified) {
            this.#originalMode = game.settings.get("core", "rollMode");
            this.#isModeModified = true;
        }

        await game.settings.set("core", "rollMode", mode);
        return true;
    }

    /**
     * Rétablit le mode de jet original
     * @returns {Promise<void>}
     */
    static async restoreOriginalMode() {
        if (this.#isModeModified && this.#originalMode !== null) {
            await game.settings.set("core", "rollMode", this.#originalMode);
            this.#isModeModified = false;
            this.#originalMode = null;
        }
    }

    /**
     * Vérifie si un mode de jet est valide
     * @param {string} mode - Le mode à vérifier
     * @returns {boolean}
     */
    static isValidRollMode(mode) {
        const validModes = ["publicroll", "gmroll", "selfroll", "blindroll"];
        return validModes.includes(mode);
    }

    /**
     * Exécute une fonction avec un mode de jet temporaire
     * @param {Function} callback - La fonction à exécuter
     * @param {string} [temporaryMode='publicroll'] - Le mode à utiliser temporairement
     * @returns {Promise<*>} - Le résultat de la fonction callback
     */
    static async withTemporaryMode(callback, temporaryMode = 'publicroll') {
        try {
            await this.setRollMode(temporaryMode);
            return await callback();
        } finally {
            await this.restoreOriginalMode();
        }
    }
}