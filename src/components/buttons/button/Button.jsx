import React from 'react';
import classes from "./Button.module.scss";
import clsx from "clsx";

const Button = ({label = '', onClick, color = 'blue', type = "button"}) => {
    return <button className={clsx(classes['button'], classes[color])}
                   type={type}
                   onClick={(e) => {
                            onClick(e)
                    }}>
                        {label}
                    </button>
}

export default Button;