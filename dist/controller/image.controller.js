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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const Upload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const storage = multer_1.default.diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
            const randomName = Math.random().toString(20).substring(2, 12);
            return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        }
    });
    const upload = (0, multer_1.default)({ storage }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return res.send(400).send(err);
        }
        res.send({
            url: `http://3.26.18.43:8000/api/uploads/${req.file.filename}`
        });
    });
});
exports.Upload = Upload;
