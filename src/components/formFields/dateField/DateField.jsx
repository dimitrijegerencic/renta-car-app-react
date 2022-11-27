import React from 'react';
import {DatePicker} from 'antd';
import Wrapper from "../wrapper/Wrapper";
import {Controller} from 'react-hook-form';
import "./DateField.scss";

const DateField = ({
                        label,
                        name,
                        placeholder,
                        error,
                        disabled = false,
                        control,
                        typeFlag,
                        onChange=(d1)=>{}
                    }) => {

    return <Wrapper label={label} error={error}>
        {control && typeFlag === "add" ?
            <Controller
                name={name}
                control={control}
                render={({ field }) => (

                 <DatePicker
                    placeholder={placeholder}
                    status={error ? "error" : ''}
                    disabled={disabled}
                    className={"__input_field"}
                    format={"DD.MM.YYYY."}
                    {...field}
                    style={{ width: 230 }}
                    onChange={(d1) =>{onChange(d1); field.onChange(d1)}}
                />
                )}
            /> : <Controller
                name={name}
                control={control}
                render={({ field }) => (

                    <DatePicker
                        placeholder={placeholder}
                        status={error ? "error" : ''}
                        disabled={disabled}
                        className={"__input_field"}
                        format={"DD.MM.YYYY."}
                        style={{ width: 230 }}
                        onSelect={(d)=>{onChange(d);field.onChange(d)}}
                    />
                )}
            />
        }
    </Wrapper>
}

export default DateField;