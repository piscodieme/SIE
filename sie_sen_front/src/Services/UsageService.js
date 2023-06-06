import axios from 'axios';

const venteUsage = 'http://localhost:8080/api/venteUsage/venteUsage'
const usage = 'http://localhost:8080/api/usages/usages'

class usageService{
    getAll(){
        return axios.get(venteUsage);
    }

    create(vente){
        return axios.post(venteUsage, vente);
    }

    getAllUsage(){
        return axios.get(usage);
    }

    AddUsage(usg){
        return axios.post(usage, usg);
    }

}
export default new usageService()