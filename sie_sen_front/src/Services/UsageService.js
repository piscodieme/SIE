import axios from 'axios';

const usage = 'http://localhost:8080/api/venteUsage/venteUsage'

class usageService{
    getAll(){
        return axios.get(usage);
    }

    create(vente){
        return axios.post(usage, vente);
    }

}
export default new usageService()