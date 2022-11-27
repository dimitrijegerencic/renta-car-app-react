import React, {createContext, useContext, useEffect, useState} from 'react';

import {
    setTranslations,
    setDefaultLanguage,
    setLanguage
} from 'react-switch-lang';

import en from "../language/en.json";
import me from "../language/me.json";
import {storageKeys} from "../config/config";
import {storageService} from "../services/StorageService";
import {useNavigate} from "react-router-dom";
import {clientService} from "../services/ClientService";
import {routes} from "../routes/routes";

setTranslations({ en, me });
setDefaultLanguage('en');

const UserContext = createContext({});

//employee
//user

const UserProvider = ({children}) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [refreshLanguage, setRefreshLanguage] = useState(0);

    useEffect(() => {
        if(storageService.exists(storageKeys.USER)){
            clientService.getCurrentUserData()
                .then(r => {
                    setUserData(r)
                })
                .catch(err => {
                    navigate(routes.LOGIN.path)
                })
        }else{
            navigate(routes.LOGIN.path)
        }
    }, [])

    const data = {
      userData: userData,
      setUserData: (data) => setUserData(data),
      setLanguage: (key) => {
          setLanguage(key)
            setRefreshLanguage(prevState => prevState + 1)
        }
    }

    return( <UserContext.Provider key={refreshLanguage} value={data}>
        {children}
    </UserContext.Provider>)
}

export const useUser = () => {
    return useContext(UserContext)
}

export default UserProvider;