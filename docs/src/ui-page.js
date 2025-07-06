window.SectionPage = ({ section, onParagraphClick }) => {
    const titleMatch = section.title.match(/^(.*?)\s*(\(D&C\s+.*?\))?$/);
    const mainTitle = titleMatch ? titleMatch[1].trim() : section.title;
    const scriptureReference = titleMatch && titleMatch[2] ? titleMatch[2].trim() : '';

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 pb-1">
                {mainTitle}
            </h2>
            {scriptureReference && (
                <p className="text-lg text-gray-500 mb-6 border-b-2 border-blue-200 pb-3">
                    {window.parseScriptureLinks(scriptureReference)}
                </p>
            )}

            {section.content.map((block, blockIndex) => (
                <div key={blockIndex} className="mb-4">
                    {block.type === 'paragraph' && (
                        <p
                            className="text-lg text-gray-700 leading-relaxed"
                            onClick={() => onParagraphClick({ type: 'text', content: block.text })}
                        >
                            {window.parseScriptureLinks(block.text)}
                        </p>
                    )}
                    {block.type === 'subheader' && (
                        <h3 className="text-2xl font-semibold text-blue-700 mt-6 mb-3 border-l-4 border-blue-400 pl-3">
                            {window.parseScriptureLinks(block.text)}
                        </h3>
                    )}
                    {block.type === 'subsubheader' && (
                        <h4 className="text-xl font-medium text-blue-600 mt-4 mb-2 pl-3">
                            {window.parseScriptureLinks(block.text)}
                        </h4>
                    )}
                    {block.type === 'list' && (
                        <ul className="list-none text-gray-700">
                            {block.items.map((item, itemIndex) => (
                                <li
                                    key={itemIndex}
                                    className="mb-1 text-lg text-left pl-6 list-item-hanging-indent"
                                    onClick={() => onParagraphClick({ type: 'text', content: item })}
                                >
                                    {window.parseScriptureLinks(item)}
                                </li>
                            ))}
                        </ul>
                    )}
                    {block.type === 'image' && (
                        <div className="my-4 text-center">
                            <img
                                src={block.src}
                                alt={block.alt}
                                className="mx-auto rounded-lg shadow-md max-w-full h-auto"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; }}
                                onClick={() => onParagraphClick({ type: 'image', src: block.fullscreenSrc || block.src, alt: block.alt, caption: block.caption })}
                            />
                            {block.caption && (
                                <p className="text-sm text-gray-500 mt-2 italic">{block.caption}</p>
                            )}
                        </div>
                    )}
                    {block.type === 'question' && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg my-4 shadow-sm">
                            {block.questions.map((question, qIndex) => (
                                <p
                                    key={qIndex}
                                    className="text-lg text-gray-800 italic mb-2 last:mb-0"
                                    onClick={() => onParagraphClick({ type: 'text', content: question })}
                                >
                                    {window.parseScriptureLinks(question)}
                                </p>
                            ))}
                        </div>
                    )}
                    {block.type === 'quote' && (
                        <div
                            className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg my-4 shadow-sm"
                            onClick={() => onParagraphClick({ type: 'text', content: block.text })}
                        >
                            <p className="text-lg text-gray-800 italic leading-relaxed">{window.parseScriptureLinks(block.text)}</p>
                        </div>
                    )}
                    {block.type === 'scripture' && (
                        <div className="my-4">
                            <window.ScriptureBlock
                                items={block.items}
                                onParagraphClick={onParagraphClick}
                            />
                        </div>
                    )}
                    {block.type === 'table' && (
                        <div className="overflow-x-auto my-4">
                            <window.Table
                                headers={block.headers}
                                rows={block.rows}
                                onParagraphClick={onParagraphClick}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
