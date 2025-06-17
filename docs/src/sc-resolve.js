
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Replaces scripture references in a string with HTML links based on a replacement map.
 * This function is now cluster-aware.
 * @param {{originalString: string, replacements: Map<string, string>}} data - The object returned by extractScriptureReferences.
 * @returns {string} - The string with scripture references replaced by HTML anchor tags.
 */
function applyReplacements({ originalString, replacements }) {
    
    // Create a single regex to find all known references from the map.
    // Sorting by length ensures longer matches (e.g., "D&C 57:1-3") are replaced before shorter ones ("D&C 57").
    const sortedKeys = Array.from(replacements.keys()).sort((a, b) => b.length - a.length);
    if (sortedKeys.length === 0) {
        return originalString;
    }

    const masterRegex = new RegExp(`\\b(${sortedKeys.map(escapeRegExp).join('|')})\\b`, 'g');

    return originalString.replace(masterRegex, (matchedRef) => {
        const url = replacements.get(matchedRef);
        if (url) {
            return `<a href="${url}" target="_blank" class="text-blue-600 hover:text-blue-800 hover:underline font-semibold">${matchedRef}</a>`;
        }
        return matchedRef; // Fallback in case of no match
    });
}
if (typeof module !== 'undefined') {
    module.exports = { applyReplacements };
}

if (typeof window !== 'undefined') {
  window.applyReplacements = applyReplacements;
}