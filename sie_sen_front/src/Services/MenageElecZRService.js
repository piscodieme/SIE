import axios from "axios";

const MenageElecZU_Api_url = "http://localhost:8080/api/menagezu/menagezu";
const MenageElecZR_Api_url = "http://localhost:8080/api/menagezr/menagezr";
class MenageElecZRService{
    // les ménages en zone urbaine

    Add(menages){
        console.log("le nombre de ménages",menages);
        return axios.post(MenageElecZR_Api_url,menages);
    }

    getAll(){
        return axios.get(MenageElecZR_Api_url);
    }


    // les ménages en zone urbaine
    
    AddZU(menageZU){
        return axios.post(MenageElecZU_Api_url, menageZU);
    }

    getAllZU(){
        return axios.get(MenageElecZU_Api_url)
    }
}
export default new MenageElecZRService()