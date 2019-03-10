"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const lodash_1 = require("lodash");
const listings = [];
exports.initPlugins = () => {
    lodash_1.each(common_1.config.plugins, value => {
        const plugin = require(value);
        listings.push(new plugin.default());
    });
};
exports.pluginEvent = (action, args) => __awaiter(this, void 0, void 0, function* () {
    for (const value of listings) {
        if (!lodash_1.isUndefined(value[action])) {
            const output = yield value[action](args);
            if (!lodash_1.isEmpty(output)) {
                return output;
            }
        }
    }
    return false;
});
//# sourceMappingURL=plugin.js.map