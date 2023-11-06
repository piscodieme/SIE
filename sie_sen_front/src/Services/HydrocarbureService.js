import axios from "axios";

const urlDonneeHydrocarbure = 'http://localhost:8080/api/hydrocarbure/hydrocarbure'
const urlConsoEner = 'http://localhost:8080/api/consoener/consoener'
const urlAutoConso = 'http://localhost:8080/api/autoconso/autoconso'
const urlRubrique = 'http://localhost:8080/api/rubrique/rubrique'
const urlRubrique1 = 'http://localhost:8080/api/rubrique1/rubrique1'
const urlRubrique2 = 'http://localhost:8080/api/rubrique2/rubrique2'
const typeDonnee = 'http://localhost:8080/api/typedonnee/typedonnee'

class HydrocarbureService{

    /* données hydrocarbures */
    getAllDonneesHydrocarbures(sgl){
        return axios.get(urlDonneeHydrocarbure+'/'+sgl)
    }

    addDonneesHydrocarbures(donnee){
        return axios.post(urlDonneeHydrocarbure, donnee)
    }

    deleteDonneeHydrocarbure(id){
        return axios.delete(urlDonneeHydrocarbure+'/'+id)
    }

    /* auto consommation */
    getAllAutoConso(sgl){
        return axios.get(urlAutoConso+'/'+sgl)
    }

    addAutoConso(conso){
        return axios.post(urlAutoConso,conso)
    }

    deleteAutoConso(id){
        return axios.delete(urlAutoConso+'/'+id)
    }

    /* consommation energetique */

    getAllConsoEner(sgl){
        return axios.get(urlConsoEner+'/'+sgl)
    }

    addConsoEner(conso){
        console.log("donnéé ajouteee ====",conso)
        return axios.post(urlConsoEner,conso)
    }

    deleteConsoEner(id){
        return axios.delete(urlConsoEner+'/'+id)
    }
    /* rubrique */

    getAllRubrique(){
        return axios.get(urlRubrique)
    }

    /* rubrique 1 */

    getAllRubrique1(){
        return axios.get(urlRubrique1)
    }

    /* rubrique 2 */
    getAllRubrique2(){
        return axios.get(urlRubrique2)
    }

    /* type de données */
    getAllTypeDonnees(){
        return axios.get(typeDonnee)
    }


}export default new HydrocarbureService()