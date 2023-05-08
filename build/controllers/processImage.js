"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
/** @description - GLOBAL VARIABLE - array that will be added to and used in index.ejs */
var viewData = [];
/**
 * @async
 * @description - function to run needed helper. called by get request with endpoint /processImage and needed params
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {<void>Promise}
 */
var processImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validatedParams, imageObj, filePathObj, resMessage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validatedParams = validateParams(req);
                if (!validatedParams.validated) {
                    res.send(validatedParams.resMessage);
                    return [2 /*return*/];
                }
                imageObj = createImageObjFromRequest(req);
                filePathObj = createFilePathObj(imageObj);
                // if image exists
                if (!filePathObj.pathExists) {
                    sendHTMLContent(res, filePathObj.message, filePathObj.updatedFilePath, imageObj, filePathObj.pathExists);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, createNewImage(imageObj, filePathObj)];
            case 1:
                resMessage = _a.sent();
                sendHTMLContent(res, resMessage, filePathObj.updatedFilePath, imageObj, filePathObj.pathExists);
                return [2 /*return*/];
        }
    });
}); };
/**
 * @async
 * @description - helper function to create new image. uses sharp api
 * @param {ImageRequestObj} imageObj - object of passed image info
 * @param {FilePathObj} filePathObj - object for filepath info
 * @returns {Promise<string>} - generated message to return to html
 */
var createNewImage = function (imageObj, filePathObj) { return __awaiter(void 0, void 0, void 0, function () {
    var originalFilePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                originalFilePath = "src/assets/originals/".concat(imageObj.imageName, ".jpg");
                if (!imageObj.options.grayscale) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, sharp_1.default)("".concat(originalFilePath)).resize(imageObj.options.resize).grayscale().jpeg().toFile("".concat(filePathObj.updatedFilePath))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, sharp_1.default)("".concat(originalFilePath)).resize(imageObj.options.resize).jpeg().toFile("".concat(filePathObj.updatedFilePath))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, "New Image Created and Added to Gallery - ".concat(imageObj.imageName, "_").concat(imageObj.id, "!")];
        }
    });
}); };
/**
 * @description - creates the file path object for use in file
 * @param {ImageRequestObj} imageObj - object of passed image info
 * @returns {FilePathObj} - newly created file path object
 */
var createFilePathObj = function (imageObj) {
    var updatedFilePath = "src/assets/updated/".concat(imageObj.imageName, "_").concat(imageObj.id, ".jpg");
    return {
        pathExists: fs_1.default.existsSync(updatedFilePath) ? false : true,
        message: fs_1.default.existsSync(updatedFilePath) ? 'Image exists in Gallery!' : '',
        updatedFilePath: updatedFilePath,
    };
};
/**
 * @description - created image object used in file from http request params
 * @param {Request} req - http request
 * @returns {ImageRequestObj} - newly created image object
 */
var createImageObjFromRequest = function (req) {
    return {
        imageName: req.params.imageName,
        id: req.params.newImageId,
        options: {
            resize: {
                width: parseInt(req.params.width),
                height: parseInt(req.params.height),
            },
            grayscale: req.params.grayscale === 'true' ? true : false,
        },
    };
};
/**
 * @description - helper function to validate passed params will work in file
 * @param {Request} req - http request
 * @returns {ValidatedParams}
 */
var validateParams = function (req) {
    var params = req.params;
    var imageNameArr = ['tree', 'mountainView'];
    var validated = false;
    var resMessage = '';
    // verify passed imageName is usable
    for (var i = 0; i < imageNameArr.length; i++) {
        if (params.imageName === imageNameArr[i]) {
            validated = true;
            break;
        }
        else {
            resMessage = "".concat(params.imageName, " is not a known image");
            break;
        }
    }
    // verify width/height is a numer and is between 0-1000
    if (+params.width > 1000 || +params.width <= 0 || +params.height > 1000 || +params.height <= 0) {
        validated = false;
        resMessage = "".concat(resMessage, " width/height must be greater than 0 and smaller than 1000");
    }
    return { validated: validated, resMessage: resMessage };
};
/**
 * @description - function that generates html data and image, tells user new image has been created. will not generate
 * new image and pass to gallery if the file path already exists
 * @param {Response} res -http request
 * @param {string} resMessage - response message to send to user
 * @param {string} filePath - file path of new image
 * @param {ImageRequestObj} imageObj - object of image data passed
 * @param {boolean} pathExists - whether or not current image file path exists
 * @returns {void}
 */
var sendHTMLContent = function (res, resMessage, filePath, imageObj, pathExists) {
    filePath = filePath.slice(3);
    var htmlInfo = "\n    <h2>".concat(resMessage, "</h2>\n    <br><hr><br>\n    <ul>\n      <li>Image Used: ").concat(imageObj.imageName, "</li>\n      <li>Passed ID: ").concat(imageObj.id, "</li>\n      <li>Options:</li>\n        <ul>\n          <li>Height: ").concat(imageObj.options.resize.height, "</li>\n          <li>Width: ").concat(imageObj.options.resize.width, "</li>\n          <li>Grayscale: ").concat(imageObj.options.grayscale, "</li>\n        </ul>\n    </ul>\n    <br><hr><hr><br>\n    <img src='").concat(filePath, "' alt=\"new image\">\n  ");
    if (pathExists) {
        var viewDataObj = { imageObj: imageObj, filePath: filePath };
        viewData.push(viewDataObj);
    }
    res.send(htmlInfo);
};
exports.default = { processImage: processImage, createNewImage: createNewImage, viewData: viewData };
