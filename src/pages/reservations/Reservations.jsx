import React, {useState} from 'react';
import {t} from 'react-switch-lang';
import Table from "../../components/table/Table";
import {useModal} from "../../contexts/ModalContext";
import classes from "./Reservations.module.scss";
import Button from "../../components/buttons/button/Button";
import TableButtonGroup from "../../components/buttons/tableButtonGroup/TableButtonGroup";
import {useQuery} from "react-query";
import {reservationService} from "../../services/ReservationService";
import ReservationForm from "./reservationForm/ReservationForm";
import ReservationDeleteForm from "./deleteForm/ReservationDeleteForm";
import {Navigate, useNavigate} from "react-router-dom";
import {DatePicker} from "antd";
import {storageService} from "../../services/StorageService";
import {storageKeys as storageKey, userRoles} from "../../config/config";

const Reservations = () => {

    const {open, close} = useModal()
    const [query, setQuery] = useState("")
    const [query2, setQuery2] = useState("")

    const {data: rows} = useQuery(['reservations', query, query2],
        () => reservationService.getAll1(query, query2), {
            enabled: true,
            initialData: []
        })

    const openReservationModal = (type, id = null) => {

        open({
            title:  type === 'edit' ? t('reservations.edit-reservation') :
                    type === 'delete' ? t('reservations.delete-reservation') :
                                        t('common.preview'),
            content: type === 'delete' ? <ReservationDeleteForm type={type}
                                                           id={id}
                                                           cancel={close} /> :
                <ReservationForm type={type}
                            id={id}
                            cancel={close}/>
        })
    }


    const headers = [
        {
            title: t('reservations.client'),
            dataIndex: 'customer',
            key: 'customer',
            render: (text, record) => record.getClientName()
        },
        {
            title: t('reservations.vehicle'),
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (text,record)=>record.getPlateNumber()
        },
        {
            title: t('reservations.from'),
            dataIndex: 'date_from',
            key: 'date_from',
        },
        {
            title: t('reservations.to'),
            dataIndex: 'date_from',
            key: 'date_to',
        },
        {
            title: t('reservations.pick-up'),
            dataIndex: 'pickup_location',
            key: 'pickup_location',
            render: (text,record)=>record.getPickUpLocation()

        },
        {
            title: t('reservations.drop-off'),
            dataIndex: 'drop_off_location',
            key: 'drop_off_location',
            render: (text,record)=>record.getDropOffLocation()
        },
        {
            title: t('reservations.total-price'),
            dataIndex: 'price',
            key: 'price',
            render: (text) => (
                <p>{text} €</p>
            ),

        },
        {
            title: '',
            dataIndex: 'x',
            key: 'x',
            render: (text, record) => <TableButtonGroup
                onEdit={() => {
                    openReservationModal("edit", record?.id)
                }}
                onDelete={() => {
                    openReservationModal("delete", record?.id)
                }}
            />

        },
    ];


    const navigate = useNavigate();

    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.EMPLOYEE ?
           <div>
               <div className={classes['page-head']}>
                   <DatePicker style={{width: '100%'}}
                               placeholder={t('reservations.from')}
                               onChange={(d) => setQuery(d)}
                   />
                   <DatePicker style={{width: '100%'}}
                               placeholder={t('reservations.to')}
                               onChange={(d) => setQuery2(d)}
                   />
                   <Button label={t('reservations.add-reservation')}
                           onClick={() => navigate("/addReservation")}/>
               </div>
               <div className={classes['table']}>
                   <Table header={headers}
                          rows={rows}
                          onRowClick={(record) => openReservationModal("preview", record?.id)}
                   />
               </div>
           </div>:
            <Navigate to="/" replace={true}/>
        }
    </>
}

export default Reservations;