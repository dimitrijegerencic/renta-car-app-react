class AuthModel {
    constructor(data) {
        this.id = data?.id;
        this.email = data?.data?.email;
        this.role_id = data?.data?.role_id;
        this.access_token = data?.data?.access_token;
    }

    getToken(){
        return this.access_token;
    }
}

export default AuthModel;