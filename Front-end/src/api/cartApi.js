import axiosClient from './axiosClient';

const cartsApi = {
    async getAll(userId) {
        const url = `api/carts/user/${userId}`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `api/carts/${id}`;
        return axiosClient.get(url);
    },

    add(payload) {
        const url = 'api/carts';
        return axiosClient.post(url,payload);
    },

    update(data) {
        const url = `api/cars/${data.id}`;
        return axiosClient.patch(url, data);
    },

    delete(userId, productIds) {
        const url = `api/carts/user/${userId}`;
        return axiosClient.put(url,{productIds});
    }
};

export default cartsApi;
