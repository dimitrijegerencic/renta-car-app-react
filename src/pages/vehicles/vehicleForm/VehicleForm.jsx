import React from "react";
import {t} from 'react-switch-lang';
import * as yup from "yup";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormButtonGroup from "../../../components/buttons/formButtonGroup/FormButtonGroup";
import InputField from "../../../components/formFields/inputField/InputField";
import {vehicleService} from "../../../services/VehicleService";
import { message } from 'antd';
import TextAreaField from "../../../components/formFields/textAreaField/TextAreaField";
import classes from './VehicleForm.module.scss';

const VehicleForm = ({type, id, cancel}) => {

    const date = new Date();

    const queryReservation = useQueryClient();

    const add = useMutation((data) => vehicleService.addVehicle(data)
        .then(r => {
            message.success(t('vehicles.success-add'));
            queryReservation.invalidateQueries("vehicles")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const edit = useMutation((data) => vehicleService.editVehicle(data)
        .then(r => {
            message.success(t('vehicles.success-edit'));
            queryReservation.invalidateQueries("vehicles")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'))
        }))

    const get = (id) => {
        return vehicleService.getVehicleById(id)
            .then(res => {
                reset(res)
            })
            .catch(err => message.error(t('error-message.api')))
    }

    const schema=yup.object().shape({
        plate_number: yup.string().trim().required(t('validation.required')),
        production_year: yup.number().integer().required(t('validation.required'))
            .min(2000,t('validation.min-year',{year:2000}))
            .max(date.getFullYear(),t('validation.max-year',{year:date.getFullYear()})),
        type: yup.string().trim().required(t('validation.required')).
        min(2,t('validation.min',{number:2}))
            .max(255,t('validation.max',{number:255})),
        number_of_seats: yup.number().integer().required(t('validation.required'))
            .min(2,t('validation.min-seats',{number:2}))
            .max(15,t('validation.max-seats',{number:15})),
        daily_rate: yup.number().required(t('validation.required'))
            .min(0,t('validation.min-price',{number:0})),
        note: yup.string().trim().nullable().max(255,t('validation.max',{number:255}))
    })

    const {handleSubmit,control,reset,formState:{errors}}=
        useForm({resolver:yupResolver(schema)});

    const onSubmit=(data)=>{
        console.log(data)
        if(type==='add'){
            add.mutate(data);
        }else{
            edit.mutate(data);
        }
    }

    useQuery(['vehicle-single', id], () => get(id), {
        enabled: Boolean(type !== 'add' && id)
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                label={t('vehicles.plate-number')}
                name='plate_number'
                control={control}
                placeholder={t('vehicles.placeholders.plate_number')}
                disabled={type === 'preview'}
                error={errors?.plate_number?.message}
            />
            <div className={classes['section-1']}>
                <InputField
                    label={t('vehicles.production-year')}
                    name="production_year"
                    placeholder={t('vehicles.placeholders.production_year')}
                    control={control}
                    error={errors?.production_year?.message}
                    disabled={type === 'preview'}
                />
                <InputField
                    label={t('vehicles.type')}
                    name='type'
                    control={control}
                    placeholder={t('vehicles.placeholders.type')}
                    disabled={type === 'preview'}
                    error={errors?.type?.message}
                />
            </div>

            <div className={classes['section-2']}>
                <InputField
                    label={t('vehicles.number-of-seats')}
                    name="number_of_seats"
                    control={control}
                    placeholder={t('vehicles.placeholders.number_of_seats')}
                    error={errors?.number_of_seats?.message}
                    disabled={type === 'preview'}
                />
                <InputField
                    label={t('vehicles.daily_rate')}
                    name="daily_rate"
                    control={control}
                    placeholder={t('vehicles.placeholders.daily-rate')}
                    error={errors?.daily_rate?.message}
                    disabled={type === 'preview'}
                />
            </div>

            <TextAreaField
                label={t('vehicles.note')}
                name="note"
                control={control}
                error={errors?.note?.message}
                disabled={type === 'preview'}
            />

            {type && type !== 'preview' &&
                <FormButtonGroup
                    onCancel={() => cancel()}
                />
            }
        </form>
    </div>

}

export default VehicleForm;
