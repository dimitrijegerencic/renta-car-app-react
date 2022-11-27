import React from 'react';
import classes from './ForbiddenPage.module.scss';
import {storageService} from "../../services/StorageService";
import {storageKeys as storageKey, userRoles} from "../../config/config";
import {t} from "react-switch-lang";

const ForbiddenPage = () => {
    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.USER ?
        <div className={classes['container']}>
            <p className={classes['warning']}>{t('forbidden.warning')}</p>
            <p>{t('forbidden.info')}</p>
        </div>
            :
            <div className={classes['container']}>
                <p className={classes['warning']}>{t('forbidden.title')}</p>
                <p>{t('forbidden.info-admin')}</p>
            </div>
            }
    </>
}

export default ForbiddenPage;