if (typeof module !== 'undefined') {
  SCRIPTURE_BOOK_DATA = require('books');
} else if (typeof window !== 'undefined') {
  SCRIPTURE_BOOK_DATA = window.scriptureBooks;
}

// --- PRE-COMPUTED LOOKUP TABLES & REGEX ---
const aliasToKeyMap = new Map();
for (const key in SCRIPTURE_BOOK_DATA) {
    const book = SCRIPTURE_BOOK_DATA[key];
    aliasToKeyMap.set(book.fullName.toLowerCase(), key);
    book.aliases.forEach(alias => {
        aliasToKeyMap.set(alias.toLowerCase(), key);
    });
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const allBookNamesAndAliases = Array.from(aliasToKeyMap.keys());
allBookNamesAndAliases.sort((a, b) => b.length - a.length);
const bookNamesRegexPart = allBookNamesAndAliases.map(name => escapeRegExp(name)).join('|');
const scriptureRegex = new RegExp(`\\b(${bookNamesRegexPart})\\s(\\d+)(?::([\\d–\\-,\\s]+))?((?:;\\s*\\d+(?::[\\d–\\-,\\s]+)?)*)\\b`, 'gi');

/**
 * Generates a direct URL to a scripture passage.
 */
const generateUrl = (bookInfo, chapter, verses) => {
    if (!bookInfo || !chapter) return null;
    const baseUrl = `https://www.churchofjesuschrist.org/study/scriptures/${bookInfo.category}/${bookInfo.urlAbbr}/${chapter}?lang=eng`;
    if (!verses) return baseUrl;
    const verseIdPart = verses.split(',').map(part => part.split(/[-–]/).map(v => `p${v.trim()}`).join('-')).join(',');
    const firstVerse = (verses.match(/\d+/) || [])[0];
    return firstVerse ? `${baseUrl}&id=${verseIdPart}#p${firstVerse}` : baseUrl;
};

/**
 * Extracts scripture references from text, handling clusters, and returns them with corresponding URLs in a map.
 */
function extractScriptureReferences(text) {
    const replacements = new Map();
    const matches = text.matchAll(scriptureRegex);

    for (const match of matches) {
        const bookAlias = match[1];
        const firstChapter = match[2];
        const firstVerses = match[3] || null;
        const cluster = match[4];

        const bookKey = aliasToKeyMap.get(bookAlias.toLowerCase());
        if (!bookKey) continue;
        const bookData = SCRIPTURE_BOOK_DATA[bookKey];
        
        let firstRefString = `${bookAlias} ${firstChapter}`;
        if (firstVerses) {
            firstRefString += `:${firstVerses.trim()}`;
        }
        if (!replacements.has(firstRefString)) {
            const href = generateUrl(bookData, firstChapter, firstVerses);
            if (href) replacements.set(firstRefString, href);
        }

        if (cluster) {
            const partialRefs = cluster.split(';').filter(s => s.trim() !== '');
            partialRefs.forEach(part => {
                const trimmedPart = part.trim();
                const partMatch = trimmedPart.match(/(\d+)(?::([\d–\-,]+))?/);
                if (!partMatch) return;

                const chapter = partMatch[1];
                const verses = partMatch[2] || null;
                
                if (!replacements.has(trimmedPart)) {
                   const href = generateUrl(bookData, chapter, verses);
                   if (href) replacements.set(trimmedPart, href);
                }
            });
        }
    }

    return {
        originalString: text,
        replacements: replacements,
    };
}

if (typeof module !== 'undefined') {
    module.exports = { extractScriptureReferences };
}

if (typeof window !== 'undefined') {
  window.extractScriptureReferences = extractScriptureReferences;
}
