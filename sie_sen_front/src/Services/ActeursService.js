import axios from 'axios';

const acteurApiBaseUrl = 'http://localhost:8080/api/acteurs/acteurs'

class ActeursService{
    getAllActors(){
        return axios.get(acteurApiBaseUrl);
    }

    createActor(actor){
        return axios.post(acteurApiBaseUrl, actor);
    }

    getActeurById(idActor){
        console.log("service getBY",idActor);
        return axios.get(acteurApiBaseUrl+'/'+idActor);
    }

    updateActeur(id, acteur){
        return axios.put(acteurApiBaseUrl+'/'+id,acteur);
    }

    deleteActeur(id){
        return axios.delete(acteurApiBaseUrl+'/'+id);
    }

}
export default new ActeursService()