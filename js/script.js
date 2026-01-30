document.getElementById('envelope').addEventListener('click', function() {
    this.classList.add('open');
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
        }, 1000);
    }, 800);
});
