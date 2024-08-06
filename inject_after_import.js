const fs = require("fs");
let json = require("./output/export.json");

const array_var_regex = /\\\"{{arr_\w+}}\\\"/gm;

json = JSON.stringify(json).replace(array_var_regex, (match) => {
    return match.replace(/\\\"/gm, "");
});

fs.writeFile("./output/post_inject.json", json, (err) => {
    if (err) {
        console.log(err);
    }
});