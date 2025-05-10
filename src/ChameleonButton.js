import React, { useState, useEffect, useRef } from 'react';
import './ChameleonButton.css';

function ChameleonButton() {
  const [buttonText, setButtonText] = useState('Submit');
  const [buttonClass, setButtonClass] = useState('submit-button');
  const buttonRef = useRef(null);

  useEffect(() => {
    updateButtonContext(); // Initial context detection

    // Consider re-evaluating context on scroll or resize for viewport positioning
    const handleViewportChange = () => {
      updateButtonContext();
    };

    window.addEventListener('scroll', handleViewportChange);
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []); // Empty dependency array for initial setup

  const updateButtonContext = () => {
    const buttonElement = buttonRef.current;
    if (!buttonElement) return;

    let newText = 'Submit';
    let newClass = 'submit-button';

    // DOM Tree Position Analysis: Check if inside a form
    if (isInsideForm(buttonElement)) {
      newText = 'Submit';
      newClass = 'submit-button';
    }

    // Nearby Element Detection: Check if near a trash icon
    if (isNearTrashIcon(buttonElement)) {
      newText = 'Delete';
      newClass = 'delete-button';
    }

    // Viewport Positioning: Check if at the bottom of a card
    if (isAtBottomOfCard(buttonElement)) {
      newText = 'Next';
      newClass = 'next-button';
    }

    // Creative Edge Case: Prioritize "Delete" if near trash, even if at bottom of card
    if (isNearTrashIcon(buttonElement)) {
      newText = 'Delete';
      newClass = 'delete-button';
    }

    setButtonText(newText);
    setButtonClass(newClass);
  };

  const isInsideForm = (element) => {
    let parent = element.parentNode;
    while (parent) {
      if (parent.tagName === 'FORM') {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  };

  const isNearTrashIcon = (element) => {
    const MAX_DISTANCE = 100; // Adjust as needed
    const trashIcons = document.querySelectorAll('.trash-icon');
    const buttonRect = element.getBoundingClientRect();

    for (const icon of trashIcons) {
      const iconRect = icon.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(buttonRect.x - iconRect.x, 2) +
        Math.pow(buttonRect.y - iconRect.y, 2)
      );
      if (distance < MAX_DISTANCE) {
        return true;
      }
    }
    return false;
  };
  const isAtBottomOfCard = (element) => {
    let parent = element.parentNode;
    while (parent) {
      if (parent.classList.contains('card')) {
        const cardRect = parent.getBoundingClientRect();
        const buttonRect = element.getBoundingClientRect();
        // Check if the bottom of the button is within a threshold of the bottom of the card
        return buttonRect.bottom >= cardRect.bottom - 20; // Adjust threshold
      }
      parent = parent.parentNode;
    }
    return false;
  };

  return (
    <button ref={buttonRef} className={buttonClass}>
      {buttonText}
    </button>
  );
}

export default ChameleonButton;
