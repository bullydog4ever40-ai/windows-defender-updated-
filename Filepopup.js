(function() {
    // Function to create a custom popup with a button
    function createPopup(content, buttonLabel, buttonAction) {
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
        popupContainer.style.maxWidth = '500px';
        popupContainer.style.overflow = 'auto';

        // Add content to popup
        const contentElement = document.createElement('p');
        contentElement.textContent = content;
        popupContainer.appendChild(contentElement);

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

    // Fetch and display message.txt
    fetch('message.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not find message.txt');
            }
            return response.text();
        })
        .then(text => {
            // Create popup with a button to open instructions.txt
            createPopup(text, 'Open Instructions.txt', function() {
                fetch('instructions.txt')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Could not find instructions.txt');
                        }
                        return response.text();
                    })
                    .then(instrText => {
                        createPopup(instrText, '', null); // No button for instructions popup
                    })
                    .catch(error => {
                        createPopup('Error reading instructions.txt: ' + error.message, '', null);
                    });
            });
        })
        .catch(error => {
            createPopup('Error reading message.txt: ' + error.message, '', null);
        });
})();
