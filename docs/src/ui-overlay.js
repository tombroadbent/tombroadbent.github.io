
window.FullscreenOverlay = ({ content, onClose }) => {
    React.useEffect(() => { // enable/disable body scroll behind overlay
        document.body.classList.add('overflow-hidden');
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div
            id="overlay-container"
            className="hidden fixed inset-0 flex items-center justify-center z-50 cursor-pointer"
            style={{ backgroundColor: 'rgba(240, 240, 240, 0.98)' }}
            onClick={onClose}
        >
            <div
                id="overlay"
                className="m-8 flex"
            >
                {content.type === 'image' ? (
                    <div className="max-w-full max-h-full flex flex-col items-center justify-center p-2">
                        <img
                            src={content.src}
                            alt={content.alt}
                            className="rounded-lg shadow-lg object-contain max-w-full max-h-full"
                        />
                        {content.caption && (
                            <p className="text-gray-800 text-sm md:text-base mt-2 italic text-center">
                                {window.parseMarkdownText(content.caption)}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="text-gray-800 text-2xl md:text-3xl leading-relaxed text-left p-8 border-4 border-gray-300 rounded-lg overflow-y-auto max-h-[calc(100vh-6rem)]">
                        <p>{window.parseMarkdownText(content.content)}</p>
                    </div>
                )}
            </div>
        </div>
    );
};