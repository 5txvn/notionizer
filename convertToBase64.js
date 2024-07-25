const fs = require('fs');

const imgData = fs.readFileSync("./fire.png");
//data:${mimeType};base64,${base64String}
fs.writeFileSync("./img.txt", `data:img/png;base64,${imgData.toString("base64")}`);