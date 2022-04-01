"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const adapterMiddlewares_1 = __importDefault(require("../adapter/adapterMiddlewares/adapterMiddlewares"));
const adapterRouters_1 = __importDefault(require("../adapter/adapterRouters/adapterRouters"));
const AddPhotoController_1 = __importDefault(require("../useCases/Photo/AddPhoto/AddPhotoController"));
const GetPhotosController_1 = __importDefault(require("../useCases/Photo/GetPhotos/GetPhotosController"));
const GetUserPhotosController_1 = __importDefault(require("../useCases/Photo/GetUserPhotos/GetUserPhotosController"));
const RemovePhotoController_1 = __importDefault(require("../useCases/Photo/RemovePhoto/RemovePhotoController"));
const router = (0, express_1.Router)();
router.post("/photo", (0, adapterMiddlewares_1.default)(authenticateUser_1.default), multer_1.default, (0, adapterRouters_1.default)(AddPhotoController_1.default.handle));
router.get("/photo", (0, adapterMiddlewares_1.default)(authenticateUser_1.default), (0, adapterRouters_1.default)(GetPhotosController_1.default.handle));
router.get("/user-photo", (0, adapterMiddlewares_1.default)(authenticateUser_1.default), (0, adapterRouters_1.default)(GetUserPhotosController_1.default.handle));
router.delete("/photo/:photoId/:key", (0, adapterMiddlewares_1.default)(authenticateUser_1.default), (0, adapterRouters_1.default)(RemovePhotoController_1.default.handle));
exports.default = router;