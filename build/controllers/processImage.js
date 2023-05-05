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
var resMessage;
var processImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imageObj, filePathObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                imageObj = createImageObjFromRequest(req);
                filePathObj = verifyImagePathsExists(imageObj);
                if (!filePathObj.pathExists) {
                    res.send(filePathObj.message);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, createNewImage(imageObj, filePathObj)];
            case 1:
                resMessage = _a.sent();
                res.send(resMessage);
                return [2 /*return*/];
        }
    });
}); };
var createNewImage = function (imageObj, filePathObj) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!imageObj.options.grayscale) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, sharp_1.default)("".concat(filePathObj.originalFilePath))
                        .resize(imageObj.options.resize)
                        .grayscale()
                        .jpeg()
                        .toFile("".concat(filePathObj.updatedFilePath))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, sharp_1.default)("".concat(filePathObj.originalFilePath))
                    .resize(imageObj.options.resize)
                    .jpeg()
                    .toFile("".concat(filePathObj.updatedFilePath))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, "New Image Created - ".concat(imageObj.imageName, "_").concat(imageObj.id, "!<br><hr><br>File path - ").concat(filePathObj.updatedFilePath)];
        }
    });
}); };
var verifyImagePathsExists = function (imageObj) {
    var originalFilePath = "src/assets/originals/".concat(imageObj.imageName, ".jpg");
    var updatedFilePath = "src/assets/updated/".concat(imageObj.imageName, "_").concat(imageObj.id, ".jpg");
    return {
        pathExists: !fs_1.default.existsSync(originalFilePath) ? false : fs_1.default.existsSync(updatedFilePath) ? false : true,
        message: !fs_1.default.existsSync(originalFilePath) ? 'This image does not exist!' : 'This image path already exists!',
        originalFilePath: originalFilePath,
        updatedFilePath: updatedFilePath,
    };
};
var createImageObjFromRequest = function (req) {
    return {
        imageName: req.params.imageName,
        id: req.params.newImageId,
        options: {
            resize: {
                width: parseInt(req.params.width),
                height: parseInt(req.params.height),
            },
            grayscale: Boolean(req.params.grayscale),
        },
    };
};
exports.default = { processImage: processImage, createNewImage: createNewImage };
