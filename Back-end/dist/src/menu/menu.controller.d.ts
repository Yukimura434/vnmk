import { MenuService } from './service/menu.service';
import { CreateMenuDto } from './dto/CreateMenu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    createMenu(createMenuDto: CreateMenuDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/menu.shema").Menu> & import("./schema/menu.shema").Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAllMenu(): Promise<any[]>;
    deleteMenuById(menuId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/menu.shema").Menu> & import("./schema/menu.shema").Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateMenu(menuId: string, updateMenuDto: CreateMenuDto): Promise<void>;
}
