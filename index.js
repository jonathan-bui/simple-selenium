const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const { By } = webdriver;
const fs = require('fs');

const driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get('https://www.inquirer.com');

let fonts = {};
let classNames = {};

let output = {
    classNames,
    fonts
};

const scDir = './screenshots';

if (!fs.existsSync(scDir)){
    fs.mkdirSync(scDir);
}

const expandElems = async () => {
    // retrieve all elements that are buttons that expand/collapse content
    const expandableElems = await driver.findElements(By.xpath('//button[@aria-expanded="false"]'));
    const n = expandableElems.length;

    for (let i = 0; i < n; i++) {
        try {
            // click to reveal hidden elements making them accesible from DOM
            await expandableElems[i].click();
            // search through nodes that have been revealed from expanded content
            await findTextNodes();
        } catch (e) {

        }
    }

    const data = JSON.stringify(output);
    fs.writeFileSync('output.json', data);
}

const findTextNodes = async () => {
    try {
        // retrieve all elements accesible from DOM
        const elements = await driver.findElements(By.xpath('//*'));
        const n = elements.length;

        for (let i = 0; i < n; i++) {
            let fontFamily = await elements[i].getCssValue('font-family');

            if (fontFamily === '"Ringside Regular SSm", Verdana, sans-serif') {
                let elem = elements[i];
                try {
                    // take screenshot of element that matches above font family
                    let sc = await elem.takeScreenshot(true);
                    fs.writeFileSync(`${scDir}/found_${i}`, sc, 'base64');

                    // retrieve classes from element that has above font family
                    let className = await elem.getAttribute('class');

                    if (classNames[className] >= 0) {
                        classNames[className]++;
                    } else {
                        classNames[className] = 1;
                    }
                } catch (e) {

                }
            }

            if (fonts[fontFamily] >= 0) {
                fonts[fontFamily]++;
            } else {
                fonts[fontFamily] = 1;
            }
        }

    } catch (e) {

    }
}

expandElems();
