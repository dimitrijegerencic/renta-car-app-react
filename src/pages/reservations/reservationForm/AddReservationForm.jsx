import React, {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {reservationService} from "../../../services/ReservationService";
import {message} from "antd";
import {t} from "react-switch-lang";
import * as yup from "yup";
import {clientService} from "../../../services/ClientService";
import {vehicleService} from "../../../services/VehicleService";
import {cityService} from "../../../services/CityService";
import SelectField from "../../../components/formFields/selectField/SelectField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import classes from "./ReservationForm.module.scss";
import DateField from "../../../components/formFields/dateField/DateField";
import InputField from "../../../components/formFields/inputField/InputField";
import FormButtonGroup from "../../../components/buttons/formButtonGroup/FormButtonGroup";
import {useNavigate} from "react-router-dom";

const AddReservationForm = ({id, type, cancel}) => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [price, setPrice] = useState(0);

    const currentDate = new Date();

    const currentDatePlaceholder = currentDate.getFullYear() + "/" +
                                    (currentDate.getMonth()) + "/" +
                                    (currentDate.getDate());

    const dateInSevenDays = new Date((currentDate.getTime() + 7*24*60*60*1000));

    const datePlusSevenPlaceholder = dateInSevenDays.getFullYear()+"/"+
        (dateInSevenDays.getMonth()+1)+"/" +
        dateInSevenDays.getDate();


    const add = useMutation((data) => reservationService.addReservation(data)
        .then (r => {
            message.success(t('reservations.success-add'));
            queryClient.invalidateQueries("reservations")
            cancel()
        })
        .catch(err => {
            console.log(err?.response?.data)
            message.error(t('error-message.api'));
        })
    )

    const schema = yup.object().shape({
        customer_id: yup.string().trim().required(t('validation.required')),
        date_from: yup.string().trim().required(t('validation.required')),
        date_to: yup.string().trim().required(t('validation.required')),
        pickup_location: yup.string().trim().required(t('validation.required')),
        drop_off_location: yup.string().trim().required(t('validation.required')),
    })

    const getCustomers = () => {
        return clientService.getAll().then(res => {
            return res.map(item => (
                {
                    label : item?.getFullName(),
                    value : item?.id
                }));
        })
            .catch(err => message.error(t('error-message.api')))
    }

    const {data: customers} = useQuery(['customers'], () => getCustomers(), {
        enabled: true,
        initialData: []
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

    const getPrice = () => {
        return vehicleService.getVehicleById(id)
            .then (res => res?.price)
            .catch(err => message.error(t('error-message-api')))
    }

    const {data : vehicleDailyRate} = useQuery(['daily_rate'], () => getPrice(), {
        enabled: true,
        initialData: []
    })

    //postavljamo unaprijed id vozila za koje pravimo rezervaciju

    const setVehicleID = () => {
        setValue('vehicle_id', id);
    }

    useQuery(['vehicle_id'], () => setVehicleID(), {
        enabled: true,
        initialData: []
    })

    const {data: cities} = useQuery(['cities'], () => getCities(), {
        enabled: true,
        initialData: []
    })

    const { setValue, handleSubmit, control, reset, formState: {errors}
    } = useForm({resolver: yupResolver(schema)});


    const onSubmit = (data) => {
        add.mutate(data);
        navigate("/reservations");
    }

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
                let priceVal = Math.trunc(diff) * vehicleDailyRate;
                setPrice(priceVal)
            }
            else{
                setPrice("")
            }

    },[dateFrom,dateTo])

    //nakon toga popunimo vrijednost input polja za cijenu

    useEffect(()=>{
        setValue('price', price)
    }, [price])

    return <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectField
                    label={t('reservations.client')}
                    name="customer_id"
                    control={control}
                    options={customers}
                    placeholder={t('reservations.placeholders.client_id')}
                    error={errors?.customer_id?.message}
                    disabled={false}
                />

                <div className={classes['dates']}>
                    <DateField
                        label={t('reservations.from')}
                        name="date_from"
                        control={control}
                        typeFlag={type}
                        placeholder= {currentDatePlaceholder}
                        error={errors?.date_from?.message}
                        disabled={false}
                        onChange={(d1) => onDateFromChange(d1)}
                    />
                    <DateField
                        label={t('reservations.to')}
                        name="date_to"
                        control={control}
                        typeFlag={type}
                        placeholder={datePlusSevenPlaceholder}
                        error={errors?.date_from?.message}
                        disabled={false}
                        onChange={(d1) => onDateToChange(d1)}
                    />
                </div>

                <div className={classes['locations']}>
                    <SelectField label={t('reservations.pick-up')}
                                 name="pickup_location"
                                 control={control}
                                 options={cities}
                                 placeholder={t('reservations.placeholders.pick')}
                                 error={errors?.pickup_location?.message}
                                 disabled={false}
                    />
                    <SelectField label={t('reservations.drop-off')}
                                 name="drop_off_location"
                                 control={control}
                                 options={cities}
                                 placeholder={t('reservations.placeholders.drop')}
                                 error={errors?.drop_off_location?.message}
                                 disabled={false}
                    />
                </div>

                <InputField label={t('reservations.total-price')}
                            name="price"
                            control={control}
                            placeholder={t('reservations.placeholders.total-price')}
                            error={errors?.price?.message}
                            disabled={false}
                            type="visible"
                            value={price}
                />

                <FormButtonGroup
                    onCancel={() => cancel()}
                />

            </form>

        </div>

    </>

}

export default AddReservationForm;