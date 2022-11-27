import React, {useEffect, useState} from 'react';
import SearchField from "../../components/search/Search";
import {t} from 'react-switch-lang';
import Table from "../../components/table/Table";
import {useModal} from "../../contexts/ModalContext";
import ClientForm from "./clientForm/ClientForm";
import classes from "./Clients.module.scss";
import Button from "../../components/buttons/button/Button";
import {clientService} from "../../services/ClientService";
import TableButtonGroup from "../../components/buttons/tableButtonGroup/TableButtonGroup";
import {useQuery} from "react-query";
import ClientDeleteForm from "./deleteForm/ClientDeleteForm";
import {storageKeys as storageKey, userRoles} from "../../config/config";
import {Redirect, useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {storageService} from "../../services/StorageService";

const Clients = ({status}) => {

    const navigate = useNavigate();

    const {open, close} = useModal()
    const [query, setQuery] = useState("")

    const {data: rows} = useQuery(['clients', query],
        () => clientService.getAll(query), {
            enabled: true,
            initialData: []
        })

    const openClientModal = (type, id = null) => {

        open({
            title: type === 'add'
                ? t('clients.add-client')
                : type === 'edit'
                    ? t('clients.edit-client')
                    : type === 'delete' ? t('clients.delete-client')
                        : t('common.preview'),
            content: type === 'delete' ? <ClientDeleteForm type={type}
                                                           id={id}
                                                           cancel={close} /> :
                <ClientForm type={type}
                            id={id}
                            cancel={close}/>
        })
    }

    const headers = [
        {
            title: t('clients.name'),
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => record.getFullName()
        },
        {
            title: t('clients.number'),
            dataIndex: 'idNumber',
            key: 'idNumber',
        },
        {
            title: t('clients.phone'),
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: t('clients.email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('clients.note'),
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: '',
            dataIndex: 'x',
            key: 'x',
            render: (text, record) => <TableButtonGroup
                onEdit={() => {
                    openClientModal("edit", record?.id)
                }}
                onDelete={() => {
                    openClientModal("delete", record?.id)
                }}
            />

        },
    ];


    return <>
        {parseInt((storageService.get(storageKey.ROLE))) === userRoles.EMPLOYEE ?
        <div>
            <div className={classes['page-head']}>
                <SearchField className={classes['search']}
                             placeholder={t('clients.placeholder')}
                             onSearch={(e) => {
                                 setQuery(e)
                             }}
                />
                <Button label={t('clients.add-client')} onClick={(e) => openClientModal('add')}/>
            </div>
            <div className={classes['table']}>
                <Table header={headers}
                       rows={rows}
                       onRowClick={(record) => openClientModal("preview", record?.id)}/>
            </div>
        </div>
            : <div>
                <Navigate to="/" replace={true}/>
            </div> }
    </>
}

export default Clients;