setTimeout(() => {
    const envelope = document.getElementById('envelope');
    const envelopeInstruction = document.getElementById('envelope-instruction');
    envelopeInstruction.style.transition = 'opacity 1s ease';
    envelopeInstruction.style.opacity = '0.5';

    // Remove inline opacity when hover effect is applied
    function onMouseEnter() {
        envelopeInstruction.style.transition = 'opacity 0.6s ease';
        envelopeInstruction.style.opacity = '0';
    }
    function onMouseLeave() {
        envelopeInstruction.style.transition = 'opacity 0.6s ease';
        envelopeInstruction.style.opacity = '0.5';
    }
    envelope.addEventListener('mouseenter', onMouseEnter);
    envelope.addEventListener('mouseleave', onMouseLeave);

    // Remove hover listeners once clicked so they don't fight the click handler
    envelope.addEventListener('click', () => {
        envelope.removeEventListener('mouseenter', onMouseEnter);
        envelope.removeEventListener('mouseleave', onMouseLeave);
    }, { once: true });
}, 1000);

document.getElementById('envelope').addEventListener('click', function() {
    this.classList.add('open');
    var introContainer = document.querySelector('#intro-fader .container');
    if (introContainer) {
        var coupleNames = introContainer.querySelector('.couple-names-intro');
        var date = introContainer.querySelector('.date-intro');
        var instruction = introContainer.querySelector('.envelope-instruction');
        if (coupleNames) { coupleNames.style.opacity = '0'; }
        if (date) { date.style.opacity = '0'; }
        if (instruction) { instruction.style.opacity = '0'; }
    }
    setTimeout(() => {
        this.style.transition = 'opacity 1s ease';
        this.style.opacity = '0';
        // Fade out intro-fader (background, overlay, envelope)
        var introFader = document.getElementById('intro-fader');
        if (introFader) {
            introFader.classList.add('fade-out');
        }
        setTimeout(() => {
            if (introFader) {
                introFader.style.display = 'none';
            }
            document.body.style.background = 'white';
            document.getElementById('content').style.display = 'block';
            // Show and fade out white-fader
            var whiteFader = document.getElementById('white-fader');
            if (whiteFader) {
                whiteFader.style.display = 'block';
                // Force reflow for transition
                void whiteFader.offsetWidth;
                whiteFader.classList.add('fade-out');
                setTimeout(() => {
                    whiteFader.parentNode.removeChild(whiteFader);
                    // Initialize countdown after envelope animation completes
                    initCountdown();
                    // Initialize gallery masonry layout
                    initGallery();
                    // Initialize navigation interactions
                    initNav();
                }, 1000);
            }
        }, 500);
    }, 2500);
});

let navInitialized = false;

function initNav() {
    if (navInitialized) {
        return;
    }

    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.nav-overlay');
    const overlayClose = document.querySelector('.nav-overlay-close');

    if (!toggle || !overlay || !nav) {
        return;
    }

    navInitialized = true;

    const updateNavScroll = () => {
        if (window.scrollY > 20) {
            nav.classList.add('is-scrolled');
        } else {
            nav.classList.remove('is-scrolled');
        }
    };

    updateNavScroll();
    window.addEventListener('scroll', updateNavScroll, { passive: true });

    const closeNav = () => {
        overlay.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
    };

    const openNav = () => {
        overlay.classList.add('is-open');
        toggle.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('nav-open');
    };

    toggle.addEventListener('click', (event) => {
        event.stopPropagation();
        if (overlay.classList.contains('is-open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    overlay.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link || event.target === overlay) {
            closeNav();
        }
    });

    if (overlayClose) {
        overlayClose.addEventListener('click', closeNav);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeNav();
        }
    });
}

// Countdown Timer Logic
function initCountdown() {
    const weddingDate = new Date('2026-07-04T14:00:00+01:00');

    function padZero(num, length = 2) {
        return String(num).padStart(length, '0');
    }

    let countdownInterval = null;

    function updateCountdown() {
        const now = new Date();
        const timeLeft = weddingDate - now;

        // Check if wedding has passed
        if (timeLeft <= 0) {
            document.getElementById('countdown-timer').style.display = 'none';
            document.getElementById('celebration-message').style.display = 'block';
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = padZero(days, 3);
        document.getElementById('hours').textContent = padZero(hours);
        document.getElementById('minutes').textContent = padZero(minutes);
        document.getElementById('seconds').textContent = padZero(seconds);
    }

    // Initial update
    updateCountdown();

    // Update every second
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Gallery Masonry Layout
function initGallery() {
    function resizeGalleryItems() {
        const galleryGrid = document.querySelector('.gallery-grid');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!galleryGrid || galleryItems.length === 0) return;

        // Get computed styles to determine actual column count
        const gridComputedStyle = window.getComputedStyle(galleryGrid);
        const gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;

        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img || !img.complete) return;

            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;
            const aspectRatio = imgWidth / imgHeight;

            // Reset any previous column span
            item.style.gridColumn = '';

            // Determine column span based on aspect ratio and available columns
            // Only span multiple columns on desktop (3 columns)
            if (gridColumnCount >= 3) {
                // Landscape images (wider than 4:3) can span 2 columns
                if (aspectRatio > 1.33) {
                    item.style.gridColumn = 'span 2';
                }
                // Portrait and square images span 1 column (default)
            }
            // On tablet/mobile, all images span their natural width (1 column)
        });
    }

    // Wait for images to load
    const galleryImages = document.querySelectorAll('.gallery-item img');
    let loadedImages = 0;

    galleryImages.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
                if (loadedImages === galleryImages.length) {
                    resizeGalleryItems();
                }
            });
        }
    });

    // If all images are already loaded (from cache)
    if (loadedImages === galleryImages.length) {
        resizeGalleryItems();
    }

    // Recalculate on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeGalleryItems, 100);
    });
}

// Initialize gallery when content is visible
if (document.getElementById('content').style.display !== 'none') {
    initGallery();
    initNav();
}
