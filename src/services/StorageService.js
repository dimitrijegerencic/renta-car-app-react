class StorageService{
    exists(key){
        return Boolean(localStorage.getItem(key))
    }

    get(key){
        return localStorage.getItem(key)
    }

    set(key, value){
        localStorage.setItem(key, value)
    }

    clear(){
        localStorage.clear()
    }
}

export const storageService = new StorageService();