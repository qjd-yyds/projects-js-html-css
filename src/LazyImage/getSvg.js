const potrace = require("potrace");
const fs = require("fs");
const params = {
    background: "#fff",
    color: "#c7d4d8",
    threshold: 120
};
potrace.trace("./R-C.jpeg", params, function (err, svg) {
    fs.writeFileSync("./R-C.svg", svg);
});