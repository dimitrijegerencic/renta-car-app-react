import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {reservationService} from "../../../services/ReservationService";
import {message} from "antd";
import {t} from "react-switch-lang";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputField from "../../../components/formFields/inputField/InputField";
import SelectField from "../../../components/formFields/selectField/SelectField";
import DateField from "../../../components/formFields/dateField/DateField";
import classes from './ReservationForm.module.scss';
import {cityService} from "../../../services/CityService";

const ClientReservationForm = ({type, id, cancel}) => {

    const queryClient = useQueryClient();
    const [reservationChanged,setReservationChanged]=useState(0)

    const getReservationById=(id)=>{
        return reservationService.getReservationById(id)
            .then(res=>{
                setReservationChanged(prevState=>prevState+1);
                reset({
                    id:id,
                    customer:res?.customer?.first_name+" "+res?.customer?.last_name,
                    vehicle:res?.vehicle?.plate_number,
                    pick_up_location:res?.pickup_location?.name,
                    drop_off_location:res?.drop_off_location?.name,
                    total_price:res?.price,
                    clientId:res?.client?.id,
                    vehicleId:res?.vehicle?.id,
                    production_year:res?.vehicle?.production_year,
                    type:res?.vehicle?.type,
                    number_of_seats:res?.vehicle?.number_of_seats,
                    daily_rate:res?.vehicle?.daily_rate,
                    client_passport:res?.customer?.passport_number,
                    phone_number:res?.customer?.phone_number,
                    email:res?.customer?.email
                });

                return res
            })
            .catch(err=>message.error(t('error-message-api')))
    }


    const schema = yup.object().shape({

        date_from: yup.string().trim().required(t('validation.required')),
        date_to: yup.string().trim().required(t('validation.required')),
        pickup_location: yup.string().trim().required(t('validation.required')),
        drop_off_location: yup.string().trim().required(t('validation.required'))

    })

    const { handleSubmit, control, reset, formState: {errors}, setValue
    } = useForm({resolver: yupResolver(schema)});


    useQuery(['reservation-single', id], () => getReservationById(id), {
        enabled: Boolean(type !== 'add' && id)
    })

    const getCities = () => {
        return cityService.getAll()
            .then(res => {
                return res.map(item => ({
                    label: item?.name,
                    value: item?.id
                }));
            })
            .catch(err => message.error(t('error-message.api')))
    }

    const {data: cities} = useQuery(['cities'], () => getCities(), {
        enabled: true,
        initialData: []
    })

    return <div>

                <div>
                    <div className={classes['dates']}>
                        <DateField
                            label={t('reservations.from')}
                            name="date_from"
                            control={control}
                            typeFlag={type}
                            placeholder={t('reservations.placeholders.from')}
                            error={errors?.date_from?.message}
                            disabled={true}
                        />
                        <DateField
                            label={t('reservations.to')}
                            name="date_to"
                            control={control}
                            typeFlag={type}
                            placeholder={t('reservations.placeholders.to')}
                            error={errors?.date_from?.message}
                            disabled={true}
                        />
                    </div>

                    <div className={classes['locations']}>
                        <SelectField label={t('reservations.pick-up')}
                                     name="pick_up_location"
                                     control={control}
                                     options={cities}
                                     placeholder={t('reservations.placeholders.pick')}
                                     error={errors?.pickup_location?.message}
                                     disabled={true}
                        />
                        <SelectField label={t('reservations.drop-off')}
                                     name="drop_off_location"
                                     control={control}
                                     options={cities}
                                     placeholder={t('reservations.placeholders.drop')}
                                     error={errors?.drop_off_location?.message}
                                     disabled={true}
                        />

                    </div>
                    <InputField label={t('reservations.total-price')}
                                name="total_price"
                                control={control}
                                placeholder={''}
                                error={errors?.price?.message}
                                disabled={type !== 'add'}
                    />

                </div>
    </div>

}

export default ClientReservationForm;