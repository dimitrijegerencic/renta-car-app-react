import React, {useState} from "react";
import {useModal} from "../../../contexts/ModalContext";
import {vehicleService} from "../../../services/VehicleService";
import {useQuery} from "react-query";
import SearchField from "../../../components/search/Search";
import Table from "../../../components/table/Table";
import classes from "./AddReservationPage.module.scss";
import {t} from 'react-switch-lang';
import AddReservationForm from "../reservationForm/AddReservationForm";
import {storageService} from "../../../services/StorageService";
import {storageKeys as storageKey, userRoles} from "../../../config/config";
import {Navigate} from "react-router-dom";

const AddReservationPage = () => {

    const {open, close} = useModal();
    const [query, setQuery]= useState("");

    const {data: rows} = useQuery(['vehicles', query],
        () => vehicleService.getAll(query), {
            enabled: true,
            initialData: []
        })

    const headers = [
        {
            title: t('vehicles.plate-number'),
            dataIndex: 'plate_number',
            key: 'plate_number',
        },
        {
            title: t('vehicles.production-year'),
            dataIndex: 'production_year',
            key: 'production_year',
        },
        {
            title: t('vehicles.number-of-seats'),
            dataIndex: 'number_of_seats',
            key: 'number_of_seats'
        },
        {
            title: t('vehicles.daily_rate'),
            dataIndex: 'price',
            key: 'price',
            render:(text, record) => <p>{text} € </p>
        }
    ];

    const openReservationModal = (type, id = null) => {
        open ({
            title : t('reservations.add-reservation'),
            content : <AddReservationForm id={id} type={type} cancel={close}/>,
            type : type
        })
    }

    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.EMPLOYEE ?
        <div>
            <div className={classes['page-head']}>
                <SearchField className={classes['search']} placeholder={t('reservations.placeholder')} onSearch={(e) => { setQuery(e)}}/>
            </div>
            <div className={classes['table']}>
                <Table header={headers}
                       rows={rows}
                       onRowClick={(record) => openReservationModal('add', record?.id)}
                />
            </div>
        </div>:
            <Navigate to="/" replace={true}/>
        }

    </>
}

export default AddReservationPage;