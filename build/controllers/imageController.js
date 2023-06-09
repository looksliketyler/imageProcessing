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
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
/** @description - global variable to assign message to response */
var resMessage;
/**
 * @description - helper function to check for request body. sets message to global variable for resMessage
 * and returns boolean value
 * @param {Response} req - http request
 * @returns {boolean}
 */
var checkRequest = function (req) {
    var hasBody = true;
    if (!(req === null || req === void 0 ? void 0 : req.body)) {
        resMessage = 'Request has no body!';
        hasBody = false;
    }
    return hasBody;
};
/**
 * @async
 * @description - function that creates imageObj from request body. passes to createNewImage function
 * to create image and returns response to user
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Promise<void>}
 */
var changeImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageObj, error_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                if (!checkRequest(req)) return [3 /*break*/, 2];
                imageObj = {
                    id: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.id) || '',
                    imageName: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.imageName) || '',
                    options: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.options) || {},
                };
                return [4 /*yield*/, createNewImage(imageObj)];
            case 1:
                resMessage = _d.sent();
                res.send(resMessage);
                return [3 /*break*/, 3];
            case 2:
                console.log('error');
                _d.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _d.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * @description - helper function to verify that either original image exists or new image path exists
 * if current path doesnt exists or new path already exists, we dont want to keep processing image
 * @param {string} imagePath - path determined from request body imageName
 * @param {string} newPath = path determined from request body id and imageName
 * @returns {PathExists}
 */
var verifyImagePathsExists = function (imagePath, newPath) {
    return {
        pathExists: !fs_1.default.existsSync(imagePath) ? false : fs_1.default.existsSync(newPath) ? false : true,
        message: !fs_1.default.existsSync(imagePath) ? 'This image does not exist!' : 'This image path already exists!',
    };
};
/**
 * @async
 * @description - function that uses imageObj. uses sharp api to edit an image based on parameters send in request body
 * @param {ImageRequestObj} imageObj - image info to edit and set
 * @returns {Promise<string>}
 */
var createNewImage = function (imageObj) { return __awaiter(void 0, void 0, void 0, function () {
    var originalFilePath, updatedFilePath, imagePathCheck;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(imageObj.id && imageObj.imageName && Object.values(imageObj.options.resize).length > 0)) return [3 /*break*/, 5];
                originalFilePath = "src/assets/originals/".concat(imageObj.imageName, ".jpg");
                updatedFilePath = "src/assets/updated/".concat(imageObj.imageName, "_").concat(imageObj.id, ".jpg");
                imagePathCheck = verifyImagePathsExists(originalFilePath, updatedFilePath);
                if (!imagePathCheck.pathExists) {
                    return [2 /*return*/, imagePathCheck.message];
                }
                if (!imageObj.options.grayscale) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, sharp_1.default)("".concat(originalFilePath)).resize(imageObj.options.resize).grayscale().jpeg().toFile("".concat(updatedFilePath))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, sharp_1.default)("".concat(originalFilePath)).resize(imageObj.options.resize).jpeg().toFile("".concat(updatedFilePath))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, "New Image Created - ".concat(imageObj.imageName, "_").concat(imageObj.id, "!")];
            case 5: return [2 /*return*/, 'Resize object is missing width and/or height!'];
        }
    });
}); };
exports.default = { changeImage: changeImage, createNewImage: createNewImage };
