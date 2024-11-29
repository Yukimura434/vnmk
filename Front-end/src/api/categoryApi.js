import axiosClient from "./axiosClient"

const categoryApi = {
    async getAll(){
        const category = await axiosClient.get('/api/categories');
        return category;
    },

    getTypesByAvailabilityStatus: async (typeAvailabilityStatus) => {
        const response = await axiosClient.get(`/api/categories/${typeAvailabilityStatus}`);
        return response;
      },

    get(id){
        const url = `/api/categories/${id}`;
        return axiosClient.get(url)
    },

    add(data){
        const url = '/categories';
        return axiosClient.post(url,data)
    },

    update(data){
        const url = `/categories/${data.id}`;
        return axiosClient.patch(url,data)
    },
    
    remove(id){
        const url = `/categories/${id}`;
        return axiosClient.delete(url)
    }
}

export default categoryApi