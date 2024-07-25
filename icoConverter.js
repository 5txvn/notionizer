const fs = require('fs');
const pngToIco = require('png-to-ico');

pngToIco("./fire.png").then(buffer => {
    fs.writeFileSync("./fire.ico", buffer)
}).catch(err => console.error(err))