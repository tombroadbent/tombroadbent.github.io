window.ScriptureBlock = function ScriptureBlock({ items, onParagraphClick }) {
    return (
        <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 pt-2 shadow-sm">
            {items.map(({ scripture, citation, context, meaning }, index) => {
                return (
                    <div key={index}>
                        {index !== 0 && (
                            <div className="bg-green-20 border-t border-gray-300 mt-2 pb-2"></div>
                        )}
                        <div className="text-lg font-bold text-gray-900 mb-1">
                            {window.parseScriptureLinks(scripture)}
                        </div>
                        {context && (
                            <div
                                className="text-gray-800 mb-2"
                                onClick={() => onParagraphClick({ type: 'text', content: context })}
                            >
                                {context}
                            </div>
                        )}
                        {citation && (
                            <div
                                className="bg-white p-2 rounded-lg shadow-sm text-lg text-gray-800 whitespace-pre-line"
                                onClick={() => onParagraphClick({ type: 'text', content: [scripture, citation].join('\n') })}
                            >
                                {citation}
                            </div>
                        )}
                        {meaning && (
                            <div
                                className="bg-blue-50 border border-blue-200 text-blue-900 mt-2 px-2 rounded"
                                onClick={() => onParagraphClick({ type: 'text', content: meaning })}
                            >
                                {meaning}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};