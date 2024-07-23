const xml = require("fast-xml-parser");
const fs = require('fs');

const parser = new xml.XMLParser();
let XML = parser.parse(fs.readFileSync("testing.xml"));

const emojiOptions = ["fire"]

//make sure that the xml is wrapped inside the notion tag
if (!XML.notion) {
    console.error("Your XML is not wrapper inside a Notion tag, please use the <notion> tag around all your XML code for it to fully compile");
    process.exit();
} else {
    XML = XML.notion
}

console.log(XML)
console.log(Object.keys(XML))
Object.keys(XML).forEach(key => {
    if (typeof XML[key] == "string") {
        console.log("success")
    } else {
        console.log("fail")
    }
})

//initialize the setup options
const options = {
    templateFilePath:"./testing.html",
    outputFilePath: "./final.html"
}

/*
let htmlContent = fs.readFileSync(options.templateFilePath, 'utf8');
fs.writeFileSync(options.outputFilePath, options.templateFilePath);
*/

//function to rewrite the code in the testing.html file
function writeHTML(replacementQuery, newString) {
    fs.writeFileSync(options.outputFilePath, htmlContent.replace(replacementQuery, newString));
    htmlContent = fs.readFileSync(options.outputFilePath, 'utf8');
}

/*
if (XML.title) { writeHTML("pageTitle", XML.title); };
if (XML.heading) { writeHTML("pageHeading", XML.heading); };
if (XML["heading-emoji"]) { 
    if (!emojiOptions.includes(XML["heading-emoji"])) {
        console.error("The emoji that you used for the heading is not a valid emoji option, please try again");
        return;
    } else {
        writeHTML("headingEmoji", XML["heading-emoji"]); 
    }
};
*/