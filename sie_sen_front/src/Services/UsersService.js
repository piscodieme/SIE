import axios from 'axios';

const usersLoginAPIURL = 'http://localhost:8080/api/users/login';

class UsersService {

    login(users){
        return axios.post(usersLoginAPIURL, users);
    }


}
export default new UsersService()