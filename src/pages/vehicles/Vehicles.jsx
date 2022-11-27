import React, {useState} from "react";
import classes from './Vehicles.module.scss';
import {t} from "react-switch-lang";
import SearchField from "../../components/search/Search";
import Button from "../../components/buttons/button/Button";
import TableButtonGroup from "../../components/buttons/tableButtonGroup/TableButtonGroup";
import Table from "../../components/table/Table";
import {useQuery} from "react-query";
import {vehicleService} from "../../services/VehicleService";
import {useModal} from "../../contexts/ModalContext";
import VehicleForm from "./vehicleForm/VehicleForm";
import VehicleDeleteForm from "./deleteForm/VehicleDeleteForm";
import {storageService} from "../../services/StorageService";
import {storageKeys as storageKey, userRoles} from "../../config/config";
import {Navigate} from "react-router-dom";

const Vehicles = () => {

    const [query, setQuery] = useState("");
    const {open, close} = useModal()

    const {data: rows} = useQuery(['vehicles', query],
        () => vehicleService.getAll(query), {
            enabled: true,
            initialData: []
        })

    const openVehicleModal = (type, id = null) => {
        open({
            title: type === 'add'
                ? t('vehicles.add-vehicle')
                : type === 'edit'
                    ? t('vehicles.edit-vehicle')
                    : type === 'delete' ? t('vehicles.delete-vehicle')
                        : t('common.preview'),
            content: type === 'delete' ? <VehicleDeleteForm type={type}
                                                           id={id}
                                                           cancel={close} /> :
                <VehicleForm type={type}
                            id={id}
                            cancel={close}/>
        })
    }


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
            title: t('vehicles.type'),
            dataIndex: 'type',
            key: 'type',
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
        },
        {
            title: t('vehicles.note'),
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: '',
            dataIndex: 'x',
            key: 'x',
            render: (text, record) => <TableButtonGroup
                onEdit={() => {
                    openVehicleModal("edit", record?.id)
                }}
                onDelete={() => {
                    openVehicleModal("delete", record?.id)
                }}
            />

        },
    ];


    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.EMPLOYEE ?
            <>
            <div className={classes['page-head']}>
                <SearchField
                    className={classes['search']}
                    placeholder={t('vehicles.placeholder')}
                    onSearch={(e) => {
                        setQuery(e)
                    }}/>
                <Button label={t('vehicles.add-vehicle')} onClick={(e) => openVehicleModal('add')}/>
            </div>
            <div className={classes['table']}>
                <Table header={headers}
                       rows={rows}
                       onRowClick={(record) => openVehicleModal("preview", record?.id)}/>
            </div>
            </>
            :
            <div>
                <Navigate to="/" replace={true}/>
            </div>
        }
    </>

}

export default Vehicles