// script.js
// This file is currently minimal as the website is primarily informational.
// You can add JavaScript functionality here in the future, such as:
// - Smooth scrolling
// - Interactive elements
// - Dynamic content loading

document.addEventListener('DOMContentLoaded', () => {
    console.log('Roblox Multi-Instance Launcher website loaded successfully!');
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

        // Use the modern Clipboard API if available, fallback to execCommand
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log('Text copied to clipboard:', textToCopy);
                    // Provide visual feedback
                    const originalText = buttonElement.textContent;
                    buttonElement.textContent = 'Copied!';
                    setTimeout(() => {
                        buttonElement.textContent = originalText;
                    }, 2000); // Revert text after 2 seconds
                })
                .catch(err => {
                    console.error('Failed to copy text using Clipboard API:', err);
                    // Fallback to execCommand if Clipboard API fails (e.g., due to iframe restrictions)
                    fallbackCopyTextToClipboard(textToCopy, buttonElement);
                });
        } else {
            // Fallback for older browsers or environments without Clipboard API
            fallbackCopyTextToClipboard(textToCopy, buttonElement);
        }
    } else {
        console.error(`Element with ID "${elementId}" not found.`);
    }
}

/**
 * Fallback function to copy text to clipboard using document.execCommand.
 * @param {string} textToCopy The text string to copy.
 * @param {HTMLElement} buttonElement The button element for feedback.
 */
function fallbackCopyTextToClipboard(textToCopy, buttonElement) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    tempTextArea.style.position = 'fixed'; // Avoid scrolling to bottom
    tempTextArea.style.left = '-9999px'; // Hide off-screen
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();

    try {
        document.execCommand('copy');
        console.log('Text copied to clipboard using execCommand:', textToCopy);
        // Provide visual feedback
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Copied!';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000); // Revert text after 2 seconds
    } catch (err) {
        console.error('Failed to copy text using execCommand:', err);
        // Inform user about manual copy if all methods fail
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Failed!';
        setTimeout(() => {
            buttonElement.textContent = originalText;
        }, 2000);
    } finally {
        document.body.removeChild(tempTextArea);
    }
}
