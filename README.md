## In Search of _"Ringside Regular SSm", Verdana, sans-serif'_
### Problem
`"Ringside Regular SSm", Verdana, sans-serif'` is a font family Inquirer.com no longer supports. Identify all elements on the Inquirer.com homepage that has a computed style for font-family of `"Ringside Regular SSm", Verdana, sans-serif'`

### Goal
Identify elements on Inquirer homepage that have computed font-family of `"Ringside Regular SSm", Verdana, sans-serif'`

### Approach
My initial approach involved creating `<object data="https://www.inquirer.com"></object>` and attempting to parse through the DOM created by the object element but quickly ran into CORS restrictions :( sad.

I decided to look into Selenium WebDriver which, after making sense of the frustratingly sparse documentation, turned out to be a suitable tool for this problem. WebDriver allows you to automate the behavior of the browser while it is loading a page while also allowing access and interaction to DOM elements.

Using WebDriver I was able to perform 2 main operations for finding instances of `"Ringside Regular SSm", Verdana, sans-serif'`
1. Expand all expandable components to reveal any hidden elements that might have that family-font to the DOM
2. Extract the computed style of every element that exists on the DOM
- Keep track of occurences of all computed font-family
- Retrieve class names of elements that have font-family of `"Ringside Regular SSm", Verdana, sans-serif'`
- **Experimental**: take a screenshot of every element that has font-family `"Ringside Regular SSm", Verdana, sans-serif'`

### Installation
Dillinger requires Node.js v10+ to run.
Dillinger requires Chrome Browser

Installation:
`npm install`  

Run WebDriver:
`npm start`  

Google Chrome should open with https://www.inquirer.com/

Once the WebDriver finishes an `output.js` file should be created with a JSON object that details the classes and occurances that were found along with a folder `./screenshots` containing screen shots of elements




