//this is an example for country list response
import CountryModel from "./models/CountryModel";
import {requestInstance} from "../config/requestInstance";

class CountryService {
    //apis used for country requests
    api = {
        countries: '/countries'
    }

    //parameters used in apis
    params = {}

    //this returns list of countries
    getAll(){
        return requestInstance.get(this.api.countries)
            .then(r => r?.data?.data?.map(item => new CountryModel(item)))
            .catch(err => Promise.reject(err))
    }


}

export const countryService = new CountryService();