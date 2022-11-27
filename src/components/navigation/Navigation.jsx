import React from 'react';
import { Menu } from 'antd';
import Button from "../buttons/button/Button";
import Logo from "../../img/Group 2732.svg";
import clsx from "clsx";
import "./Navigation.scss";
import {useUser} from "../../contexts/UserContext";
import {t} from 'react-switch-lang';
import {Link, useNavigate} from "react-router-dom";
import Language from "./language/Language";
import {userRoles} from "../../config/config";
import {useModal} from "../../contexts/ModalContext";
import ClientForm from "../../pages/clients/clientForm/ClientForm";
import {storageService} from "../../services/StorageService";
import {routes} from "../../routes/routes";
import {authService} from "../../services/AuthService";
import VehicleForm from "../../pages/vehicles/vehicleForm/VehicleForm";

const Navigation = () => {
    const navigate = useNavigate();
    const {userData} = useUser();
    const {open, close} = useModal()

    const logout = () => {
        authService.logout()
            .then(r => {
                storageService.clear()
                navigate(routes.LOGIN.path)
            })
    }

    const addClient = () => {
        open({
            title: t('clients.add-client'),
            content: <ClientForm type={"add"} cancel={close}/>
        })
    }

    const addVehicle = () => {
        open({
            title: t('vehicles.add-vehicle'),
            content: <VehicleForm type={"add"} cancel={close}/>
        })
    }


    return <Menu mode="horizontal"
                 defaultSelectedKeys={['home']}
                 className={"navigation-menu"}>
        <Menu.Item key="home" className={clsx("logo-item", "item")}>
            <img src={Logo} alt="away" className={"logo-img"}/>
        </Menu.Item>
        <Menu.Item className={"item item-inactive"}>{userData?.firstName} {userData?.lastName}</Menu.Item>
        {userData?.role === userRoles.EMPLOYEE ?
            <Menu.SubMenu className={"item item-inactive"} title={t('common.options')}>
                <Menu.Item onClick={() => addClient()}>{t('navigation.add-new-user')}</Menu.Item>
                <Menu.Item onClick={() => addVehicle()} >{t('navigation.add-new-vehicle')}</Menu.Item>
                <Menu.Item><Link to={routes.RESERVATIONS.add}>{t('navigation.add-new-reservation')}</Link></Menu.Item>
                <Menu.Item>
                    <Language/>
                </Menu.Item>
            </Menu.SubMenu>
            :
            <Menu.Item>
                <Language/>
            </Menu.Item>
        }
        <Menu.Item key="test-free" className={"item item-inactive"}>
            <Button label={t('navigation.logout')} onClick={() => logout()}/>
        </Menu.Item>
    </Menu>
}

export default Navigation;