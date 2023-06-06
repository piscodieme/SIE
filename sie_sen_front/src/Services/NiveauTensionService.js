import axios from 'axios';

const nivtenApiBaseUrl = 'http://localhost:8080/api/nivten/nivten'
const nivRepo='http://localhost:8080/api/nivten/niv'
class NivtenService{
    getAll(){
        return axios.get(nivtenApiBaseUrl);
    }

    create(vente){
        return axios.post(nivtenApiBaseUrl, vente);
    }

    getAllNiveau(){
        return axios.get(nivRepo);
    }

}
export default new NivtenService()