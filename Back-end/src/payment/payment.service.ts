import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Response, Request } from 'express';
import { OrderService } from 'src/order/service/order.service';
const axios = require('axios').default;
const CryptoJS = require('crypto-js');
const moment = require('moment');

const config = {
  app_id: '2553',
  key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

@Injectable()
export class PaymentService {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}
  async createZaloPayment(price: number, orderId: string) {
    const embed_data = { orderId: orderId };
    console.log('embed_data in create zalo payment:', embed_data);

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: config.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: 'user123',
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: price,
      description: `VNMK - Payment for the order #${transID}`,
      bank_code: '',
      mac: '',
      // cho url vào đây
      callback_url:
      'https://be6b-112-197-200-142.ngrok-free.app/api/payment/zalopayCallback',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      config.app_id +
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
    } catch (err) {
      console.log(err);
    }
  }

  async handleCallbackZaloPayment(req: Request, res: Response) {
    let result = {
      return_code: 0,
      return_message: '',
    };

    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;

      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();

      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac != mac) {
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        const key2 = config.key2;
        let dataJson = JSON.parse(dataStr);
        const embed_data = JSON.parse(dataJson.embed_data);

        await this.orderService.updatePaymentStatus(embed_data.orderId, '');

        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex) {
      result.return_message = ex.message;
    }

    res.json(result);
    return result;
  }
}
