"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpoutServer = exports.Event = void 0;
__exportStar(require("./core/apis"), exports);
var events_1 = require("./core/events");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return events_1.default; } });
var server_1 = require("./core/server");
Object.defineProperty(exports, "SpoutServer", { enumerable: true, get: function () { return server_1.default; } });
