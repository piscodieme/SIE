import axios from "axios";

const url = 'http://localhost:8080/api/secteur/secteur'

class SecteurService{

    add(secteur){
        return axios.post(url, secteur);
    }

    getAll(){
        return axios.get(url);
    }
}
export default new SecteurService()