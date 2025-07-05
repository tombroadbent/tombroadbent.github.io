
window.ScriptureBlock = function ScriptureBlock({ scripture, citation, context, meaning, onParagraphClick }) {
    const content = [scripture, citation].join('\n');
    return (
        <div className="max-w-lg bg-gray-200 rounded-2xl p-2 border border-gray-300">
            {context && (
                <div
                    className="text-gray-800 my-2 px-2 max-h-sm max-w-lg"
                    onClick={() => onParagraphClick({ type: 'text', content: context })}
                    style={{ cursor: "pointer" }}
                >
                    {context}
                </div>
            )}
            {meaning && (
                <div
                    className="bg-blue-50 text-blue-900 my-2 px-2 rounded max-w-lg"
                    onClick={() => onParagraphClick({ type: 'text', content: meaning })}
                    style={{ cursor: "pointer" }}
                >
                    {meaning}
                </div>
            )}
            <div
                onClick={() => onParagraphClick({ type: 'text', content: content })}
                className="bg-gray-50 p-2 rounded-lg shadow-sm border-gray-200">
                <div className="text-lg font-bold" >
                    {window.parseScriptureLinks(scripture)}
                </div>
                <div className="text-lg text-gray-900 whitespace-pre-line">
                    {citation}
                </div>
            </div>
        </div>
    );
};