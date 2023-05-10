import axios from "axios";

const AnneeApiUrl = "http://localhost:8080/api/annee/annee";

class AnneeService {

    getAll(){
       return axios.get(AnneeApiUrl);
    }
}
export default new AnneeService()