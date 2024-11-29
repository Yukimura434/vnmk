import { Types } from 'mongoose';
import { MenuRepository } from '../repository/menu.repository';
import { CreateMenuDto } from '../dto/CreateMenu.dto';
export declare class MenuService {
    private menuRepository;
    constructor(menuRepository: MenuRepository);
    createMenu(createMenuDto: CreateMenuDto): Promise<import("mongoose").Document<unknown, {}, import("../schema/menu.shema").Menu> & import("../schema/menu.shema").Menu & {
        _id: Types.ObjectId;
    }>;
    getAllMenus(): Promise<any[]>;
    deleteMenuById(menuId: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/menu.shema").Menu> & import("../schema/menu.shema").Menu & {
        _id: Types.ObjectId;
    }>;
    updateMenu(menuId: string, updateMenuDto: CreateMenuDto): Promise<void>;
}
