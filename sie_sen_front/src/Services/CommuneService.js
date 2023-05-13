import axios from "axios";

const url = "http://localhost:8080/api/commune/commune"

class CommuneService{
    getAll(){
        return axios.get(url)
    }

    add(commune){
        return axios.get(url,commune)
    }
}
export default new CommuneService()