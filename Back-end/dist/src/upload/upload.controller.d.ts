import { ProductService } from 'src/product/service/product.service';
import { TypeService } from 'src/type/service/type.service';
export declare class UploadController {
    private readonly productService;
    private readonly typeService;
    constructor(productService: ProductService, typeService: TypeService);
    uploadPostFiles(productId: string, files: Express.Multer.File[]): Promise<{
        message: string;
    }>;
    uploadAvatarFile(files: Express.Multer.File[]): {
        url: string;
        name: string;
        status: string;
    }[];
    uploadTypeFile(files: Express.Multer.File[], typeId: string): Promise<{
        message: string;
    }>;
}
