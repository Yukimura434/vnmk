import { Response, Request } from 'express';
import { OrderService } from 'src/order/service/order.service';
export declare class PaymentService {
    private readonly orderService;
    constructor(orderService: OrderService);
    createZaloPayment(price: number, orderId: string): Promise<any>;
    handleCallbackZaloPayment(req: Request, res: Response): Promise<{
        return_code: number;
        return_message: string;
    }>;
}
