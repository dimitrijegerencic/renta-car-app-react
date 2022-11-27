import {requestInstance} from "../config/requestInstance";
import AuthModel from "./models/AuthModel";

class AuthService {
    //apis used for client requests
    api = {
        login: '/login',
        logout: '/logout',
    }

    login(email, password){
        const formData = {
            "email": email,
            "password": password
        };
        return requestInstance.post(this.api.login, formData, {
            headers: {
                "Authorization": "undefined"
            }
        })
            .then(r => {
                return new AuthModel(r.data)
            })
            .catch(err => Promise.reject(err))
    }

    logout(){
        return requestInstance.post(this.api.logout)
            .then(r => new AuthModel(r.data))
            .catch(err => Promise.reject(err))
    }

}

export const authService = new AuthService();