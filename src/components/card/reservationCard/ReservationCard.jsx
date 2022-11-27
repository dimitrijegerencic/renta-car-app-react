import React from "react";
import classes from './ReservationCard.module.scss';
import Button from "../../buttons/button/Button";
import {t} from "react-switch-lang";


const ReservationCard = (
    {
        dateFrom,
        dateTo,
        pickUp,
        dropOff,
        totalPrice,
        onClick
    }
) => {

    return <>
        <div className={classes['card']}>
            <div className={classes['dates-info']}>
                <div>
                    <span>{t('reservations.from')} </span><p>{dateFrom}</p>
                </div>
                <div>
                    <span>{t('reservations.to')} </span><p>{dateTo}</p>
                </div>
            </div>
            <hr/>
            <div className={classes['locations-info']}>
                <div>
                    <span>{t('reservations.pick-up')}  </span><p>{pickUp}</p>
                </div>
                <div>
                    <span>{t('reservations.drop-off')}  </span><p>{dropOff}</p>
                </div>
            </div>
            <hr/>
            <div className={classes['other']}>
                <div className={classes['price-info']}>
                    <span>{t('reservations.total-price')}  </span> {totalPrice} €
                </div>
                <Button label={t('common.more-info')} onClick={() => onClick() }/>
            </div>
        </div>
    </>
}

export default ReservationCard;