import axiosClient from "./axiosClient"

const menuApi = {
    async getAll(){
        const data = await axiosClient.get('/api/menus');
        return data;
    },
    async getType(){
        const data = await axiosClient.get('/api/types');
        return data;
    },

}

export default menuApi