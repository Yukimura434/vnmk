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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("../order/service/order.service");
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');
const config = {
    app_id: '2553',
    key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
    key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
    endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};
let PaymentService = class PaymentService {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async createZaloPayment(price, orderId) {
        const embed_data = { orderId: orderId };
        console.log('embed_data in create zalo payment:', embed_data);
        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: 'user123',
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: price,
            description: `VNMK - Payment for the order #${transID}`,
            bank_code: '',
            mac: '',
            callback_url: 'https://0f78-112-197-200-142.ngrok-free.app/api/payment/zalopayCallback',
        };
        const data = config.app_id +
            '|' +
            order.app_trans_id +
            '|' +
            order.app_user +
            '|' +
            order.amount +
            '|' +
            order.app_time +
            '|' +
            order.embed_data +
            '|' +
            order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const res = await axios.post(config.endpoint, null, { params: order });
            return res.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    async handleCallbackZaloPayment(req, res) {
        let result = {
            return_code: 0,
            return_message: '',
        };
        try {
            let dataStr = req.body.data;
            let reqMac = req.body.mac;
            let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
            if (reqMac != mac) {
                result.return_code = -1;
                result.return_message = 'mac not equal';
            }
            else {
                const key2 = config.key2;
                let dataJson = JSON.parse(dataStr);
                const embed_data = JSON.parse(dataJson.embed_data);
                await this.orderService.updatePaymentStatus(embed_data.orderId, '');
                result.return_code = 1;
                result.return_message = 'success';
            }
        }
        catch (ex) {
            result.return_message = ex.message;
        }
        res.json(result);
        return result;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => order_service_1.OrderService))),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map