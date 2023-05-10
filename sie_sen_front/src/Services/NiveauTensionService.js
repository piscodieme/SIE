import axios from 'axios';

const nivtenApiBaseUrl = 'http://localhost:8080/api/nivten/nivten'

class NivtenService{
    getAll(){
        return axios.get(nivtenApiBaseUrl);
    }

    create(vente){
        return axios.post(nivtenApiBaseUrl, vente);
    }

}
export default new NivtenService()