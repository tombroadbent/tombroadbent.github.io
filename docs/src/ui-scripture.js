
window.ScriptureBlock = function ScriptureBlock({ scripture, citation, context, onParagraphClick }) {
    const content = [scripture, citation].join('\n');
    return (
        <div className="max-w-lg">
            {context && (
                <div
                    className="text-gray-800 m-4 mb-2 max-h-sm max-w-lg"
                    onClick={() => onParagraphClick({ type: 'text', content: context })}
                    style={{ cursor: "pointer" }}
                >
                    {context}
                </div>
            )}
            <div
                onClick={() => onParagraphClick({ type: 'text', content: content })}
                className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-gray-200">
                <div className="text-lg font-bold mb-2" >
                    {window.parseScriptureLinks(scripture)}
                </div>
                <div className="text-lg text-gray-900 whitespace-pre-line mb-2">
                    {citation}
                </div>
            </div>
        </div>
    );
};