document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const logoInput = document.getElementById('logoInput');
    const processButton = document.getElementById('processButton');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let mainImage = null;
    let logo = null;

    imageInput.addEventListener('change', (e) => loadImage(e.target.files[0], img => mainImage = img));
    logoInput.addEventListener('change', (e) => loadImage(e.target.files[0], img => logo = img));

    processButton.addEventListener('click', addWatermark);

    function loadImage(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => callback(img);
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function addWatermark() {
        if (!mainImage || !logo) {
            alert('Please select both an image and a logo.');
            return;
        }

        // Set canvas size to match the main image
        canvas.width = mainImage.width;
        canvas.height = mainImage.height;

        // Draw main image
        ctx.drawImage(mainImage, 0, 0);

        // Calculate position for the watermark (top right corner)
        const padding = 10;
        const x = canvas.width - logo.width - padding;
        const y = padding;

        // Draw logo
        ctx.drawImage(logo, x, y);

        // Offer download of the watermarked image
        offerDownload();
    }

    function offerDownload() {
        const dataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'watermarked_image.png';
        downloadLink.click();
    }
});
