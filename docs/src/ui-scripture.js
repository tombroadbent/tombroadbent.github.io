window.ScriptureBlock = function ScriptureBlock({ items, onParagraphClick }) {
    return (
        <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 pt-2 shadow-sm">
            {items.map(({ scripture, citation, context, meaning }, index) => {
                return (
                    <div key={index} className={`${index !== 0 ? 'border-t border-gray-300 mt-2 py-2' : ''}`}>
                        <div className="text-lg font-bold text-gray-900 mb-1">
                            {window.parseScriptureLinks(scripture)}
                        </div>
                        {context && (
                            <div
                                className="text-gray-800 mb-2 cursor-pointer"
                                onClick={() => onParagraphClick({ type: 'text', content: context })}
                            >
                                {context}
                            </div>
                        )}
                        <div
                            onClick={() => onParagraphClick({ type: 'text', content: [scripture, citation].join('\n') })}
                            className="cursor-pointer"
                        >
                            <div className="bg-white p-2 rounded-lg shadow-sm text-lg text-gray-800 whitespace-pre-line">
                                {citation}
                            </div>
                        </div>
                        {meaning && (
                            <div
                                className="bg-blue-50 border border-blue-200 text-blue-900 mt-2 px-2 rounded cursor-pointer"
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