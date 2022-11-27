import React from 'react';
import classes from "./Wrapper.module.scss";

const Wrapper = ({
    label = '',
    children,
    error = ''
                 }) => {
    return <div className={classes['container']}>
                <label>{label}</label>
                <div>
                    {children}
                </div>
                <span>{error}</span>
    </div>
}

export default Wrapper;