import React, {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {reservationService} from "../../../services/ReservationService";
import {message} from "antd";
import {t} from "react-switch-lang";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import InputField from "../../../components/formFields/inputField/InputField";
import SelectField from "../../../components/formFields/selectField/SelectField";
import FormButtonGroup from "../../../components/buttons/formButtonGroup/FormButtonGroup";
import DateField from "../../../components/formFields/dateField/DateField";
import classes from './ReservationForm.module.scss';
import {cityService} from "../../../services/CityService";
import {clientService} from "../../../services/ClientService";

const ReservationForm = ({type, id, cancel}) => {

    const queryClient = useQueryClient();

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [price, setPrice] = useState(0);

    const [reservationChanged,setReservationChanged]=useState(0)

    const edit = useMutation((data) => reservationService.editReservation(data)
        .then (r => {
            message.success(t('reservations.success-edit'));
            queryClient.invalidateQueries("reservations")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'));
        })
    )

    const schema = yup.object().shape({
        date_from: yup.string().trim().required(t('validation.required')),
        date_to: yup.string().trim().required(t('validation.required'))
    })

    const { handleSubmit, control, reset, formState: {errors}, setValue
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = (data) => {
        if(type === "edit"){
            edit.mutate(data)
        }
    }

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

    const getCustomers = () => {
        return clientService.getAll()
            .then(res => {
                return res.map(item => ({
                    label: item?.first_name + " " + item?.last_name,
                    value: item?.id
                }));
            })
            .catch(err => message.error(t('error-message.api')))
    }

    const {data : clients} = useQuery(['clients'], () => getCustomers(), {
        enabled : true,
        initialData : []
    })

    const onDateFromChange = (d1) => {
        setDateFrom(d1);
    }

    const onDateToChange = (d1) => {
        setDateTo(d1);
    }


    useEffect(() => {
        if (dateFrom < dateTo) {
            let date1 = new Date(dateFrom);
            let date2 = new Date(dateTo);
            let diff = ((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
            let priceVal = Math.trunc(diff) * reservation?.vehicle?.daily_rate;
            setPrice(priceVal)
        }
        else{
            setPrice("")
        }

    },[dateFrom,dateTo])

    useEffect(()=>{
        setValue('price', price)
    }, [price])

    // Ovaj dio mi je Ana pomogla
    // Ja sam zasebno pravio zahtjeve i smjestao sve ovo u promjenljive i onda ih predavao kao value
    // input komponentama, ali je ovaj nacin laksi i jednostavniji

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

    const {data:reservation}=useQuery(['reservation-single'],()=>getReservationById(id),{
        enabled: Boolean(id),
        initialData: []
    })

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            {type === 'preview' &&
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
                            onChange={(d1) => onDateFromChange(d1)}
                        />
                        <DateField
                            label={t('reservations.to')}
                            name="date_to"
                            control={control}
                            typeFlag={type}
                            placeholder={t('reservations.placeholders.to')}
                            error={errors?.date_from?.message}
                            disabled={true}
                            onChange={(d1) => onDateToChange(d1)}
                        />
                    </div>

                    <div className={classes['locations']}>
                        <SelectField label={t('reservations.pick-up')}
                            name="pick_up_location"
                            control={control}
                            options={cities}
                            placeholder={t('reservations.placeholders.pick')}
                            error={errors?.pickup_location?.message}
                            disabled={type !== 'add' || type === 'preview'}
                        />
                        <SelectField label={t('reservations.drop-off')}
                            name="drop_off_location"
                            control={control}
                            options={cities}
                            placeholder={t('reservations.placeholders.drop')}
                            error={errors?.drop_off_location?.message}
                            disabled={type !== 'add' || type === 'preview'}
                        />

                    </div>
                    <InputField label={t('reservations.total-price')}
                                name="total_price"
                                control={control}
                                placeholder={''}
                                value={price}
                                error={errors?.price?.message}
                                disabled={type !== 'add'}
                    />
                    <div className={classes['vehicle-info']}>
                        <InputField
                            label={t('vehicles.plate-number')}
                            name="vehicle"
                            control={control}
                            placeholder={''}
                            error={errors?.vehicleType?.message}
                            disabled={true}
                        />
                        <InputField
                            label={t('vehicles.production-year')}
                            name="production_year"
                            control={control}
                            placeholder={''}
                            error={errors?.vehicleType?.message}
                            disabled={true}
                        />
                        <InputField
                            label={t('vehicles.type')}
                            name="type"
                            control={control}
                            placeholder={''}
                            error={errors?.vehicleType?.message}
                            disabled={true}
                        />
                        <InputField
                            label={t('vehicles.daily_rate')}
                            name="daily_rate"
                            control={control}
                            placeholder={''}
                            error={errors?.vehicleType?.message}
                            disabled={true}
                        />
                    </div>
                    <div className={classes['client-info-1']}>
                        <SelectField label={t('reservations.client')}
                                     name="customer"
                                     control={control}
                                     options={clients}
                                     placeholder={t('reservations.placeholders.client_id')}
                                     error={errors?.client_id?.message}
                                     disabled={type === 'preview' || type === 'edit' }
                        />
                        <InputField label={t('clients.number')}
                                    name="client_passport"
                                    control={control}
                                    placeholder={''}
                                    error={errors?.price?.message}
                                    disabled={type !== 'add'}
                        />
                    </div>
                    <div className={classes['client-info-2']}>
                        <InputField label={t('clients.phone')}
                                      name="phone_number"
                                      control={control}
                                      placeholder={''}
                                      error={errors?.price?.message}
                                      disabled={type !== 'add'}
                        />
                        <InputField label={t('clients.email')}
                                    name="email"
                                    control={control}
                                    placeholder={''}
                                    error={errors?.price?.message}
                                    disabled={type !== 'add'}
                        />
                    </div>
                </div>

            }
            {type === 'edit' &&
                <div>
                    <div className={classes['reservation-info']}>
                        <SelectField label={t('reservations.client')}
                                     name="customer"
                                     control={control}
                                     options={clients}
                                     placeholder={t('reservations.placeholders.client_id')}
                                     error={errors?.client_id?.message}
                                     disabled={type === 'preview' || type === 'edit' }
                        />
                        <InputField
                            label={t('vehicles.plate-number')}
                            name="vehicle"
                            control={control}
                            placeholder={''}
                            error={errors?.vehicleType?.message}
                            disabled={true}
                        />


                        <div className={classes['dates']}>
                            <DateField
                                label={t('reservations.from')}
                                name="date_from"
                                control={control}
                                typeFlag={type}
                                placeholder={t('reservations.placeholders.from')}
                                error={errors?.date_from?.message}
                                disabled={false}
                                onChange={(d1) => onDateFromChange(d1)}
                            />
                            <DateField
                                label={t('reservations.to')}
                                name="date_to"
                                control={control}
                                typeFlag={type}
                                placeholder={t('reservations.placeholders.to')}
                                error={errors?.date_from?.message}
                                disabled={false}
                                onChange={(d1) => onDateToChange(d1)}
                            />
                        </div>

                        <div className={classes['locations']}>
                            <div className={classes['location-left']}>
                                <SelectField label={t('reservations.pick-up')}
                                             name="pick_up_location"
                                             control={control}
                                             options={cities}
                                             placeholder={t('reservations.placeholders.pick')}
                                             error={errors?.pickup_location?.message}
                                             disabled={type !== 'add' || type === 'preview'}
                                />
                            </div>
                            <div className={classes['location-right']}>
                                <SelectField label={t('reservations.drop-off')}
                                             name="drop_off_location"
                                             control={control}
                                             options={cities}
                                             placeholder={t('reservations.placeholders.drop')}
                                             error={errors?.drop_off_location?.message}
                                             disabled={type !== 'add' || type === 'preview'}
                                />
                            </div>
                        </div>
                        <InputField label={t('reservations.total-price')}
                                    name="price"
                                    control={control}
                                    placeholder={''}
                                    value={price}
                                    error={errors?.price?.message}
                                    disabled={true}
                        />
                    </div>

                    {type && type !== 'preview' &&
                        <FormButtonGroup
                            onCancel={() => cancel()}
                        />
                    }
                </div>
            }
        </form>
    </div>
}

export default ReservationForm;