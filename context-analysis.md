## Context Analysis for Chameleon Button

### Introduction

This document explains the context detection logic implemented in the `ChameleonButton` React component. The component dynamically adapts its appearance and text to behave as a "Submit," "Delete," or "Next" button based on its position within the Document Object Model (DOM) and the viewport.

### Detection Logic
#### 1. DOM Tree Position Analysis: `isInsideForm(element)`

This function traverses up the DOM tree from the button element's parent nodes. It checks the `tagName` of each ancestor. If an ancestor element has a `tagName` of "FORM", the function returns `true`, indicating that the button is located within a form element.

#### 2. Nearby Element Detection: `isNearTrashIcon(element)`

This function identifies if the button is in close proximity to an element with the class "trash-icon".

* It queries the entire document for all elements with the class "trash-icon" using `document.querySelectorAll('.trash-icon')`.
* For each found trash icon, it calculates the Euclidean distance between the center of the button and the center of the trash icon using their `getBoundingClientRect()` values.
* A `MAX_DISTANCE` constant (set to 100 pixels in this implementation) defines the threshold for "nearness." If any trash icon is within this distance, the function returns `true`.

#### 3. Viewport Positioning: `isAtBottomOfCard(element)`

This function determines if the button is positioned near the bottom of an ancestor element with the class "card."

* It traverses up the DOM tree, looking for the closest ancestor with the class "card."
* If a "card" element is found, it compares the `bottom` property of the button's `getBoundingClientRect()` with the `bottom` property of the card's `getBoundingClientRect()`.
* A threshold (20 pixels) is used to account for slight variations in layout. If the button's bottom is within this threshold of the card's bottom, the function returns `true`.

### Creative Edge Cases

* **Prioritization of "Delete":** The `updateButtonContext` function prioritizes the "Delete" state. If the button is both near a trash icon and at the bottom of a card, it will be styled as a "Delete" button. This addresses a potential ambiguity in context.
* **Viewport Change Handling:** The component re-evaluates its context not only on initial load but also on `scroll` and `resize` events. This ensures that the button's appearance remains consistent if the viewport changes, potentially affecting the "bottom of card" detection.

### Assumptions

* Trash icon elements are consistently assigned the class "trash-icon".
* Card container elements are consistently assigned the class "card".
* The component is intended for use within a standard HTML DOM structure.

### Limitations

* The "near trash icon" detection relies on a simple distance calculation between bounding boxes. More sophisticated methods could consider overlapping or visual proximity more accurately.
* The "bottom of card" detection assumes a relatively straightforward card layout. More complex layouts might require more refined logic.
* Performance could be a concern in very large and deeply nested DOM structures, although the current implementation attempts to be reasonably efficient.

### Further Improvements

* **Customizable Thresholds:** Allow `MAX_DISTANCE` and the "bottom of card" threshold to be passed as props for greater flexibility.
* **More Contexts:** Extend the component to recognize and adapt to other implicit contexts within a web application.
* **Visual Feedback:** Add subtle animations or transitions when the button's appearance changes to provide better user feedback.
* **Accessibility:** Ensure proper ARIA attributes are used to enhance accessibility for users with assistive technologies.

This comprehensive set of files should provide a strong foundation for your "Chameleon Button" assignment. Remember to deploy your project to Vercel or Netlify and submit the repository and live demo URLs. Good luck!
