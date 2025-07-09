// script.js
// This file is currently minimal as the website is primarily informational.
// You can add JavaScript functionality here in the future, such as:
// - Smooth scrolling
// - Interactive elements
// - Dynamic content loading

document.addEventListener('DOMContentLoaded', () => {
    console.log('Roblox Multi-Instance Launcher website loaded successfully!');
    // Example of a simple interactive element (uncomment to use):
    // const header = document.querySelector('header h1');
    // header.addEventListener('click', () => {
    //     alert('Header clicked!');
    // });
});

/**
 * Copies the text content of a specified HTML element to the clipboard.
 * Provides visual feedback on the button.
 * @param {string} elementId The ID of the element whose text content should be copied.
 * @param {HTMLElement} buttonElement The button element that triggered the copy action.
 */
function copyCode(elementId, buttonElement) {
    const codeElement = document.getElementById(elementId);
    if (codeElement) {
        const textToCopy = codeElement.textContent;

        // Create a temporary textarea element to hold the text
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = textToCopy;
        document.body.appendChild(tempTextArea);

        // Select the text and copy it
        tempTextArea.select();
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard:', textToCopy);
            // Provide visual feedback
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Copied!';
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 2000); // Revert text after 2 seconds
        } catch (err) {
            console.error('Failed to copy text:', err);
            // Fallback for older browsers or environments where execCommand might fail
            // You could show a message to the user to manually copy
            const originalText = buttonElement.textContent;
            buttonElement.textContent = 'Failed!';
            setTimeout(() => {
                buttonElement.textContent = originalText;
            }, 2000);
        } finally {
            // Remove the temporary textarea
            document.body.removeChild(tempTextArea);
        }
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}
