const fs = require('fs');
const path = require('path');

function loadDirectory(exports, directory) {

    fs.readdirSync(directory).forEach((filename) => {
        var fullPath,
            stat,
            match;

        //skip
        if (filename === 'index.js' || /^\./.test(filename)) {
            return;
        }

        fullPath = path.join(directory + '/' + filename);
        stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            exports[filename] = {};
            loadDirectory(exports[filename], fullPath);
        } else {
            match = /(\w+)\.js$/.exec(filename);
            if (match) {
                exports.__defineGetter__(match[1], () => {
                    return require(fullPath);
                })
            }
        }
        return exports;
    });
}

loadDirectory(exports, __dirname);