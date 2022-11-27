import ReservationModel from "./models/ReservationModel";
import {requestInstance} from "../config/requestInstance";

class ReservationService {

    api = {
        reservations: '/reservations'
    }

    params = {
        search : 'search=',
        date_from : "date_from=",
        date_to : "date_to="
    }

    getReservationById(id){
        return requestInstance.get(`${this.api.reservations}/${id}`)
            .then(r => new ReservationModel(r?.data?.data))
            .catch(err => Promise.reject(err))
    }

    //vrace sve rezervacije

    getAll(query){
        // if search query is passed to method, add it to api
        const queryParam = query?.length > 0 ? `?${this.params.search}${query}` : '';

        return requestInstance.get(`${this.api.reservations}${queryParam}`)
            .then(r => r?.data?.data?.map(item => new ReservationModel(item)))
            .catch(err => Promise.reject(err))
    }

    getAll1(query1,query2){
        const queryParamFrom = query1?.length > 0 ? `?${this.params.date_from}${query1}` : '';
        const queryParamTo= query2?.length > 0 ? (queryParamFrom !== '' ? '&' : '?')`${this.params.date_to}${query2}` : '';

        return requestInstance.get(`${this.api.reservations}${queryParamFrom}${queryParamTo}`)
            .then(r => r?.data?.data?.map(item => new ReservationModel(item)))
            .catch(err => Promise.reject(err))
    }


    addReservation(data){
        const formData = {
            "customer_id": data?.customer_id,
            "vehicle_id": data?.vehicle_id,
            "date_from": data?.date_from,
            "date_to": data?.date_to,
            "pickup_location": data?.pickup_location,
            "drop_off_location": data?.drop_off_location,
            "price": data?.price
        };
        return requestInstance.post(`${this.api.reservations}`, formData)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }

    editReservation(data){
        const formData = {
            "pickup_location": data?.pickup_location,
            "drop_off_location": data?.drop_off_location
        };

        return requestInstance.put(`${this.api.reservations}/${data?.id}`, formData)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }

    delete(id){
        return requestInstance.delete(`${this.api.reservations}/${id}`)
            .then(r => new ReservationModel(r.data))
            .catch(err => Promise.reject(err))
    }


}

export const reservationService = new ReservationService();
