import axios from "axios";

const url = "http://localhost:8080/api/consmoy/consmoy"

class ConsommationMoyParCommuneService{

    getAll(){
        return axios.get(url)
    }

    add(cons){
        return axios.post(url, cons)
    }
}
export default new ConsommationMoyParCommuneService()