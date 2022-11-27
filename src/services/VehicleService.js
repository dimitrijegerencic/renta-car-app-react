import VehicleModel from "./models/VehicleModel";
import {requestInstance} from "../config/requestInstance";
import ReservationModel from "./models/ReservationModel";

class VehicleService {

    api = {
        vehicles : '/vehicles'
    }

    params = {
        search: 'search='
    }

    // vraca vozilo po id-u

    getVehicleById(id){
        return requestInstance.get(`${this.api.vehicles}/${id}`)
            .then(r => new VehicleModel(r?.data?.data))
            .catch(err => Promise.reject(err))
    }

    // vraca sva vozila

    getAll(query){
        // if search query is passed to method, add it to api
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';

        if (query?.length > 0){
            return requestInstance.get(`${this.api.vehicles}${queryParam}`)
                .then(r =>  r?.data?.data.map(item => new VehicleModel(item)))
                .catch(err => Promise.reject(err))
        }
        else{
            return requestInstance.get(`${this.api.vehicles}${queryParam}`)
                .then(r =>  r?.data.map(item => new VehicleModel(item)))
                .catch(err => Promise.reject(err))
        }
    }

    addVehicle(data){
        const formData = {
            "plate_number": data?.plate_number,
            "production_year": data?.production_year,
            "type": data?.type,
            "number_of_seats": data?.number_of_seats,
            "daily_rate": data?.daily_rate,
            "note": data?.note,
        };
        return requestInstance.post(`${this.api.vehicles}`, formData)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }

    editVehicle(data){
        const formData = {
            "plate_number": data?.plate_number,
            "production_year": data?.production_year,
            "type": data?.type,
            "number_of_seats": data?.number_of_seats,
            "daily_rate": data?.daily_rate,
            "note": data?.note,
        };
        return requestInstance.put(`${this.api.vehicles}/${data?.id}`, formData)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.vehicles}/${id}`)
            .then(r => new VehicleModel(r.data))
            .catch(err => Promise.reject(err))
    }

}

export const vehicleService = new VehicleService();