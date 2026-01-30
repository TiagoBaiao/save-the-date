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
            // Show and fade out white-fader
            var whiteFader = document.getElementById('white-fader');
            if (whiteFader) {
                whiteFader.style.display = 'block';
                // Force reflow for transition
                void whiteFader.offsetWidth;
                whiteFader.classList.add('fade-out');
                setTimeout(() => {
                    whiteFader.parentNode.removeChild(whiteFader);
                }, 1000);
            }
        }, 1000);
    }, 800);
});
