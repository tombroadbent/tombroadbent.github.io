
function parseScripturesForReact(text) {
    const { replacements } = window.extractScriptureReferences(text);

    if (replacements.size === 0) {
        return [text];
    }

    const sortedKeys = Array.from(replacements.keys()).sort((a, b) => b.length - a.length);
    const masterRegex = new RegExp(`\\b(${sortedKeys.map(escapeRegExp).join('|')})\\b`, 'g');

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = masterRegex.exec(text)) !== null) {
        // Add the plain text part before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const matchedRef = match[0];
        const url = replacements.get(matchedRef);

        // Add the matched scripture as a React link element
        if (url) {
            // This assumes React and a component like window.LongPressLink are available in the scope.
            parts.push(React.createElement(window.LongPressLink, { key: match.index, href: url }, matchedRef));
        } else {
            // Fallback for safety, though this shouldn't happen with the current logic
            parts.push(matchedRef);
        }

        lastIndex = masterRegex.lastIndex;
    }

    // Add the remaining plain text part after the last match
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
}

/**
 * Parses a single string for basic Markdown syntax and returns an array of
 * strings and React elements.
 * @param {string} text - The string to parse.
 * @param {number} baseKey - A base number to create unique keys for the elements.
 * @returns {Array<string|React.ReactElement>} An array of mixed strings and elements.
 */
function parseStringForMarkdown(text, baseKey = 0) {
    if (!text) {
        return [];
    }

    // Regex to match **strong**, __strong__, *em*, and \n.
    const markdownRegex = /\*\*([\s\S]+?)\*\*|__([\s\S]+?)__|\*([\s\S]+?)\*|\n/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = markdownRegex.exec(text)) !== null) {
        // Add any plain text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }

        const [fullMatch, strongDouble, strongUnderscore, em] = match;
        const key = `${baseKey}-${lastIndex}`;

        if (strongDouble) {
            parts.push(React.createElement('strong', { key }, strongDouble));
        } else if (strongUnderscore) {
            parts.push(React.createElement('strong', { key }, strongUnderscore));
        } else if (em) {
            parts.push(React.createElement('em', { key }, em));
        } else if (fullMatch === '\n') {
            parts.push(React.createElement('br', { key }));
        }
        lastIndex = markdownRegex.lastIndex;
    }

    // Add any remaining plain text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    return parts;
}

/**
 * Iterates over an array of mixed strings and React elements, parsing
 * only the strings for Markdown.
 * @param {Array<string|React.ReactElement>} content - The array to process.
 * @returns {Array<string|React.ReactElement>} A flattened array ready for rendering.
 */
function parseMarkdownForReact(content) {
    if (!Array.isArray(content)) {
        // For backward compatibility, if a single string is passed, wrap it in an array.
        if (typeof content === 'string') {
            content = [content];
        } else {
            return [];
        }
    }

    const processedParts = [];

    content.forEach((item, index) => {
        if (typeof item === 'string') {
            // If it's a string, parse it for Markdown.
            const parsed = parseStringForMarkdown(item, index);
            processedParts.push(...parsed);
        } else if (item) {
            // If it's not a string (e.g., a React element, number, etc.), push it directly.
            // This check avoids pushing null or undefined.
            processedParts.push(item);
        }
    });

    return processedParts;
}

window.parseScriptureLinks = (text) => {
    return parseMarkdownForReact(parseScripturesForReact(text)).flat();
};

window.parseMarkdownText = (text) => {
    const parts = parseStringForMarkdown(text);
    return parts.flat();
};
