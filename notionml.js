//import fs to write out html file
const fs = require('fs');
const chalk = require('chalk');

//set up emoji mapping
const emojiMap = JSON.parse(fs.readFileSync("./emojiMap.json"));

function handleElement(tag, info) {
    if (tag == "h1" || tag == "heading-large" || tag == "hl") {
        return `\n\t<h1>${info.text ? info.text : ""}</h1>`
    }
}

//set up the HTML variable to store the html for the final site
let HTML = `<!-- If you are viewing this file in VSCode, press Alt+Z to eliminate the line wrap since images are stored as raw base64 data -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">`

//create the init function to get the heading icons and title set up
exports.init = (options) => {
    console.log(emojiMap)
    //handler for if the options passed isn't even an object
    if (typeof options != "object") {
        console.error(chalk.red(`${chalk.bold("Error:")} Options variable passed to create function was not an object, please refer to the ${chalk.underline("NotionML documentation")} for proper options structure`));
        return;
    }

    //set the title of the page and write the html for the title and whatnot
    global.title = options.title ? options.title : "NotionML Page";
    HTML += `\n\t<title>${title}</title>`;
    
    //handler for the page icon
    if (options.pageIcon) {
        //handler for if the user's pageIcon doesn't exist
        if (!Object.keys(emojiMap).includes(options.pageIcon.toLowerCase())) {
            console.error(chalk.red(`${chalk.bold("Error:")} Invalid keyword has been passed in the pageIcon variable, please refer to the ${chalk.underline("NotionML documentation")} for a list of valid keywords`));
            return;
        } else {
            global.pageIcon = emojiMap[options.pageIcon.toLowerCase()]
        }
    } else {
        //global.pageIcon = emojiMap.folder
    }
    //set the title icon (currently the icon is hosted on the imgdb link, maybe migrate later??)
    HTML += `\n\t<link rel="icon" type="image/png" href="https://i.ibb.co/3MVX78h/NML.png">\n\t<script src="https://unpkg.com/twemoji@latest/dist/twemoji.min.js" crossorigin="anonymous"></script>\n\t<script>MathJax = { tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] }, svg: { fontCache: 'global' } };</script>\n\t<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>\n</head>\n<body>`;

    //handler for page top left subheading
    global.heading = options.heading ? options.heading : "My NotionML Page";
    HTML += `\n\t<div class="header"><span style="margin-left: 1%;"><img src="${pageIcon[1]}" style="vertical-align: middle;height: 1em;margin-top:-4px;font-weight:300;">${heading}</span></div>\n\t<div class="main">`
    //add main heading icon
    HTML += `\n\t\t<img alt="${pageIcon[0]}" class="heading-icon" src="${pageIcon[1]}">`;
    //add text for main heading
    HTML += `\n\t\t<h1>${heading}</h1>`;
}

exports.add = (element, options) => {
    const elements = ["h1", "h2", "h3"];
    let classes = "";
    classes += options.color ? options.color + " " : "";
    if (element === "h1") {
        HTML += `\n\t<h1 class="${classes}">${options.text}</h1>`
    }
}

exports.compile = (options) => {
    //add end body tag and body css elements
    HTML += `\n\t</div>\n</body>\n<style>\n\t@font-face {\n\t\tfont-family: "Segoe";\n\t\tsrc: url('./segoe.ttf') format('truetype')\n\t}\n\tbody, html{\n\t\tfont-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";\n\t\theight: 100%;\n\t\toverflow: auto;\n\t\tscrollbar-width: none;\n\t\t-ms-overflow-style: none;\n\t}\n\tbody::-webkit-scrollbar {\n\t\tdisplay: none;\n\t}`;
    //add header css
    HTML += `\n\t.header {\n\t\theight: 5vh;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}`;
    //add styles for the main div
    HTML += `\n\t.main {\n\t\tmargin-left: 35%;\n\t\tmargin-right: 35%;\n\t\tmargin-top: 5%;\n\t}`;
    //add styles for heading icon
    HTML += `\n\t.heading-icon {\n\t\theight: 78px;\n\t}`;
    //add styles for main heading
    HTML += `\n\th1 {\n\t\tcolor: rgb(55, 53, 47);\n\t\tfont-size: 40px;\n\t\tfont-weight: 700;\n\t\theight: 51px;\n\t\tline-height: 48px;\n\t\tmargin-top: 12px;\n\t\tmargin-block-end: 0px;\n\t}`;
    //add color tags
    HTML += `\n\t.gray, .grey {\n\t\tcolor: #787774;\n\t}\n\t.brown {\n\t\tcolor: #9f6b53\n\t}\n\t.orange {\n\t\tcolor: #d9730d;\n\t}`
    //close the HTML
    HTML += `\n</style>\n</html>`;
    //check if the user specified an export path
    if (!options.exportPath) {
        console.error(`${chalk.red.bold("NotionML Error:")} No ${chalk.underline("exportPath option")} was passed into the ${chalk.underline("compiler function")}, please pass a ${chalk.underline("compiler path")} into the ${chalk.underline("compiler function")} like this:${chalk.blue('\n--------------------------------------------------\nnml.compile({\n\texportPath: "./export.html";\n});\n--------------------------------------------------\n')}`);
        return;
    }
    fs.writeFileSync(options.exportPath, HTML);
}