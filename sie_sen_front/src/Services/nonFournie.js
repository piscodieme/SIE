import axios from "axios";

const url = "http://localhost:8080/api/nonfournie/nonfournie";

class NonFournie{
    getAll(){
        return axios.get(url);
    }

    add(nonFournie){
        return axios.post(url,nonFournie);
    }
}
export default new NonFournie();