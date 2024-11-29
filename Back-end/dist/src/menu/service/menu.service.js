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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const menu_repository_1 = require("../repository/menu.repository");
let MenuService = class MenuService {
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async createMenu(createMenuDto) {
        return await this.menuRepository.create(createMenuDto);
    }
    async getAllMenus() {
        const menus = await this.menuRepository.findAll();
        return menus.map((menu) => {
            menu.categories.sort((a, b) => a.order - b.order);
            return menu;
        });
    }
    async deleteMenuById(menuId) {
        return await this.menuRepository.deleteMenuById(menuId);
    }
    async updateMenu(menuId, updateMenuDto) {
        const menu = await this.menuRepository.findById(menuId);
        if (!menu) {
            throw new common_1.HttpException('Menu not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.menuRepository.updateMenu(menuId, updateMenuDto);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [menu_repository_1.MenuRepository])
], MenuService);
//# sourceMappingURL=menu.service.js.map