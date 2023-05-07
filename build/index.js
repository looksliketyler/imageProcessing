"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var postFunction = __importStar(require("./controllers/imageController"));
var processImage = __importStar(require("./controllers/processImage"));
var viewImages = __importStar(require("./controllers/viewImages"));
var listenFunctions = __importStar(require("./controllers/listenController"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('src'));
app.set('view engine', 'ejs');
// post request - uses changeImage endpoint and calls the controller changeImage
// didnt realize this should be get request so it can be ran in browser.
// leaving here as it passes all tests
app.post('/changeImage', postFunction.default.changeImage);
// endpoint for creating/processing the image
app.get('/processImage/:imageName/:newImageId/:width/:height/:grayscale', processImage.default.processImage);
// endpoint to load all images on a page
app.get('/viewImages', viewImages.default.viewImages);
app.listen(port, function () {
    listenFunctions.default.listen(port);
});
