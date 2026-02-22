(function() {
    // Function to create a custom popup with an image and optional button
    function createPopup(imageSrc, buttonLabel, buttonAction) {
        // Remove any existing popup to avoid overlap
        const existingPopup = document.getElementById('custom-popup');
        if (existingPopup) existingPopup.remove();

        // Create popup container
        const popupContainer = document.createElement('div');
        popupContainer.id = 'custom-popup';
        popupContainer.style.position = 'fixed';
        popupContainer.style.top = '50%';
        popupContainer.style.left = '50%';
        popupContainer.style.transform = 'translate(-50%, -50%)';
        popupContainer.style.background = '#fff';
        popupContainer.style.padding = '20px';
        popupContainer.style.border = '1px solid #000';
        popupContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        popupContainer.style.zIndex = '1000';
        popupContainer.style.maxWidth = '80%';
        popupContainer.style.maxHeight = '80%';
        popupContainer.style.overflow = 'auto';

        // Create image element
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.style.maxWidth = '100%';
        imgElement.style.maxHeight = '100%';
        imgElement.onerror = function() {
            const errorText = document.createElement('p');
            errorText.textContent = 'Error loading image: ' + imageSrc;
            popupContainer.appendChild(errorText);
        };
        popupContainer.appendChild(imgElement);

        // Add button if provided
        if (buttonLabel && buttonAction) {
            const button = document.createElement('button');
            button.textContent = buttonLabel;
            button.style.marginTop = '10px';
            button.style.padding = '5px 10px';
            button.style.cursor = 'pointer';
            button.onclick = function() {
                buttonAction();
                // Close the current popup after clicking the button (optional)
                popupContainer.remove();
            };
            popupContainer.appendChild(button);
        }

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.style.marginLeft = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            popupContainer.remove();
        };
        popupContainer.appendChild(closeButton);

        // Add popup to the document
        document.body.appendChild(popupContainer);
    }

    // Display MESSAGE.txt.png in a popup
    createPopup('MESSAGE.txt.png', 'Open Instructions.txt.png', function() {
        createPopup('instructions.txt.png', '', null); // No button for instructions popup
    });
})();
