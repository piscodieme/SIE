import axios from "axios";

const url = "http://localhost:8080/api/departement/departement"

class DepartementService{
    getAll(){
        return axios.get(url)
    }

    add(departement){
        return axios.post(url, departement)
    }
}
export default new DepartementService()