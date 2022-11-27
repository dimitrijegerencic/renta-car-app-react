import React, {useEffect} from 'react';
import {clientService} from "../../../services/ClientService";
import {t} from 'react-switch-lang';
import FormButtonGroup from "../../../components/buttons/formButtonGroup/FormButtonGroup";
import {useForm} from 'react-hook-form';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {message} from 'antd';
import classes from './ClientDeleteForm.module.scss';

const ClientDeleteForm = ({type, id, cancel}) => {

    const queryClient = useQueryClient();

    const del = useMutation((data) => clientService.delete(data?.id)
        .then(r => {
            message.success(t('clients.success-delete'));
            queryClient.invalidateQueries("clients")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const get = (id) => {
        return clientService.getClientById(id).then(res => {
            reset(res);
        })
            .catch(err => message.error(t('error-message.api')))
    }

    const { handleSubmit, control, reset, formState: {errors}
    } = useForm();

    const onSubmit = (data) => {
        del.mutate(data)
    }

    useQuery(['client-single', id], () => get(id), {
        enabled: Boolean(type !== 'add' && id)
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className={classes['delete-title']}>{t('common.confirm-delete')}</h3>
            {type && type !== 'preview' &&
                <FormButtonGroup type={'delete'}
                                 onCancel={() => cancel()}
                />
            }
        </form>
    </div>
}

export default ClientDeleteForm;