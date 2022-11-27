import React, {useEffect} from "react";
import * as yup from "yup";
import {t} from "react-switch-lang";
import {regex} from "../../../utils/regex";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";




const LoginForm = () => {

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


}