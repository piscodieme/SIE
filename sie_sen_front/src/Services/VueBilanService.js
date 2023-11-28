import axios from "axios"

const url = "http://localhost:8080/api/vuebilan/vuebilan";
const urls = "http://localhost:8080/api/vuebilan/vuesommebilan";
const urlApprov = "http://localhost:8080/api/vuebilan/approv";
const urlTrans = "http://localhost:8080/api/vuebilan/trans";
const urlElectProd = "http://localhost:8080/api/vuebilan/elecprod";
const rub2 = "http://localhost:8080/api/vuebilan/rub2";
const stats = "http://localhost:8080/api/vuebilan/stats";
const bilan = "http://localhost:8080/api/vuebilan/bilan";



class Vue_bilanService{
    getAll(){
        return axios.get(url);
    }
    getAllSomme(param){
        return axios.get(urls+'/'+param);
    }

    getAllApprov(param){
        return axios.get(urlApprov+'/'+param);
    }

    getAllTrans(param){
        return axios.get(urlTrans+'/'+param);
    }

    getAllProdEner(param){
        return axios.get(urlElectProd+'/'+param);
    }

    getRub2forRub1(param){
        return axios.get(rub2+'/'+param);
    }

    sendRequest(data){
        const ID_RUBRIQUE1 =data.ID_RUBRIQUE1; 
        const ID_RUBRIQUE2 = data.ID_RUBRIQUE2;
        const ANNEE = data.ANNEE;
        const CodePays= data.CodePays;
        console.log("data from stats.js ++++ ",ID_RUBRIQUE1," --- ",ID_RUBRIQUE2)
        return axios.get(stats+'/'+ID_RUBRIQUE1+'/'+ID_RUBRIQUE2+'/'+ANNEE+'/'+CodePays);
    }

    sendRequestFromBilan(data){
        const ANNEE = data.ANNEE;
        const CodePays= data.CodePays;
        //console.log("data from stats.js ++++ ",ID_RUBRIQUE1," --- ",ID_RUBRIQUE2)
        return axios.get(bilan+'/'+ANNEE+'/'+CodePays);
    }

      getAlldata() {
        return fetch("http://localhost:8080/api/vue_bilan/vue_bilan",
        {
            method:"GET",
            headers:{ 
                "Accept":"application/json"
            }
        });
      }
}

export default new Vue_bilanService()