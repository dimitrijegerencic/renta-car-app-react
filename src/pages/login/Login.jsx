import React from 'react';
import {storageService} from "../../services/StorageService";
import {storageKeys} from "../../config/config";
import {useNavigate} from 'react-router-dom';
import {authService} from "../../services/AuthService";
import classes from './Login.module.scss';
import InputField from "../../components/formFields/inputField/InputField";
import Button from '../../components/buttons/button/Button';
import {t} from 'react-switch-lang';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import PasswordField from "../../components/formFields/passwordField/PasswordField";

const Login = () => {

    const navigate = useNavigate();

    const login = (email, password) => {
        authService.login(email, password)
            .then(r => {
                storageService.set(storageKeys.USER, r.getToken())
                storageService.set(storageKeys.ROLE, r.role_id)
                setTimeout(() => {
                    navigate('/')
                }, 300)
            })
            .catch(err => {
                alert("Error");
                console.log(err?.data)
            })
    }

    // schema

    const schema = yup.object().shape({
        Email: yup.string().trim()
            .required(t('validation.required'))
            .max(255, t('validation.max', {number:255})),
        Password: yup.string().trim()
            .required(t('validation.required'))
            .min(4, t('validation.min', {number:4}))
            .max(12, t('validation.max', {number:12})),
    })


    const { handleSubmit, control, reset, formState: {errors}
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit=(data)=>{
        login(data?.Email,data?.Password)
    }

    return <div className={classes['container']}>
        <div>
            <div className={classes['login-title']}>
                <h2>Rent A Car</h2>
            </div>
            <div className={classes['inputs-section']}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputField label={t('clients.email')}
                                name="Email"
                                control={control}
                                placeholder={t('clients.placeholders.email')}
                                error={errors?.firstName?.message}

                    />
                    <PasswordField label={t('login.password')}
                                name="Password"
                                control={control}
                                placeholder={t('clients.placeholders.password')}
                                error={errors?.firstName?.message}
                    />
                    <div className={classes['button-section']}>
                        <Button type='submit' label={t('login.title')} onClick={()=>{}}/>
                    </div>
                </form>
            </div>


        </div>

    </div>
}

export default Login;