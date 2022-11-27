class ClientModel {
    constructor(data) {
        this.id = data?.id;
        this.firstName = data?.first_name;
        this.lastName = data?.last_name;
        this.idNumber = data?.passport_number;
        this.phone = data?.phone_number;
        this.email = data?.email;
        this.note = data?.note;
        this.country = data?.country_id;
        this.role = data?.role_id;
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}

export default ClientModel;