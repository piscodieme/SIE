import axios from "axios";

const url = "http://localhost:8080/api/siteprod/siteprod";

class SiteService{

    Add(SiteProd){
        console.log(SiteProd);
        return axios.post(url, SiteProd);
    }
    GetAll(){
        return axios.get(url);
    }
}
export default new SiteService()