// ===================================
// SEARCH FUNCTIONALITY
// ===================================

class SearchEngine {
    constructor() {
        this.searchIndex = [];
        this.searchModal = null;
        this.searchInput = null;
        this.searchResults = null;
        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.createSearchModal();
        this.setupKeyboardShortcuts();
    }

    buildSearchIndex() {
        // Index all content sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            const sectionId = section.getAttribute('id');
            const sectionTitle = section.querySelector('h2')?.textContent || '';
            const sectionContent = section.textContent;

            // Index paragraphs
            const paragraphs = section.querySelectorAll('p, li');
            paragraphs.forEach((para, paraIndex) => {
                this.searchIndex.push({
                    id: `${sectionId}-${paraIndex}`,
                    sectionId: sectionId,
                    sectionTitle: sectionTitle,
                    content: para.textContent.trim(),
                    element: para
                });
            });
        });
    }

    createSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.id = 'searchModal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-header">
                    <input type="text" id="searchInput" placeholder="Search the guide... (Ctrl+K)" autocomplete="off">
                    <button class="search-close" id="searchClose">✕</button>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-placeholder">
                        <span class="search-icon">🔍</span>
                        <p>Start typing to search through the Ramadan guide...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        this.searchModal = modal;
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');

        // Event listeners
        document.getElementById('searchClose').addEventListener('click', () => this.closeSearch());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeSearch();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            // Escape to close
            if (e.key === 'Escape' && this.searchModal.classList.contains('active')) {
                this.closeSearch();
            }
        });
    }

    openSearch() {
        this.searchModal.classList.add('active');
        this.searchInput.focus();
    }

    closeSearch() {
        this.searchModal.classList.remove('active');
        this.searchInput.value = '';
        this.searchResults.innerHTML = `
            <div class="search-placeholder">
                <span class="search-icon">🔍</span>
                <p>Start typing to search through the Ramadan guide...</p>
            </div>
        `;
    }

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.searchResults.innerHTML = `
                <div class="search-placeholder">
                    <span class="search-icon">🔍</span>
                    <p>Start typing to search through the Ramadan guide...</p>
                </div>
            `;
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        const results = [];

        this.searchIndex.forEach(item => {
            const content = item.content.toLowerCase();
            const index = content.indexOf(lowerQuery);

            if (index !== -1) {
                // Calculate relevance score
                let score = 0;
                if (item.sectionTitle.toLowerCase().includes(lowerQuery)) score += 10;
                if (index < 50) score += 5; // Boost if match is near start
                if (content.split(' ').some(word => word.startsWith(lowerQuery))) score += 3;

                results.push({
                    ...item,
                    matchIndex: index,
                    score: score
                });
            }
        });

        // Sort by relevance
        return results.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <span class="search-icon">😔</span>
                    <p>No results found for "${query}"</p>
                    <p class="search-hint">Try different keywords or check spelling</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => {
            const snippet = this.getSnippet(result.content, query, result.matchIndex);
            return `
                <div class="search-result-item" data-section="${result.sectionId}">
                    <div class="search-result-section">${result.sectionTitle}</div>
                    <div class="search-result-content">${snippet}</div>
                </div>
            `;
        }).join('');

        this.searchResults.innerHTML = `
            <div class="search-results-header">Found ${results.length} result${results.length > 1 ? 's' : ''}</div>
            ${resultsHTML}
        `;

        // Add click handlers
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const sectionId = item.getAttribute('data-section');
                this.closeSearch();
                this.scrollToSection(sectionId);
            });
        });
    }

    getSnippet(content, query, matchIndex) {
        const snippetLength = 150;
        const start = Math.max(0, matchIndex - 50);
        const end = Math.min(content.length, matchIndex + snippetLength);

        let snippet = content.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';

        // Highlight the query
        const regex = new RegExp(`(${query})`, 'gi');
        snippet = snippet.replace(regex, '<mark>$1</mark>');

        return snippet;
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchEngine = new SearchEngine();
});
