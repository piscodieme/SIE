import axios from "axios";

const AchatParSenelec = "http://localhost:8080/api/achatSenelec/achatSenelec"

class AchatEnergieParSenelecService{

    getAll(){
        return axios.get(AchatParSenelec);
    }

    Add(Achat){
        return axios.post(AchatParSenelec, Achat);
    }
}
export default new AchatEnergieParSenelecService()