document.addEventListener('DOMContentLoaded', () => {
    const revealBox = document.getElementById('reveal-box');
    const fullscreenText = document.getElementById('fullscreen-text');

    let isDragging = false;
    let startX, startY;

    revealBox.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);

    function startDragging(e) {
        isDragging = true;
        startX = e.clientX - revealBox.offsetLeft;
        startY = e.clientY - revealBox.offsetTop;
    }

    function drag(e) {
        if (!isDragging) return;

        let newX = e.clientX - startX;
        let newY = e.clientY - startY;

        // Ensure the box stays within the viewport
        newX = Math.max(0, Math.min(newX, window.innerWidth - revealBox.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - revealBox.offsetHeight));

        revealBox.style.left = newX + 'px';
        revealBox.style.top = newY + 'px';

        updateTextVisibility();
    }

    function stopDragging() {
        isDragging = false;
    }

    function updateTextVisibility() {
        const boxRect = revealBox.getBoundingClientRect();
        fullscreenText.style.clipPath = `inset(${boxRect.top}px ${window.innerWidth - boxRect.right}px ${window.innerHeight - boxRect.bottom}px ${boxRect.left}px)`;
    }

    // Initial text visibility update
    updateTextVisibility();
});
