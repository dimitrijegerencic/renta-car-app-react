import React from 'react';
import { Select } from 'antd';
import Wrapper from "../wrapper/Wrapper";
import {Controller} from 'react-hook-form';
import "./SelectField.scss";

const SelectField = ({
                         label,
                         name,
                         placeholder,
                         error,
                         options = [],
                         multi = false,
                         allowClear = true,
                         disabled = false,
                         control,
                         defaultValue,
                         type
}) => {
    return <Wrapper label={label} error={error}>
        {control &&
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                    <Select
                        placeholder={placeholder}
                        status={error ? "error" : ''}
                        options={options}
                        allowClear={allowClear}
                        disabled={disabled}
                        size="large"
                        mode={multi ? "multiple" : "single"}
                        className={"__select_field"}
                        defaultValue={defaultValue}
                        type={type}
                        style={{ width: 230 }}
                        {...field}/>
            )}
        />
        }
    </Wrapper>
}

export default SelectField;