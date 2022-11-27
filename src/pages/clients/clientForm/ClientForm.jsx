import React, {useEffect} from 'react';
import InputField from "../../../components/formFields/inputField/InputField";
import {clientService} from "../../../services/ClientService";
import {t} from 'react-switch-lang';
import SelectField from "../../../components/formFields/selectField/SelectField";
import {countryService} from "../../../services/CountryService";
import FormButtonGroup from "../../../components/buttons/formButtonGroup/FormButtonGroup";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {regex} from "../../../utils/regex";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {message} from 'antd';
import classes from './ClientForm.module.scss';

const ClientForm = ({type, id, cancel}) => {

    const queryClient = useQueryClient();

    const add = useMutation((data) => clientService.add(data)
        .then(r => {
            message.success(t('clients.success-add'));
            queryClient.invalidateQueries("clients")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const edit = useMutation((data) => clientService.edit(data)
        .then(r => {
            message.success(t('clients.success-edit'));
            queryClient.invalidateQueries("clients")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const del = useMutation((data) => clientService.delete(data?.id)
        .then(r => {
            message.success(t('clients.success-edit'));
            queryClient.invalidateQueries("clients")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const get = (id) => {
        return clientService.getClientById(id)
            .then(res => {
                reset(res)
            })
            .catch(err => message.error(t('error-message.api')))
    }

    const getCountries = () => {
        return countryService.getAll()
            .then(res => {
                return res.map(item => ({
                    label: item?.name,
                    value: item?.id
                }));
            })
            .catch(err => message.error(t('error-message.api')))
    }

    const schema = yup.object().shape({
        firstName: yup.string().trim()
            .required(t('validation.required'))
            .min(3, t('validation.min', {number: 3}))
            .max(255, t('validation.max', {number: 255})),
        lastName: yup.string().trim()
            .required(t('validation.required'))
            .min(3, t('validation.min', {number: 3}))
            .max(255, t('validation.max', {number: 255})),
        country: yup.string().trim().required(t('validation.required')),
        idNumber: yup.string().trim().required(t('validation.required')),
        phone: yup.string().trim()
            .required(t('validation.required'))
            .min(6, t('validation.min', {number: 6}))
            .max(30, t('validation.max', {number: 30}))
            .matches(regex.PHONE, t('validation.invalid')),
        email: yup.string().trim()
            .required(t('validation.required'))
            .email(t('validation.invalid'))
    })

    const { handleSubmit, control, reset, formState: {errors}
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data) => {
        console.log(data)
        if(type === "edit"){
            edit.mutate(data)
        }
        else if (type === "delete"){
            del.mutate(data);
        }
        else{
            add.mutate(data)
        }
    }

    useQuery(['client-single', id], () => get(id), {
        enabled: Boolean(type !== 'add' && id)
    })

    const {data: countries} = useQuery(['countries'], () => getCountries(), {
        enabled: true,
        initialData: []
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes['first-last-name']}>
                <InputField label={t('clients.firstName')}
                            name="firstName"
                            control={control}
                            placeholder={t('clients.placeholders.firstName')}
                            error={errors?.firstName?.message}
                            disabled={type === 'preview'}
                />
                <InputField label={t('clients.lastName')}
                            name="lastName"
                            control={control}
                            placeholder={t('clients.placeholders.lastName')}
                            error={errors?.lastName?.message}
                            disabled={type === 'preview'}
                />
            </div>

            <SelectField
                label={t('clients.country')}
                name="country"
                control={control}
                options={countries}
                placeholder={t('clients.placeholders.country')}
                error={errors?.country?.message}
                disabled={type === 'preview'}
            />
            <InputField label={t('clients.number')}
                        name="idNumber"
                        control={control}
                        placeholder={t('clients.placeholders.number')}
                        error={errors?.idNumber?.message}
                        disabled={type !== 'add'}
            />
            <InputField label={t('clients.phone')}
                        name="phone"
                        control={control}
                        placeholder={t('clients.placeholders.phone-number')}
                        error={errors?.phone?.message}
                        disabled={type === 'preview'}
            />
            <InputField label={t('clients.email')}
                        name="email"
                        control={control}
                        placeholder={t('clients.placeholders.email')}
                        error={errors?.email?.message}
                        disabled={type !== 'add'}
            />
            {type && type !== 'preview' &&
            <FormButtonGroup
                onCancel={() => cancel()}
            />
            }
        </form>
    </div>
}

export default ClientForm;