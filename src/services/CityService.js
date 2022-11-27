import CityModel from "./models/CityModel";
import {requestInstance} from "../config/requestInstance";

class CityService {

    api = {
        cities: '/cities'
    }

    params = {
        search: 'search='
    }

    getCityById(id){
        return requestInstance.get(`${this.api.cities}/${id}`)
            .then(r => new CityModel(r.data))
            .catch(err => Promise.reject(err))
    }

    //this returns list of all users
    getAll(query){
        // if search query is passed to method, add it to api
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';
        return requestInstance.get(`${this.api.cities}${queryParam}`)
            .then(r => r?.data?.data?.map(item => new CityModel(item)))
            .catch(err => Promise.reject(err))
    }

}

export const cityService = new CityService();