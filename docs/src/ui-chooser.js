window.ContentSwitcherOverlay = ({ setAppTitle, setSectionsData, setActiveSectionId, onSelect }) => {
  const contentMap = {
    'Demo': () => window.loadContentFile('src/content.js'),
    'D&C 71-75': () => window.loadContentFile('src/content-1.js'),
  };

  return (
    <div
      id="chooser-container"
      className="hidden fixed top-0 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-white shadow-lg max-w-3xl w-full"
    >
      <button
        onClick={onSelect}
        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full shadow-sm transition-all duration-200"
        aria-label="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div id="chooser" className="p-8 bg-white">
        <h2 className="text-xl font-bold mb-4">Select Content File</h2>
        <ul className="space-y-2">
          {Object.entries(contentMap).map(([title, load]) => (
            <li key={title}>
              <button
                className="text-xl text-blue-700 hover:underline"
                onClick={async () => {
                  const { appTitle, sectionsData } = await load();
                  setAppTitle(appTitle);
                  setSectionsData(sectionsData);
                  setActiveSectionId(sectionsData[0]?.id || null);
                  onSelect();
                }}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}