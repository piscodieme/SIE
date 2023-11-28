import axios from 'axios';

const ApiBaseUrl = 'http://localhost:8080/api/dwbilan/dwbilan'


class Dw_bilanService{
    
    getAll(){
        console.log("service get all data from data warehouse")
        return axios.get(ApiBaseUrl);
    }
}
export default new Dw_bilanService()