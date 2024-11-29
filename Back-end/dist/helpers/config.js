"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageOptions = void 0;
const multer_1 = require("multer");
const storageOptions = (folder) => (0, multer_1.diskStorage)({
    destination: `uploads/${folder}`,
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
exports.storageOptions = storageOptions;
//# sourceMappingURL=config.js.map