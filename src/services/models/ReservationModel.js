
class ReservationModel {

    constructor(data){
        this.id = data?.id;
        this.customer = data?.customer;
        this.vehicle = data?.vehicle;
        this.date_from = data?.date_from;
        this.date_to = data?.date_to;
        this.pickup_location = data?.pickup_location;
        this.drop_off_location = data?.drop_off_location;
        this.price = data?.price;
    }

    getClientName(){
        return this?.customer?.first_name+" "+this?.customer.last_name
    }

    getPlateNumber(){
        return this?.vehicle?.plate_number;
    }

    getPickUpLocation(){
        return this?.pickup_location?.name;
    }

    getDropOffLocation(){
        return this?.drop_off_location?.name;
    }

}

export default ReservationModel;