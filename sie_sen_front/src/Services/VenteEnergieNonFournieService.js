import axios from "axios";

const url = "http://localhost:8080/api/ventenonfournie/ventenonfournie";

class VenteEnergieNonFournieService{

    getAll(){
        return axios.get(url);
    }

    add(vente){
        return axios.post(url, vente);
    }
}
export default new VenteEnergieNonFournieService();