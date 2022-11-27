import React from 'react';
import { Input} from 'antd';
import Wrapper from "../wrapper/Wrapper";
import {Controller} from 'react-hook-form';


const { TextArea } = Input;

const TextAreaField = ({
                        label,
                        name,
                        error,
                        disabled = false,
                        control
                    }) => {


    return <Wrapper label={label} error={error}>
        {control &&
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <TextArea
                        status={error ? "error" : ''}
                        disabled={disabled}
                        className={"__input_field"}
                        {...field}
                    />
                )}
            />
        }
    </Wrapper>
}

export default TextAreaField;