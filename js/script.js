document.getElementById('envelope').addEventListener('click', function() {
    this.classList.add('open');
    setTimeout(() => {
        this.style.transition = 'opacity 0.5s ease';
        this.style.opacity = '0';
        setTimeout(() => {
            document.body.style.background = 'white';
            document.getElementById('content').style.display = 'block';
            this.style.display = 'none';
        }, 500);
    }, 800);
});
