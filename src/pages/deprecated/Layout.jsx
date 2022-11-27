import React from 'react';
import {t} from "react-switch-lang";
import {Outlet, Link, useNavigate, useLocation} from "react-router-dom";
import {useUser} from "../../contexts/UserContext";
import Navigation from "../../components/navigation/Navigation";
import Sidebar from "../../components/sidebar/Sidebar";

const Layout = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const {setLanguage} = useUser();

    console.log(location)

    return(
        <div>
            <div>
                <Navigation/>
            </div>
            <div>
                <Sidebar/>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;
