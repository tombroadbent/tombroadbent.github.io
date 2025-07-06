
window.App = () => {
    const [appTitle, setAppTitle] = React.useState('Choose Content');
    const [sectionsData, setSectionsData] = React.useState([]);
    const [activeSectionId, setActiveSectionId] = React.useState(() => {
        return sectionsData.length > 0 ? sectionsData[0].id : null;
    });
    const navListRef = React.useRef(null);
    const [allPageSavedScrollOffset, setAllPageSavedScrollOffset] = React.useState(0);

    const defaultContentFile = 'src/content-1.js';
    const defaultSectionIndex = 0;
    React.useEffect(() => {
        (async () => {
            try {
                const { appTitle, sectionsData } = await window.loadContentFile(defaultContentFile);
                setAppTitle(appTitle);
                setSectionsData(sectionsData);
                if (sectionsData.length > defaultSectionIndex) {
                    setActiveSectionId(sectionsData[defaultSectionIndex].id);
                }
            } catch (err) {
                console.error('Failed to load default content:', err);
            }
        })();
    }, []);

    React.useEffect(() => {
        const mainContent = document.querySelector('#content');
        if (mainContent) {
            if (activeSectionId === 'all_pages') {
                mainContent.scrollTo({ top: allPageSavedScrollOffset, behavior: 'instant' });
            } else {
                mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [activeSectionId, allPageSavedScrollOffset]);

    React.useEffect(() => {
        if (navListRef.current) {
            const activeElement = navListRef.current.querySelector(`[data-section-id="${activeSectionId}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }, [activeSectionId]);

    const toggleContentExpand = () => {
        const mainContent = document.querySelector('#content');
        if (mainContent.classList.contains('md:pl-90')) {
            mainContent.classList.remove('md:pl-90');
            mainContent.classList.add('md:pl-8');
        } else {
            mainContent.classList.remove('md:pl-8');
            mainContent.classList.add('md:pl-90');
        }
        const mainOverlay = document.querySelector('#overlay');
        if (mainOverlay) {
            if (mainOverlay.classList.contains('md:pl-90')) {
                mainOverlay.classList.remove('md:pl-90');
                mainOverlay.classList.add('md:pl-8');
            } else {
                mainOverlay.classList.remove('md:pl-8');
                mainOverlay.classList.add('md:pl-90');
            }
        }
    };

    const scrollToTop = () => {
        const mainContent = document.querySelector('#content');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToSubheader = (direction) => {
        const mainContent = document.querySelector('#content');
        if (!mainContent) return;
        const selector = activeSectionId === 'all_pages' ? '.bg-white h2, .bg-white h3' : '.bg-white h3';
        const headingElements = Array.from(mainContent.querySelectorAll(selector));

        if (headingElements.length === 0) {
            if (direction === 'next') mainContent.scrollTo({ top: mainContent.scrollHeight - mainContent.clientHeight, behavior: 'smooth' });
            else mainContent.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const viewportTop = mainContent.scrollTop;
        const scrollBuffer = 20;
        let currentHeadingIndex = -1;
        for (let i = 0; i < headingElements.length; i++) {
            if (headingElements[i].offsetTop <= viewportTop + scrollBuffer) currentHeadingIndex = i;
            else break;
        }

        let targetIndex = direction === 'next' ? currentHeadingIndex + 1 : currentHeadingIndex - 1;
        let targetScrollTop;

        if (direction === 'next') {
            if (targetIndex < headingElements.length) targetScrollTop = headingElements[targetIndex].offsetTop - scrollBuffer;
            else targetScrollTop = mainContent.scrollHeight - mainContent.clientHeight;
        } else {
            if (targetIndex >= 0) targetScrollTop = headingElements[targetIndex].offsetTop - scrollBuffer;
            else targetScrollTop = 0;
        }
        mainContent.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
    };

    const goToAllPage = () => {
        const mainContent = document.querySelector('#content');
        if (mainContent) {
            const headings = Array.from(mainContent.querySelectorAll('.bg-white h2, .bg-white h3'));
            let closestHeadingOffset = mainContent.scrollTop;
            for (const heading of headings) {
                if (heading.offsetTop >= mainContent.scrollTop - 50 && heading.offsetTop < mainContent.scrollTop + mainContent.clientHeight) {
                    closestHeadingOffset = heading.offsetTop;
                    break;
                }
            }
            setAllPageSavedScrollOffset(closestHeadingOffset);
        }
        setActiveSectionId(sectionsData[0].id);
        return;
    }

    function goToAdjacentPage(direction) {
        if (activeSectionId === 'all_pages') {
            goToAllPage();
            return;
        }
        const currentIndex = sectionsData.findIndex(section => section.id === activeSectionId);
        if (currentIndex === -1) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % sectionsData.length;
        } else if (direction === 'prev') {
            newIndex = (currentIndex - 1 + sectionsData.length) % sectionsData.length;
        } else {
            return;
        }
        setActiveSectionId(sectionsData[newIndex].id);
    }

    const goToNextPage = () => goToAdjacentPage('next');
    const goToPrevPage = () => goToAdjacentPage('prev');

    const handleSetActiveSectionId = (id) => {
        const mainContent = document.querySelector('#content');
        if (activeSectionId === 'all_pages' && mainContent) {
            const headings = Array.from(mainContent.querySelectorAll('.bg-white h2, .bg-white h3'));
            let closestHeadingOffset = mainContent.scrollTop;
            for (const heading of headings) {
                if (heading.offsetTop >= mainContent.scrollTop - 50 && heading.offsetTop < mainContent.scrollTop + mainContent.clientHeight) {
                    closestHeadingOffset = heading.offsetTop;
                    break;
                }
            }
            setAllPageSavedScrollOffset(closestHeadingOffset);
        }
        setActiveSectionId(id);
    };

    const overlayNone = { type: 'none', content: 'fixme' };
    const [fullscreenContent, setFullscreenContent] = React.useState(overlayNone);
    const handleParagraphClick = (content) => {
        const mainOverlayContainer = document.querySelector('#overlay-container');
        if (mainOverlayContainer) {
            mainOverlayContainer.classList.remove('hidden');
        }
        setFullscreenContent(content);
    }
    const handleCloseFullscreen = () => {
        const mainOverlayContainer = document.querySelector('#overlay-container');
        if (mainOverlayContainer) {
            mainOverlayContainer.classList.add('hidden');
        }
        setFullscreenContent(overlayNone);
    };
    const handleOpenChooser = () => {
        const chooserContainer = document.querySelector('#chooser-container');
        if (chooserContainer) {
            chooserContainer.classList.remove('hidden');
        }
    };
    const handleCloseChooser = () => {
        const chooserContainer = document.querySelector('#chooser-container');
        if (chooserContainer) {
            chooserContainer.classList.add('hidden');
        }
    };
    const activeSection = sectionsData.find(section => section.id === activeSectionId);

    const updatePageButtonPrez = (sectionId) => {
        const isAllPages = sectionId === 'all_pages' && activeSectionId === 'all_pages';
        const isActiveSection = activeSectionId === sectionId;

        return (isActiveSection || isAllPages)
            ? 'text-gray-200 font-extrabold'
            : 'text-gray-300 font-normal';
    }

    return (
        <div className="flex flex-col flex-row h-screen bg-gray-50 text-gray-900">
            <div id="content" className="flex-1 p-2 md:p-8 md:pr-34 overflow-y-auto main-content-scrollable ">
                <h1
                    onClick={handleOpenChooser}
                    className="cursor-pointer hover:text-blue-600 transition-colors duration-200 text-4xl font-extrabold text-center text-blue-800 mb-10 pb-4 border-b-4 border-blue-300"
                >
                    {appTitle}
                </h1>
                {activeSectionId === 'all_pages' ? (
                    sectionsData.map((section) => (
                        <SectionPage key={section.id} section={section} onParagraphClick={handleParagraphClick} />
                    ))
                ) : (
                    activeSection && <SectionPage section={activeSection} onParagraphClick={handleParagraphClick} />
                )}
            </div>

            <div id="navbar" className="fixed opacity-20 md:opacity-100 right-0 top-0 h-screen w-16 md:w-28 md:bg-blue-800 text-white py-4 px-0 flex flex-col md:shadow-lg flex-shrink-0">
                <button
                    onClick={toggleContentExpand}
                    className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 self-center"
                    aria-label="Expand or contract main content"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5L4 12L9 19" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5L20 12L15 19" />
                    </svg>
                </button>
                <nav id="page_buttons" ref={navListRef} className="hidden md:block flex-1 m-2 my-4 overflow-y-auto pt-2 bg-blue-700 rounded-md">
                    <ul className="space-y-0">
                        {sectionsData.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => handleSetActiveSectionId(section.id)}
                                    className={`w-full text-center py-4 px-0 text-base ${updatePageButtonPrez(section.id)} focus:outline-none rounded-none`}
                                    data-section-id={section.id}
                                >
                                    {section.navTitle}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => handleSetActiveSectionId('all_pages')}
                                className={`w-full text-center py-4 px-0 text-base ${updatePageButtonPrez('all_pages')} focus:outline-none rounded-none`}
                                data-section-id="all_pages"
                            >
                                All
                            </button>
                        </li>
                    </ul>
                </nav>

                <div id="nav_buttons" className="flex flex-col items-center space-y-4 justify-center h-full md:h-auto">
                    <button
                        onClick={() => scrollToSubheader('prev')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                        aria-label="Scroll to previous subsection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollToSubheader('next')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                        aria-label="Scroll to next subsection"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNextPage}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${activeSectionId === 'all_pages' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Go to next page"
                        disabled={activeSectionId === 'all_pages'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToPrevPage}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${activeSectionId === 'all_pages' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label="Go to prev page"
                        disabled={activeSectionId === 'all_pages'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>

                <button
                    onClick={scrollToTop}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 self-center"
                    aria-label="Scroll to top"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>

            <ContentSwitcherOverlay 
                setAppTitle={setAppTitle}
                setSectionsData={setSectionsData}
                setActiveSectionId={setActiveSectionId} 
                onSelect={handleCloseChooser} />

            <FullscreenOverlay content={fullscreenContent} onClose={handleCloseFullscreen} />
        </div>
    );
};

