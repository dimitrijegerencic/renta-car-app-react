
class VehicleModel {

    constructor(data) {
        this.id = data?.id;
        this.plate_number = data?.plate_number;
        this.production_year = data?.production_year;
        this.type = data?.type;
        this.number_of_seats = data?.number_of_seats;
        this.price = data?.daily_rate;
        this.note = data?.note;
    }
}

export default VehicleModel;