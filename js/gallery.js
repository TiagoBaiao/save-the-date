// Gallery Masonry Layout
export function initGallery() {
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

