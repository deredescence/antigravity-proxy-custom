/**
 * Model Fallback Configuration
 *
 * Implements Universal Waterfall strategy: regardless of requested model,
 * always tries the ordered fallback chain until success or exhaustion.
 */

import { UNIVERSAL_FALLBACK_CHAIN, MODEL_FALLBACK_MAP } from './constants.js';

// Re-export for convenience
export { UNIVERSAL_FALLBACK_CHAIN, MODEL_FALLBACK_MAP };

/**
 * Get the next fallback model in the universal waterfall chain.
 *
 * Strategy:
 * - If current model is not in the chain, start from the beginning
 * - If current model is in the chain, return the next one
 * - If at end of chain, return null (no more fallbacks)
 *
 * @param {string} currentModel - The model that just failed
 * @returns {string|null} Next fallback model or null if chain exhausted
 */
export function getFallbackModel(currentModel) {
    const currentIndex = UNIVERSAL_FALLBACK_CHAIN.indexOf(currentModel);

    if (currentIndex === -1) {
        // Model not in chain (e.g., claude-sonnet-4-5, gemini-2.5-*, etc.)
        // Start from the beginning of the waterfall
        return UNIVERSAL_FALLBACK_CHAIN[0];
    }

    if (currentIndex < UNIVERSAL_FALLBACK_CHAIN.length - 1) {
        // Return next model in the waterfall
        return UNIVERSAL_FALLBACK_CHAIN[currentIndex + 1];
    }

    // End of chain - no more fallbacks available
    return null;
}

/**
 * Check if there are any fallbacks remaining for a model
 * @param {string} model - Model ID to check
 * @returns {boolean} True if more fallbacks exist
 */
export function hasFallback(model) {
    return getFallbackModel(model) !== null;
}
