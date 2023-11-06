import axios from 'axios';

const usersLoginAPIURL = 'http://localhost:8080/api/users/login';

class UsersService {

    login(users){
       let usr = axios.post(usersLoginAPIURL, users);
       console.log("user data == ", usr);
       return usr;
    }


}
export default new UsersService()