import React, {useEffect, useState} from 'react';
import {t} from 'react-switch-lang';
import {storageKeys as storageKey, userRoles} from "../../config/config";
import {storageService} from "../../services/StorageService";
import classes from './Dashboard.module.scss';
import {useQuery} from "react-query";
import {reservationService} from "../../services/ReservationService";
import ReservationCard from "../../components/card/reservationCard/ReservationCard";
import {useModal} from "../../contexts/ModalContext";
import ClientReservationForm from "../reservations/reservationForm/ClientReservationForm";
import MainImg from '../../img/Group 2732.svg';
const Dashboard = () => {

    const {open, close} = useModal();
    const [query, setQuery] = useState("");

    const {data : reservations} = useQuery(['clients-reservations', query],
        () => {
            return reservationService.getAll(query).then();
        },
        {
            enabled : true,
            initialData : []
        })

    const openClientReservationModal = (type, id) => {
        open({
            title:t('common.preview'),
            content: <ClientReservationForm type={type} id={id} cancel={close}/>
        })
    }

    const currDate = new Date();

    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.EMPLOYEE ?
            <div className={classes['welcome-admin']}>
                <h1 className={classes['welcome-title']}>{t('dashboard.welcome')}</h1>
                <img src={MainImg} alt=""/>
            </div>
        :
        <div>

            <div className={classes['container']}>
                <div className={classes['title']}>
                    <h1>{t('reservations.title')}</h1>
                </div>
                <div className={classes['links']}>
                    <a href="#previous">{t('common.previous')}</a>
                    <a href="#current">{t('common.current')}</a>
                    <a href="#future">{t('common.future')}</a>
                </div>

                <h2>{t('reservations.all')}</h2>
                <div className={classes['reservations-section']} id={'all'}>
                    {
                        reservations.sort((a, b) => {
                            let d1 = new Date(a.date_from);
                            let d2 = new Date(b.date_from);
                            return d1 - d2;
                        })?.map(card=>{
                            return (<ReservationCard
                                dateFrom={card?.date_from.toString().slice(0, 15)}
                                dateTo={card?.date_from.toString().slice(0, 15)}
                                pickUp={card?.pickup_location?.name}
                                dropOff={card?.drop_off_location?.name}
                                totalPrice={card?.price}
                                onClick={()=>openClientReservationModal('preview', card?.id)}
                            />)
                        })
                    }
                </div>
                <hr/>
                <h2 id={'previous'}>{t('reservations.previous')}</h2>
                <div className={classes['reservations-section']} >
                    {
                        reservations.filter((a) => {
                            let d1 = new Date(a.date_from);
                            let d2 = new Date(a.date_to);
                            //trebalo je i d2 < currDate ali nema dateTo sa back-a se salje
                            return d1 < currDate;
                        })?.map(card=>{
                            return (<ReservationCard
                                dateFrom={card?.date_from.toString().slice(0, 15)}
                                dateTo={card?.date_from.toString().slice(0, 15)}
                                pickUp={card?.pickup_location?.name}
                                dropOff={card?.drop_off_location?.name}
                                totalPrice={card?.price}
                                onClick={()=>openClientReservationModal('preview', card?.id)}
                            />)
                        })
                    }
                </div>
                <hr/>
                <h2 id={'current'}>{t('reservations.current')}</h2>
                <div className={classes['reservations-section']} >
                    {
                        reservations.filter((a) => {
                            let d1 = new Date(a.date_from);
                            let d2 = new Date(a.date_to);
                            //trebalo je i d2 >= currDate
                            return d1 <= currDate;
                        })?.map(card=>{
                            return (<ReservationCard
                                dateFrom={card?.date_from.toString().slice(0, 15)}
                                dateTo={card?.date_from.toString().slice(0, 15)}
                                pickUp={card?.pickup_location?.name}
                                dropOff={card?.drop_off_location?.name}
                                totalPrice={card?.price}
                                onClick={()=>openClientReservationModal('preview', card?.id)}
                            />)
                        })
                    }
                </div>
                <hr/>
                <h2 id={'future'}>{t('reservations.future')}</h2>
                <div className={classes['reservations-section']} >
                    {
                        reservations.filter((a) => {
                            let d1 = new Date(a.date_from);
                            let d2 = new Date(a.date_to);
                            //trebalo je i d2 > currDate
                            return d1 > currDate;
                        })?.map(card=>{
                            return (<ReservationCard
                                dateFrom={card?.date_from.toString().slice(0, 15)}
                                dateTo={card?.date_from.toString().slice(0, 15)}
                                pickUp={card?.pickup_location?.name}
                                dropOff={card?.drop_off_location?.name}
                                totalPrice={card?.price}
                                onClick={()=>openClientReservationModal('preview', card?.id)}
                            />)
                        })
                    }
                </div>

            </div>
        </div>
        }
    </>
}

export default Dashboard;