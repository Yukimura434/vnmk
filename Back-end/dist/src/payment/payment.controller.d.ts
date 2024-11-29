import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createZaloPayment(data: any, req: any, res: any): Promise<void>;
    handleCallbackZaloPayment(req: any, res: any): Promise<void>;
}
