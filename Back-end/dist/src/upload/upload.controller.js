"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("../../helpers/config");
const product_service_1 = require("../product/service/product.service");
const type_service_1 = require("../type/service/type.service");
let UploadController = class UploadController {
    constructor(productService, typeService) {
        this.productService = productService;
        this.typeService = typeService;
    }
    async uploadPostFiles(productId, files) {
        const urlFiles = files.map((file) => {
            const url = `http://localhost:5000/api/uploads/products/${file.filename}`;
            return url;
        });
        return await this.productService.updateImagesOfProduct(productId, urlFiles);
    }
    uploadAvatarFile(files) {
        const uploadedFiles = files.map((file) => ({
            url: `http://localhost:5000/api/uploads/avatars/${file.filename}`,
            name: file.filename,
            status: 'done',
        }));
        return uploadedFiles;
    }
    async uploadTypeFile(files, typeId) {
        const urlFiles = files.map((file) => {
            const url = `http://localhost:5000/api/uploads/types/${file.filename}`;
            console.log('url :', url);
            return url;
        });
        return await this.typeService.updateImage(typeId, urlFiles[0]);
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('product'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, { storage: (0, config_1.storageOptions)('products') })),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadPostFiles", null);
__decorate([
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, { storage: (0, config_1.storageOptions)('avatars') })),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UploadController.prototype, "uploadAvatarFile", null);
__decorate([
    (0, common_1.Post)('type'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 1, { storage: (0, config_1.storageOptions)('types') })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadTypeFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        type_service_1.TypeService])
], UploadController);
//# sourceMappingURL=upload.controller.js.map