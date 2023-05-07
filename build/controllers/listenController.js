"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/**
 * @description - function used in callback of app.listen. this function checks for images in the updated folder.
 * if those images are found we remove them on start up as we dont want to keep every image. images should only be kept
 * as long as server is running to avoid creating a large file size
 * @param {number} port - port number server running on
 * @returns {void}
 */
var listen = function (port) {
    var dirname = path_1.default.join(__dirname, '..');
    console.log("Listening on port ".concat(port, "..."));
    fs_1.default.readdir("".concat(dirname, "/assets/updated"), function (err, files) {
        if (err) {
            console.log(err.message);
            return;
        }
        console.log("".concat(files.length, " image(s) being removed."));
        files.forEach(function (file) {
            console.log("Removing ".concat(file));
            fs_1.default.unlink("".concat(dirname, "/assets/updated/").concat(file), function () {
                // do nothing
            });
        });
    });
};
exports.default = { listen: listen };
