# Chameleon Button: A Context-Aware Component for Adaptive Interfaces

This project presents a React component, the "Chameleon Button," designed to dynamically adapt its appearance and functionality based on its implicit context within the Document Object Model (DOM) and the viewport. Rather than relying on explicit props, the button intelligently discerns its surroundings to present the most relevant action to the user.

## GitHub Repository

The source code for this project is available on GitHub: https://github.com/harshita-0310/chameleon-button.

## Core Requirements Demonstrated

* **Submit Button in Forms:** When the Chameleon Button is placed within an HTML `<form>` element, it automatically renders with the text "Submit" and appropriate styling. This is achieved through DOM tree position analysis, traversing up the DOM to identify the presence of a form ancestor.

* **Delete Button Near Trash Icons:** Upon detecting proximity to an element with the class `.trash-icon`, the button transforms into a red "Delete" button. This is implemented using nearby element detection, calculating the distance between the button and elements with the specified class within a defined threshold.

* **Next Button at Bottom of Cards:** When the Chameleon Button is positioned near the bottom of an element with the class `.card`, it changes to a blue "Next" button. This behavior is driven by viewport positioning analysis, comparing the button's position relative to the bottom of the identified card element.

## Context Detection Methods

* **DOM Tree Position Analysis:** The component traverses the DOM tree upwards from the button element to identify ancestor elements, specifically checking for the `<form>` tag.

* **Nearby Element Detection:** The component queries the DOM for elements with the class `.trash-icon` and calculates the distance between the button and these elements using their boundingClientRect. A predefined threshold determines "nearness."

* **Viewport Positioning:** The component identifies ancestor elements with the class `.card` and compares the button's bottom position to the card's bottom position within a specified tolerance to determine if it's at the bottom.

## Files in this Repository

* `src/ChameleonButton.js`: Contains the React component code, including state management and the logic for context detection and visual transformations.
* `src/ChameleonButton.css`: Holds the CSS styles applied to the button in its "Submit," "Delete," and "Next" states.
* `context-analysis.md`: Provides a detailed explanation of the implementation of each context detection method, the handling of potential edge cases, assumptions made, and any limitations of the current implementation.

## Usage (React)

1.  Import the component:

    ```javascript
    import ChameleonButton from './src/ChameleonButton';
    ```

2.  Use it in your JSX:

    ```jsx
    <ChameleonButton />
    ```

