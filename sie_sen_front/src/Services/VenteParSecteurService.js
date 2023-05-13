import axios from "axios";

const url = 'http://localhost:8080/api/ventesecteur/ventesecteur'

class VenteParSecteurService{
    getVenteParSecteur(secteurId){
        return axios.get(url + "/getVenteParSecteur/" + secteurId);
    }

    add(vente){
        return axios.post(url, vente);
    }

    getAll(){
        console.log('hello suis là++++');
        return axios.get(url);
    }
}
export default new VenteParSecteurService();