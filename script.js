// ===================================
// RAMADAN WEBSITE - INTERACTIVE FEATURES
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTS ===
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollProgress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('.section');

    // === MOBILE MENU TOGGLE ===
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // === SMOOTH SCROLLING ===
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === SCROLL PROGRESS BAR ===
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });

    // === NAVBAR SCROLL EFFECT ===
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // === ACTIVE SECTION HIGHLIGHTING ===
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -66%',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // === FADE IN ANIMATIONS ===
    const fadeElements = document.querySelectorAll('.fade-in-up');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                fadeObserver.unobserve(entry.target);
            }
        });
    };

    const fadeObserver = new IntersectionObserver(fadeObserverCallback, fadeObserverOptions);
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        fadeObserver.observe(element);
    });

    // === CARD HOVER EFFECTS ===
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // === SMOOTH SCROLL TO TOP ===
    const heroButtons = document.querySelectorAll('.hero-cta .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === DYNAMIC GREETING BASED ON TIME ===
    const updateGreeting = () => {
        const hour = new Date().getHours();
        const heroSubtitle = document.querySelector('.hero-subtitle');

        if (heroSubtitle) {
            let greeting = 'A Comprehensive Guide to';

            if (hour >= 5 && hour < 12) {
                greeting = 'As-salamu alaykum! Welcome to';
            } else if (hour >= 12 && hour < 18) {
                greeting = 'As-salamu alaykum! Explore';
            } else if (hour >= 18 && hour < 22) {
                greeting = 'As-salamu alaykum! Discover';
            } else {
                greeting = 'As-salamu alaykum! Learn about';
            }

            // Only update if it's the default text
            if (heroSubtitle.textContent === 'A Comprehensive Guide to') {
                heroSubtitle.textContent = greeting;
            }
        }
    };

    updateGreeting();

    // === KEYBOARD NAVIGATION ===
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go to home
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Press 'T' to go to top
        if (e.key === 't' || e.key === 'T') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // === PERFORMANCE OPTIMIZATION ===
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            // Scroll-dependent operations are already handled above
        });
    });

    // === ACCESSIBILITY ENHANCEMENTS ===
    // Add aria-current to active nav link
    const updateAriaCurrent = () => {
        navLinks.forEach(link => {
            if (link.classList.contains('active')) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    // Call on scroll
    window.addEventListener('scroll', updateAriaCurrent);

    // === CONSOLE MESSAGE ===
    console.log('%c🌙 The Month of Ramadan 🌙', 'font-size: 20px; font-weight: bold; color: #F59E0B;');
    console.log('%cBased on the work of Dr. Farhat Hashmi', 'font-size: 14px; color: #14B8A6;');
    console.log('%cMay Allah accept our fasts and prayers. Ameen.', 'font-size: 12px; color: #9F7AEA;');

    // === EASTER EGG: ISLAMIC PATTERN GENERATOR ===
    // Press Ctrl+Shift+P to see a beautiful pattern in console
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'P') {
            console.clear();
            console.log('%c' + '★'.repeat(50), 'color: #F59E0B;');
            console.log('%c☪ Ramadan Mubarak! ☪', 'font-size: 24px; font-weight: bold; color: #6B46C1;');
            console.log('%c' + '★'.repeat(50), 'color: #F59E0B;');
        }
    });

    // ===================================
    // BOOKMARK SYSTEM
    // ===================================
    class BookmarkManager {
        constructor() {
            this.bookmarks = this.loadBookmarks();
            this.init();
        }

        init() {
            this.addBookmarkButtons();
            this.updateBookmarkUI();
        }

        loadBookmarks() {
            const saved = localStorage.getItem('ramadan_bookmarks');
            return saved ? JSON.parse(saved) : [];
        }

        saveBookmarks() {
            localStorage.setItem('ramadan_bookmarks', JSON.stringify(this.bookmarks));
        }

        addBookmarkButtons() {
            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                if (sectionId && sectionId !== 'home') {
                    const header = section.querySelector('.section-header, .hero-content');
                    if (header) {
                        const bookmarkBtn = document.createElement('button');
                        bookmarkBtn.className = 'bookmark-btn';
                        bookmarkBtn.setAttribute('data-section', sectionId);
                        bookmarkBtn.innerHTML = '🔖';
                        bookmarkBtn.title = 'Bookmark this section';
                        header.style.position = 'relative';
                        header.appendChild(bookmarkBtn);

                        bookmarkBtn.addEventListener('click', () => this.toggleBookmark(sectionId));
                    }
                }
            });
        }

        toggleBookmark(sectionId) {
            const index = this.bookmarks.indexOf(sectionId);
            if (index > -1) {
                this.bookmarks.splice(index, 1);
            } else {
                this.bookmarks.push(sectionId);
            }
            this.saveBookmarks();
            this.updateBookmarkUI();
        }

        updateBookmarkUI() {
            document.querySelectorAll('.bookmark-btn').forEach(btn => {
                const sectionId = btn.getAttribute('data-section');
                if (this.bookmarks.includes(sectionId)) {
                    btn.classList.add('bookmarked');
                    btn.title = 'Remove bookmark';
                } else {
                    btn.classList.remove('bookmarked');
                    btn.title = 'Bookmark this section';
                }
            });
        }

        getBookmarks() {
            return this.bookmarks;
        }
    }

    // ===================================
    // READING PROGRESS TRACKER
    // ===================================
    class ProgressTracker {
        constructor() {
            this.readSections = this.loadProgress();
            this.sectionObservers = new Map();
            this.totalSections = 8; // We have 8 content sections (excluding home)
            this.init();
        }

        init() {
            this.addProgressIndicator();
            this.updateProgressUI();
            this.trackSections();
        }

        loadProgress() {
            // Check version to clear old data
            const version = localStorage.getItem('ramadan_progress_version');
            if (version !== '2.0') {
                // Clear old progress data
                localStorage.removeItem('ramadan_progress');
                localStorage.setItem('ramadan_progress_version', '2.0');
                return [];
            }

            const saved = localStorage.getItem('ramadan_progress');
            return saved ? JSON.parse(saved) : [];
        }

        saveProgress() {
            localStorage.setItem('ramadan_progress', JSON.stringify(this.readSections));
        }

        trackSections() {
            const progressObserverOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.3 // Lower threshold for better detection
            };

            sections.forEach(section => {
                const sectionId = section.getAttribute('id');
                if (sectionId && sectionId !== 'home') {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                // Mark as read after viewing for 2 seconds
                                setTimeout(() => {
                                    if (entry.isIntersecting && !this.readSections.includes(sectionId)) {
                                        this.readSections.push(sectionId);
                                        this.saveProgress();
                                        this.updateProgressUI();
                                    }
                                }, 2000);
                            }
                        });
                    }, progressObserverOptions);

                    observer.observe(section);
                    this.sectionObservers.set(sectionId, observer);
                }
            });
        }

        updateProgressUI() {
            const readCount = this.readSections.length;
            const percentage = Math.round((readCount / this.totalSections) * 100);

            // Update progress indicator
            const progressIndicator = document.getElementById('progressIndicator');
            if (progressIndicator) {
                progressIndicator.textContent = `${percentage}%`;
                progressIndicator.title = `${readCount} of ${this.totalSections} sections read`;
            }
        }

        addProgressIndicator() {
            const indicator = document.createElement('div');
            indicator.id = 'progressIndicator';
            indicator.className = 'progress-indicator';
            indicator.textContent = '0%';
            indicator.title = 'Reading progress';
            document.body.appendChild(indicator);
        }

        resetProgress() {
            this.readSections = [];
            this.saveProgress();
            this.updateProgressUI();
        }

        getProgress() {
            return {
                read: this.readSections.length,
                total: this.totalSections,
                percentage: Math.round((this.readSections.length / this.totalSections) * 100)
            };
        }
    }

    // Initialize bookmark and progress systems
    window.bookmarkManager = new BookmarkManager();
    window.progressTracker = new ProgressTracker();
});

// === UTILITY FUNCTIONS ===

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Get current section
function getCurrentSection() {
    const sections = document.querySelectorAll('.section');
    let currentSection = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.getAttribute('id');
        }
    });

    return currentSection;
}

// Export functions for potential external use
window.ramadanWebsite = {
    scrollToElement,
    getCurrentSection
};
