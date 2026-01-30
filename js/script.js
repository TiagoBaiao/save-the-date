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
                    // Initialize countdown after envelope animation completes
                    initCountdown();
                }, 1000);
            }
        }, 1000);
    }, 800);
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
        const backSpan = document.getElementById(`${unit}-back`);

        if (card && backSpan) {
            // Set the new value on the back face before flipping
            backSpan.textContent = newValue;

            // Trigger flip animation
            card.classList.add('flipping');

            setTimeout(() => {
                // After animation completes, swap front and back values
                const frontSpan = document.getElementById(`${unit}-front`);
                frontSpan.textContent = newValue;
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

