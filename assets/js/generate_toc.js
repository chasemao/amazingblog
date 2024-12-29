// Function to generate a Table of Contents (TOC)
function generateTOC(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Container not found');
        return;
    }

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    // Filter out headings that appear before the container
    const filteredHeadings = headings.filter(heading => heading.compareDocumentPosition(container) & Node.DOCUMENT_POSITION_PRECEDING);

    if (filteredHeadings.length === 0) {
        console.warn('No relevant headings found');
        return;
    }

    const toc = document.createElement('ul');
    toc.style.position = 'fixed';
    toc.style.top = '50%';
    toc.style.left = '10px';
    toc.style.transform = 'translateY(-50%)';
    toc.style.width = '200px';
    toc.style.maxHeight = '90vh';
    toc.style.overflowY = 'auto';
    toc.style.backgroundColor = '#f9f9f9';
    toc.style.border = '1px solid #ccc';
    toc.style.padding = '10px';
    toc.style.listStyleType = 'none';

    // Hide TOC on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = () => {
        toc.style.display = mediaQuery.matches ? 'none' : 'block';
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(); // Initial check

    filteredHeadings.forEach((heading) => {
        const level = parseInt(heading.tagName[1], 10); // Extract heading level (1-6)
        const id = heading.id || heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();

        // Ensure the heading has an ID for linking
        heading.id = id;

        const li = document.createElement('li');
        li.style.marginLeft = `${(level - 1) * 10}px`; // Indentation based on level

        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.style.textDecoration = 'none';
        link.style.color = '#000';

        link.addEventListener('click', () => {
            document.querySelectorAll('#toc-container a').forEach(a => a.style.fontWeight = 'normal');
            link.style.fontWeight = 'bold';
        });

        li.appendChild(link);
        toc.appendChild(li);
    });

    container.appendChild(toc);

    // Highlight the active section when scrolling
    window.addEventListener('scroll', () => {
        let activeHeading = null;

        filteredHeadings.forEach((heading) => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 50 && rect.bottom >= 50) {
                activeHeading = heading;
            }
        });

        if (activeHeading) {
            const activeLink = toc.querySelector(`a[href="#${activeHeading.id}"]`);
            if (activeLink) {
                document.querySelectorAll('#toc-container a').forEach(a => a.style.fontWeight = 'normal');
                activeLink.style.fontWeight = 'bold';
            }
        }
    });
}

// Usage: Call the function with the selector of the container where the TOC should be appended
generateTOC('#toc-container');
