import axios from "axios";

const url = "http://localhost:8080/api/consmoy/consmoy"

class ConsommationMoyParCommuneService{

    getAll(){
        return axios.get(url)
    }

    add(){
        return axios.post(url)
    }
}
export default new ConsommationMoyParCommuneService()