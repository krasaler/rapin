"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const lodash_1 = require("lodash");
class Language {
    constructor(directory = 'en-gb') {
        this.directory = directory;
        this.data = {};
    }
    get(key) {
        return !lodash_1.isUndefined(this.data[key]) ? this.data[key] : key;
    }
    set(key, value) {
        this.data[key] = value;
    }
    all() {
        return this.data;
    }
    load(filename) {
        const filepath = 'src/language/' + this.directory + '/' + filename + '.json';
        let data = {};
        if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            data = require('language/' + this.directory + '/' + filename);
        }
        this.data = Object.assign({}, this.data, data);
        return this.data;
    }
}
exports.default = Language;
//# sourceMappingURL=language.js.map