document.getElementById('envelope').addEventListener('click', function() {
    this.classList.add('open');
    var introContainer = document.querySelector('#intro-fader .container');
    if (introContainer) {
        var coupleNames = introContainer.querySelector('.couple-names-intro');
        var date = introContainer.querySelector('.date-intro');
        var instruction = introContainer.querySelector('.envelope-instruction');
        if (coupleNames) { console.log("opacity"); coupleNames.style.opacity = '0'; }
        if (date) { console.log("opacity"); date.style.opacity = '0'; }
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
                }, 1000);
            }
        }, 500);
    }, 2500);
});

// Countdown Timer Logic
function initCountdown() {
    const weddingDate = new Date('2026-07-04T14:00:00+01:00');

    // Store previous values to detect changes
    let previousValues = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };

    // Flip animation timeout IDs
    let flipTimeouts = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    };

    function padZero(num, length = 2) {
        return String(num).padStart(length, '0');
    }

    function triggerFlip(unit, newValue) {
        const card = document.getElementById(`${unit}-card`);
        const frontSpan = document.getElementById(`${unit}-front`);
        const backSpan = document.getElementById(`${unit}-back`);

        if (card && backSpan && frontSpan) {
            // Set the new value on the back face before flipping
            backSpan.textContent = newValue;

            // Trigger flip animation
            card.classList.add('flipping');

            setTimeout(() => {
                // After animation completes, update front with new value
                frontSpan.textContent = newValue;
                // Remove flipping class to reset back card to starting position
                card.classList.remove('flipping');
            }, 600);
        }
    }

    function updateCountdown() {
        const now = new Date();
        const timeLeft = weddingDate - now;

        // Check if wedding has passed
        if (timeLeft <= 0) {
            document.getElementById('countdown-timer').style.display = 'none';
            document.getElementById('celebration-message').style.display = 'block';
            return;
        }

        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const currentValues = {
            days: padZero(days, 3),
            hours: padZero(hours),
            minutes: padZero(minutes),
            seconds: padZero(seconds)
        };

        // Check for changes and trigger flip animations
        Object.keys(currentValues).forEach(unit => {
            if (previousValues[unit] !== null && previousValues[unit] !== currentValues[unit]) {
                // Clear any pending flip
                if (flipTimeouts[unit]) {
                    clearTimeout(flipTimeouts[unit]);
                }
                triggerFlip(unit, currentValues[unit]);
            } else if (previousValues[unit] === null) {
                // Initial load - set values without animation
                document.getElementById(`${unit}-front`).textContent = currentValues[unit];
                document.getElementById(`${unit}-back`).textContent = currentValues[unit];
            }
        });

        // Store current values for next comparison
        previousValues = { ...currentValues };

        // Schedule flip animation 100ms before next second changes
        const msUntilNextSecond = 1000 - (timeLeft % 1000);
        if (msUntilNextSecond > 100) {
            flipTimeouts.seconds = setTimeout(() => {
                const nextSecond = Math.floor(((timeLeft - msUntilNextSecond) % (1000 * 60)) / 1000);
                triggerFlip('seconds', padZero(nextSecond));
            }, msUntilNextSecond - 100);
        }
    }

    // Initial update
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
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
}
