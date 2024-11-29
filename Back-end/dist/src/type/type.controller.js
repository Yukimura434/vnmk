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
exports.TypeController = void 0;
const common_1 = require("@nestjs/common");
const type_service_1 = require("./service/type.service");
const CreateType_dto_1 = require("./dto/CreateType.dto");
let TypeController = class TypeController {
    constructor(typeService) {
        this.typeService = typeService;
    }
    createType(createTypeDto) {
        return this.typeService.createType(createTypeDto);
    }
    updateType(typeId, updateTypeDto) {
        return this.typeService.updateType(typeId, updateTypeDto);
    }
    deleteType(typeId) {
        return this.typeService.deleteType(typeId);
    }
    getAllType() {
        return this.typeService.getAllType();
    }
    getTypeBycategoryId(categoryId) {
        return this.typeService.getTypesByCategoryId(categoryId);
    }
};
exports.TypeController = TypeController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateType_dto_1.CreateTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "createType", null);
__decorate([
    (0, common_1.Put)(':typeId'),
    __param(0, (0, common_1.Param)('typeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateType_dto_1.CreateTypeDto]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "updateType", null);
__decorate([
    (0, common_1.Delete)(':typeId'),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "deleteType", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "getAllType", null);
__decorate([
    (0, common_1.Get)('/category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeController.prototype, "getTypeBycategoryId", null);
exports.TypeController = TypeController = __decorate([
    (0, common_1.Controller)('types'),
    __metadata("design:paramtypes", [type_service_1.TypeService])
], TypeController);
//# sourceMappingURL=type.controller.js.map