import axios from 'axios';

const industrieNivProd = 'http://localhost:8080/api/nivprod/nivprod'
const industrieAutres = 'http://localhost:8080/api/details/details'
const industrieHorsProd = 'http://localhost:8080/api/horsprodener/horsprodener'
const industrieProdBrute = 'http://localhost:8080/api/prodBrute/prodBrute'
const industrieCombustible = 'http://localhost:8080/api/combustible/combustible'
const industrieProduits = 'http://localhost:8080/api/produitIndustrie/produitIndustrie'
const usehors = 'http://localhost:8080/api/horsprodener/usehorscurrentyear'

class industrieService{

    getUseHorsCurrentYear(prod){
        console.log("fjdfkhffjhfjhdvdjhj===========",prod)
        return axios.get(usehors+'/'+prod)
    }
    /* niveau de production */
    getAllNivProd(sgl){
        return axios.get(industrieNivProd+'/'+sgl);
    }

    addNivProd(nivprod){
        return axios.post(industrieNivProd, nivprod);
    }

    deleteNiveauProduction(id){
        return axios.delete(industrieNivProd+'/'+id);
    }

    /* Production Brute */

    getAllProdBrute(sgl){
        return axios.get(industrieProdBrute+'/'+sgl);
    }

    addProdBrute(prodbrute){
        console.log("production service ===== ",prodbrute);
        return axios.post(industrieProdBrute, prodbrute);
    }

    deleteProdBrute(id){
        return axios.delete(industrieProdBrute+'/'+id);
    }

    /* Utilisation hors production Energétique */

    getAllHorsProd(sgl){
        return axios.get(industrieHorsProd+'/'+sgl);
    }

    addHorsProd(horsprod){
        return axios.post(industrieHorsProd, horsprod);
    }

    deleteHorsProd(id){
        return axios.delete(industrieHorsProd+'/'+id);
    }

    /* Détails */

    getAllAutres(sgl){
        console.log(sgl)
        return axios.get(industrieAutres+'/'+sgl);
    }
    addAutres(autre){
        return axios.post(industrieAutres, autre);
    }

    deleteAutres(id){
        return axios.delete(industrieAutres+'/'+id);
    }


    /* combustible getall and add */
    getAllCombustible(){
        return axios.get(industrieCombustible);
    }

    addCombustible(comb){
        return axios.post(industrieCombustible, comb);
    }

    /* produits indudtriels  */
    getAllProduits(){
        return axios.get(industrieProduits);
    }

    addProduits(prod){
        return axios.post(industrieProduits, prod);
    }


}export default new industrieService()