import axios from "axios";

const regionUrl = "http://localhost:8080/api/region/region";

class regionService{

    getRegions(){
        return axios.get(regionUrl);
    }
}
export default new regionService()