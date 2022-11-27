import ClientModel from "./models/ClientModel";
import {requestInstance} from "../config/requestInstance";

class ClientService {
    //apis used for client requests
    api = {
        account: '/account',
        clients: '/customers',
        users: '/users',
    }

    //parameters used in apis
    params = {
        search: 'search='
    }

    getCurrentUserData(){
        return requestInstance.get(this.api.account)
            .then(r => {
                return new ClientModel(r.data)
            })
            .catch(err => Promise.reject(err))
    }

    // this returns data for client
    getClientById(id){
        return requestInstance.get(`${this.api.users}/${id}`)
            .then(r => new ClientModel(r.data))
            .catch(err => Promise.reject(err))
    }

    //this returns list of all users
    getAll(query){
        // if search query is passed to method, add it to api
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';
        return requestInstance.get(`${this.api.clients}${queryParam}`)
            .then(r => r?.data?.data?.map(item => new ClientModel(item)))
            .catch(err => Promise.reject(err))
    }

    add(data){
        const formData = {
            "first_name": data?.firstName,
            "last_name": data?.lastName,
            "country_id": data?.country,
            "passport_number": data?.idNumber,
            "phone_number": data?.phone,
            "email": data?.email
        };
        return requestInstance.post(this.api.users, formData)
            .then(r => new ClientModel(r.data))
            .catch(err => Promise.reject(err))
    }

    edit(data){
        const formData = {
            "first_name": data?.firstName,
            "last_name": data?.lastName,
            "country_id": data?.country,
            "phone_number": data?.phone
        };
        return requestInstance.put(`${this.api.users}/${data?.id}`, formData)
            .then(r => new ClientModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.users}/${id}`)
            .then(r => new ClientModel(r.data))
            .catch(err => Promise.reject(err))
    }

}

export const clientService = new ClientService();