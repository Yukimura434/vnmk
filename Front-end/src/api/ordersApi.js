import axiosClient from './axiosClient';

const orderApi = {
    add(payloadPay) {
        const url = 'api/orders';
        return axiosClient.post(url,payloadPay);
    },
    get(orderId) {
        const url = `api/orders/${orderId}`
        return axiosClient.get(url);
    },
    remove(userId, productIds) {
        const encodedProductIds = encodeURIComponent(JSON.stringify(productIds));
        const url = `api/carts/user?userId=${userId}&productIds=${encodedProductIds}`;
        return axiosClient.put(url);
    },
     payment(orderId, paymentMethod) {
        const url = `api/orders/${orderId}/status`; 
        return axiosClient.put(url, { paymentMethod });
    },
    updateShippingInfo(userId,payload){
        const url = `api/users/${userId}/shipping-infor`; 
        return axiosClient.put(url, { payload });
    },
      getOrderHistory(userId){
        const url =`http://localhost:5000/api/orders/${userId}/user`
        return axiosClient.get(url);
      }
}

export default orderApi;
