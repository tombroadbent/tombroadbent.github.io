window.appTitle = 'Demo';
window.sectionsData = [
    {
        id: 'intro',
        title: 'Tips & Tricks',
        navTitle: 'Intro',
        content: [
            {
                type: 'paragraph',
                text: 'Welcome! Here are some tips to help you get the most out of this content:',
            },
            { type: 'subheader', text: 'Content Interaction' },

            {
                type: 'list-item-hanging-indent',
                items: [
                    '**Tap to Expand Text & Images:** Tap on most **paragraphs** to see them in a larger, easier-to-read font. Tapping on an **image** will also open a full-screen version.',
                    '**Long Press for Scripture References:** Scripture reference like John 3:16 support **long-press** to open the passage directly in your Church Library app.',
                ],
            },
            { type: 'subheader', text: 'Section Navigation' },
            {
                type: 'list-item-hanging-indent',
                items: [
                    '**Left/Right:** Use the **left and right arrow buttons** to move between primary sections.',
                    '**Up/Down:** Use the **up and down arrow buttons** to navigate subsections within a primary section.',
                    '**Section Shortcuts:** Quick access to each primary section (hidden on small screens).',
                    '**All Shortcut:** At the bottom of the section shortcuts, **All** displays the entire content and saves current position (other section buttons go to the top).',
                ],
            },
            { type: 'subheader', text: 'Mobile & Tablet' },
            {
                type: 'list-item-hanging-indent',
                items: [
                    '**iPad "Slide Over":** The **< > button** (top) creates space for the "Slide Over" feature, allowing you to use your Library app side-by-side with this content.',
                    '**Hidden Shortcuts on Mobile:** On smaller screens, section shortcuts are hidden to maximize content.'
                ],
            },
        ],
    },
    {
        id: 'paragraph_and_subheader_demo',
        title: 'Basic Paragraph and Subheader Demonstration',
        navTitle: 'Basic',
        content: [
            { type: 'subheader', text: 'Introduction to Lorum Ipsum' },
            {
                type: 'paragraph',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
                type: 'paragraph',
                text: 'This section demonstrates the standard paragraph type. It is suitable for blocks of descriptive text, narratives, or extended explanations. The content here is placeholder text, often used in design and development to simulate real content without distracting from the layout.',
            },
            { type: 'subheader', text: 'Another Subheader Example' },
            {
                type: 'paragraph',
                text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
            },
        ],
    },
    {
        id: 'quote_and_question_demo',
        title: 'Quote and Question Frame Demonstration',
        navTitle: 'Quotes',
        content: [
            { type: 'subheader', text: 'Demonstrating the Quote Frame' },
            {
                type: 'paragraph',
                text: 'Here we see an example of a quote formatted for emphasis. This type is ideal for direct citations from sources, speeches, or scriptures.',
            },
            {
                type: 'quote-frame',
                text: '“This is a quote demonstration how quotes are formatted. Lorem ipsum dolor sit amet, consectetur adipiscing elit.” — Someone Important',
            },
            {
                type: 'paragraph',
                text: 'Quisque egestas nisl eu enim consectetur, in volutpat mi aliquet. Phasellus eu enim vel lectus finibus efficitur. Mauris vitae nulla at libero pretium bibendum.',
            },
            { type: 'subheader', text: 'Demonstrating the Question Frame' },
            {
                type: 'paragraph',
                text: 'The question frame is designed to prompt discussion or introspection. It can contain one or more questions related to the preceding content.',
            },
            {
                type: 'question-frame',
                questions: [
                    'How does this quote make you feel about the topic?',
                    'What are some ways you might apply this principle in your life?',
                    'Can you think of another example that illustrates this point?',
                ],
            },
            {
                type: 'paragraph',
                text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            },
        ],
    },
    {
        id: 'list_and_image_demo',
        title: 'List and Image Demonstration',
        navTitle: 'Lists',
        content: [
            { type: 'subheader', text: 'Demonstrating List Items (Hanging Indent)' },
            {
                type: 'paragraph',
                text: 'This is an example of a list with a hanging indent style, suitable for bullet points or enumerations where the first line of each item aligns differently from subsequent lines.',
            },
            {
                type: 'list-item-hanging-indent',
                items: [
                    '**First Item:** Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
                    '**Second Item:** Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
                    '**Third Item:** Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum eu odio.',
                    '**Fourth Item:** Nulla facilisi. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
                ],
            },
            { type: 'subheader', text: 'Demonstrating the Image Capability' },
            {
                type: 'paragraph',
                text: 'Images can be included with both a standard `src` and a `fullscreenSrc` for a higher resolution version when clicked. A caption and alt text provide context and accessibility.',
            },
            {
                type: 'image',
                src: 'https://mountainhouse.com/cdn/shop/articles/mountain-lake-featured_1024x.jpg',
                fullscreenSrc: 'https://mountainhouse.com/cdn/shop/articles/mountain-lake-featured_1024x.jpg', // Using the same image for fullscreen for simplicity
                alt: 'A serene mountain lake with a forest vista.',
                caption: 'A beautiful mountain lake, illustrating how images can be integrated into the content.',
            },
            {
                type: 'paragraph',
                text: 'Curabitur sit amet turpis in massa volutpat rutrum et at risus. Nulla facilisi. Praesent vitae velit ac lectus ornare commodo. Suspendisse potenti.',
            },
        ],
    },
    {
        id: 'scripture_demo',
        title: 'New Testament Scripture Demonstration',
        navTitle: 'Bible',
        content: [
            { type: 'subheader', text: 'Scripture Citation Blocks' },
            {
                type: 'paragraph',
                text: 'This section showcases the scripture citation block, ideal for presenting scriptural passages with accompanying contextual information. Only New Testament scriptures are used here as per the request.',
            },
            {
                type: 'scripture-citation-blocks',
                items: [
                    {
                        context: 'Context for Matthew 5:14–16: Jesus delivered the Sermon on the Mount, teaching His disciples about their role as the "light of the world." He emphasized that their good works should be visible to others, not to boast, but to glorify God.',
                        scripture: 'Matthew 5:14–16',
                        citation: 'Ye are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.'
                    },
                    {
                        context: 'Context for John 3:16: This well-known verse encapsulates the essence of God\'s love and the plan of salvation, highlighting His willingness to give His only begotten Son for the redemption of humanity.',
                        scripture: 'John 3:16',
                        citation: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.'
                    },
                    {
                        context: 'Context for Romans 8:28: Paul wrote to the Saints in Rome, offering reassurance that for those who love God and are called according to His purpose, all things, even challenges and adversities, can work together for their good.',
                        scripture: 'Romans 8:28',
                        citation: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.'
                    },
                    {
                        context: 'Context for Philippians 4:13: Paul, while imprisoned, taught the Philippians about the source of his strength and contentment, regardless of his circumstances. He emphasized that he could do all things through Christ who strengthened him.',
                        scripture: 'Philippians 4:13',
                        citation: 'I can do all things through Christ which strengtheneth me.'
                    },
                    {
                        context: 'Context for James 1:5: James, the brother of the Lord, encouraged believers to seek wisdom from God with faith, promising that it would be given generously to those who ask without doubting.',
                        scripture: 'James 1:5',
                        citation: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.'
                    }
                ]
            },
        ],
    },
    {
        id: 'mixed_content_demo',
        title: 'Mixed Content Demonstration',
        navTitle: 'Mixed',
        content: [
            { type: 'subheader', text: 'Exploring Diverse Content Types' },
            {
                type: 'paragraph',
                text: 'This section combines various content types to illustrate how they can be used together to create rich and engaging material. We\'ll start with a general introduction, followed by a relevant quote, a thought-provoking question, a list of key points, and a scripture passage with context.',
            },
            {
                type: 'quote-frame',
                text: '“The strength of a community lies in its diversity of thought and expression. Embrace the full spectrum of possibilities.” — A Thought Leader',
            },
            {
                type: 'question-frame',
                questions: [
                    'How does the combination of different content elements enhance understanding?',
                    'What are the advantages of presenting information in varied formats?',
                ],
            },
            { type: 'subheader', text: 'Key Learnings from Content Integration' },
            {
                type: 'list-item-hanging-indent',
                items: [
                    '**Enhanced Engagement:** Mixing formats keeps readers interested and caters to different learning styles.',
                    '**Improved Comprehension:** Complex ideas can be broken down and presented in more digestible ways.',
                    '**Versatile Presentation:** Allows for a dynamic flow of information, from explanatory text to direct quotes and interactive questions.',
                    '**Accessibility:** Offers multiple avenues for users to absorb information, improving overall accessibility.',
                ],
            },
            { type: 'subheader', text: 'Divine Wisdom on Unity' },
            {
                type: 'paragraph',
                text: 'Just as various content types contribute to a cohesive whole, so too does unity among individuals lead to greater strength, as taught in the New Testament.',
            },
            {
                type: 'scripture-citation-blocks',
                items: [
                    {
                        context: 'Context for 1 Corinthians 12:12-14: Paul uses the analogy of the human body to explain the unity and diversity within the Christian community, emphasizing that each member, though different, is vital to the functioning of the whole.',
                        scripture: '1 Corinthians 12:12-14',
                        citation: 'For as the body is one, and hath many members, and all the members of that one body, being many, are one body: so also is Christ. For by one Spirit are we all baptized into one body, whether we be Jews or Gentiles, whether we be bond or free; and have been all made to drink into one Spirit. For the body is not one member, but many.'
                    }
                ]
            },
            {
                type: 'paragraph',
                text: 'This demonstrates how an image can seamlessly fit within a mixed content section, providing visual context or an aesthetic break between text blocks.',
            },
            {
                type: 'image',
                src: 'https://mountainhouse.com/cdn/shop/articles/mountain-lake-featured_1024x.jpg',
                fullscreenSrc: 'https://mountainhouse.com/cdn/shop/articles/mountain-lake-featured_1024x.jpg',
                alt: 'A serene mountain lake surrounded by a lush forest.',
                caption: 'A tranquil scene, highlighting the beauty found in diverse elements coming together.',
            },
            {
                type: 'paragraph',
                text: 'In conclusion, the ability to blend different content capabilities creates a richer, more effective, and more engaging user experience. Whether for educational materials, inspirational messages, or informational guides, a thoughtful combination of elements is key.',
            },
        ],
    },
];