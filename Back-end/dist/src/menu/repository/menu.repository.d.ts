import { Model } from 'mongoose';
import { Menu } from '../schema/menu.shema';
import { CreateMenuDto } from '../dto/CreateMenu.dto';
export declare class MenuRepository {
    private menuModel;
    constructor(menuModel: Model<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<import("mongoose").Document<unknown, {}, Menu> & Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteMenuById(menuId: string): Promise<import("mongoose").Document<unknown, {}, Menu> & Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<any[]>;
    findById(menuId: string): Promise<import("mongoose").Document<unknown, {}, Menu> & Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateMenu(menuId: string, updateMenuDto: CreateMenuDto): Promise<import("mongoose").Document<unknown, {}, Menu> & Menu & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
